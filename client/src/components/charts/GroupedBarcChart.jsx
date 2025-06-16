import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const GroupedBarChart = ({ data }) => {
  const ref = useRef();
  const [groupBy, setGroupBy] = useState("sector");

  useEffect(() => {
    drawChart();
  }, [data, groupBy]);

  const drawChart = () => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 50, right: 30, bottom: 90, left: 60 };
    const barGroupWidth = 80; // controls spacing
    const groupedData = d3.rollups(
      data,
      (v) => ({
        intensity: d3.mean(v, (d) => d.intensity || 0),
        impact: d3.mean(v, (d) => d.impact || 0),
        relevance: d3.mean(v, (d) => d.relevance || 0),
        likelihood: d3.mean(v, (d) => d.likelihood || 0),
      }),
      (d) => d[groupBy]
    );

    const keys = ["intensity", "impact", "relevance", "likelihood"];
    const groups = groupedData.map((d) => d[0]);

    // Dynamic width
    const chartWidth = groups.length * barGroupWidth;
    const chartHeight = 520 - margin.top - margin.bottom;

    const x0 = d3.scaleBand().domain(groups).range([0, chartWidth]).padding(0.2);
    const x1 = d3.scaleBand().domain(keys).range([0, x0.bandwidth()]).padding(0.05);
    const y = d3.scaleLinear()
      .domain([0, d3.max(groupedData, (d) => d3.max(keys, (k) => d[1][k])) || 10])
      .nice()
      .range([chartHeight, 0]);
    const color = d3.scaleOrdinal().domain(keys).range(d3.schemeCategory10);

    const chart = svg
      .attr("width", chartWidth + margin.left + margin.right)
      .attr("height", chartHeight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip bg-white text-sm px-2 py-1 border rounded shadow-md absolute z-50")
      .style("opacity", 0)
      .style("pointer-events", "none");

    // Y-axis
    chart.append("g").call(d3.axisLeft(y));

    // X-axis
    chart
      .append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(x0))
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .style("text-anchor", "end");

    // Bars
    chart
      .selectAll("g.bar-group")
      .data(groupedData)
      .join("g")
      .attr("transform", (d) => `translate(${x0(d[0])},0)`)
      .selectAll("rect")
      .data((d) => keys.map((key) => ({ key, value: d[1][key], group: d[0] })))
      .join("rect")
      .attr("x", (d) => x1(d.key))
      .attr("y", (d) => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => chartHeight - y(d.value))
      .attr("fill", (d) => color(d.key))
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `<strong>${d.key}</strong><br/>${groupBy}: ${d.group}<br/>Value: ${d.value.toFixed(2)}`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mousemove", (event) => {
        tooltip.style("left", `${event.pageX + 10}px`).style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Legend
    const legend = chart
      .selectAll(".legend")
      .data(keys)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${i * 120}, ${-30})`);

    legend
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 14)
      .text((d) => d.charAt(0).toUpperCase() + d.slice(1));
  };

  return (
    <div className="p-4 relative border border-gray-300 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4">
              
            <label>Group by:</label>
            <div className="flex space-x-2">
            {['sector', 'topic'].map((option) => (
            <button
                key={option}
                onClick={() => setGroupBy(option)}
                className={`px-4 py-2 rounded border text-sm font-medium transition-all duration-300
                ${groupBy === option 
                    ? 'bg-pink-500 text-white border-pink-500' 
                    : 'bg-white text-gray-700 border-gray-300'}
                `}
            >
                {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
            ))}
        </div>
            <h2 className="text-2xl font-semibold mb-2 text-center mx-auto">Insights on Topics and sectors</h2>
      </div>
      <div className="overflow-x-auto border rounded">
        <svg ref={ref}></svg>
      </div>
    </div>
  );
};

export default GroupedBarChart;
