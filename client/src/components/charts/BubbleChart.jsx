import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BubbleChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    drawChart();
  }, [data]);

    const drawChart = () => {
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();

        d3.select(".tooltip").remove();
      
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("padding", "6px 12px")
            .style("background", "white")
            .style("border", "1px solid #ccc")
            .style("border-radius", "4px")
            .style("pointer-events", "none")
            .style("font-size", "12px")
            .style("opacity", 0);


        const margin = { top: 40, right: 30, bottom: 50, left: 60 };
        const width = 900 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const chart = svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const filteredData = data.filter(
            (d) =>
                d.likelihood &&
                d.relevance &&
                d.intensity &&
                !isNaN(d.likelihood) &&
                !isNaN(d.relevance) &&
                !isNaN(d.intensity)
        );

        const x = d3
            .scaleLinear()
            .domain([0, d3.max(filteredData, (d) => +d.likelihood)])
            .range([0, width]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(filteredData, (d) => +d.relevance)])
            .range([height, 0]);

        const r = d3
            .scaleSqrt()
            .domain([0, d3.max(filteredData, (d) => +d.intensity)])
            .range([2, 30]);

        // X Axis
        chart
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        chart
            .append("text")
            .attr("x", width / 2)
            .attr("y", height + 40)
            .attr("text-anchor", "middle")
            .text("Likelihood")
            .attr("fill", "black");

        // Y Axis
        chart.append("g").call(d3.axisLeft(y));

        chart
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -40)
            .attr("x", -height / 2)
            .attr("text-anchor", "middle")
            .text("Relevance")
            .attr("fill", "black");

        // X grid lines
        chart.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(0, ${height})`)
            .call(
                d3.axisBottom(x)
                    .tickSize(-height)
                    .tickFormat("")
            );

        // Y grid lines
        chart.append("g")
            .attr("class", "grid")
            .call(
                d3.axisLeft(y)
                    .tickSize(-width)
                    .tickFormat("")
            );


        // Bubbles
        chart
            .selectAll("circle")
            .data(filteredData)
            .enter()
            .append("circle")
            .attr("cx", (d) => x(+d.likelihood))
            .attr("cy", (d) => y(+d.relevance))
            .attr("r", (d) => r(+d.intensity))
            .attr("fill", "steelblue")
            .attr("opacity", 0.7)
            .on("mouseover", (event, d) => {
                tooltip.transition().duration(200).style("opacity", 0.9);
                tooltip.html(`
                <strong>Likelihood:</strong> ${d.likelihood}<br/>
                <strong>Relevance:</strong> ${d.relevance}<br/>
                <strong>Intensity:</strong> ${d.intensity}
                `);
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY - 28 + "px");
            })
            .on("mouseout", () => {
                tooltip.transition().duration(300).style("opacity", 0);
            });
    };

  return (
    <div className="p-4 border-gray-200 border rounded-lg shadow-md">
      <h2 className="text-2xl text-center font-semibold mb-4">Bubble Chart for Likelihood, Relavance and Intensity</h2>
      <svg ref={ref}></svg>
    </div>
  );
};

export default BubbleChart;
