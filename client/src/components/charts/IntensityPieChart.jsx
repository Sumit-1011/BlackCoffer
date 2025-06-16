import React, { useEffect, useRef, useMemo, useState } from "react";
import * as d3 from "d3";

const CountryTopicPieChart = ({ data }) => {
  const chartRef = useRef();
  const [selectedTopic, setSelectedTopic] = useState("oil");

  const topicOptions = useMemo(() => {
    const topics = new Set();
    data.forEach(item => {
      if (item.topic) topics.add(item.topic);
    });
    return Array.from(topics);
  }, [data]);

  const countryCounts = useMemo(() => {
    if (!selectedTopic) return [];
    const counts = {};
    data.forEach(item => {
      if (item.topic === selectedTopic && item.country) {
        counts[item.country] = (counts[item.country] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([country, count]) => ({
      country,
      count
    }));
  }, [data, selectedTopic]);

  useEffect(() => {
    if (!countryCounts.length) return;

    const width = 450;
    const height = 450;
    const radius = Math.min(width, height) / 2;

    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const gridGroup = svg.append("g").lower();
    const lines = 12;
    for (let i = 0; i < lines; i++) {
      const angle = (2 * Math.PI / lines) * i;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      gridGroup.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", x)
        .attr("y2", y)
        .attr("stroke", "#e5e7eb")
        .attr("stroke-dasharray", "3 2")
        .attr("stroke-width", 1);
    }

    const color = d3.scaleOrdinal(d3.schemeSet2);
    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip bg-white border border-gray-300 p-2 rounded shadow text-sm absolute")
      .style("opacity", 0)
      .style("pointer-events", "none");

    const data_ready = pie(countryCounts);

    svg.selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.country))
      .style("opacity", 0.8)
      .on("mouseover", function (event, d) {
        d3.select(this).style("opacity", 1);
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.data.country}</strong><br/>Count: ${d.data.count}`);
      })
      .on("mousemove", event => {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 0.8);
        tooltip.style("opacity", 0);
      });

  }, [countryCounts]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-fit h-fit border border-gray-300 rounded-lg p-4 shadow-md my-6 ">
      <h2 className="text-2xl font-semibold mb-2">Country-wise Topic Distribution</h2>
      <label className="mb-2">
        <span className="mr-2 text-sm font-medium">Select Topic:</span>
        <select
          className="border border-gray-300 rounded px-2 py-1"
          value={selectedTopic}
          onChange={e => setSelectedTopic(e.target.value)}
        >
          <option value="">--Select--</option>
          {topicOptions.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </label>
      <div ref={chartRef}></div>
    </div>
  );
};

export default CountryTopicPieChart;
