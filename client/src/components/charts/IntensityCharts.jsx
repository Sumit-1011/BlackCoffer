import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function IntensityChart({ data }) {
  const svgRef = useRef();

  const tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip bg-white border border-gray-300 rounded p-2 text-sm shadow-lg absolute")
  .style("opacity", 0)
  .style("pointer-events", "none");

  useEffect(() => {
    if (!data || data.length === 0) return;

    const processedData = data
      .filter(d => d.start_year && d.intensity)
      .reduce((acc, curr) => {
        const year = curr.start_year;
        acc[year] = (acc[year] || 0) + curr.intensity;
        return acc;
      }, {});

    const formattedData = Object.entries(processedData).map(([year, total]) => ({
      year,
      intensity: total,
    }));

    // Set dimensions
    const width = 700;
    const height = 400;
    const margin = { top: 30, right: 20, bottom: 50, left: 60 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear on update

    svg
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(formattedData.map(d => d.year))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(formattedData, d => d.intensity)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    const yAxis = g =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    svg.append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1);
    
    // Horizontal grid lines
    svg.append("g")
    .attr("class", "grid")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(
      d3.axisLeft(y)
        .tickSize(-width + margin.left + margin.right)
        .tickFormat("")
    )
    .selectAll("line")
    .attr("stroke", "#e5e7eb"); // Tailwind gray-200

    // Vertical grid lines
    svg.append("g")
    .attr("class", "grid")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(
      d3.axisBottom(x)
        .tickSize(-height + margin.top + margin.bottom)
        .tickFormat("")
    )
    .selectAll("line")
    .attr("stroke", "#e5e7eb");

    svg
      .selectAll(".bar")
      .data(formattedData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.year) + x.bandwidth() * 0.1)
      .attr("y", y(0))
      .attr("width", x.bandwidth()*0.5)
      .attr("height", 0)
      .attr("rx", 4) // rounded x radius
      .attr("ry", 4)
      .attr("fill", "#3b82f6")
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`<strong>Year:</strong> ${d.year}<br/><strong>Intensity:</strong> ${d.intensity}`);
      })
      .on("mousemove", event => {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      })
      .transition()
      .duration(800)
      .delay((d, i) => i * 100)
      .attr("y", d => y(d.intensity))
      .attr("height", d => y(0) - y(d.intensity));
    

    

  }, [data]);

  return (
    <div className="my-6 w-fit border border-gray-300 rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-2">Intensity by Start Year</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default IntensityChart;
