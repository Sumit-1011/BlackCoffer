import React, { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";

const IntensityPieChart = ({ data }) => {
  const chartRef = useRef();

  const topicAverages = useMemo(() => {
    const grouped = {};

    data.forEach(item => {
      if (item.topic && item.intensity && item.intensity !== 0) {
        if (!grouped[item.topic]) grouped[item.topic] = [];
        grouped[item.topic].push(item.intensity);
      }
    });

    return Object.entries(grouped).map(([topic, intensities]) => ({
      topic,
      averageIntensity: d3.mean(intensities)
    }));
  }, [data]);

  useEffect(() => {
    if (!topicAverages.length) return;

    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2  ;

    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
      
    
      const gridGroup = svg.append("g").lower(); // pushes to the back

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
            .attr("stroke", "#e5e7eb") // Tailwind gray-200
            .attr("stroke-dasharray", "3 2")
            .attr("stroke-width", 1);
        }

    const color = d3.scaleOrdinal(d3.schemeTableau10);

    const pie = d3.pie().value(d => d.averageIntensity);
    const data_ready = pie(topicAverages);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip bg-white border border-gray-300 p-2 rounded shadow text-sm absolute")
      .style("opacity", 0)
      .style("pointer-events", "none");

    svg.selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.topic))
      .style("opacity", 0.8)
      .on("mouseover", function (event, d) {
        d3.select(this).style("opacity", 1);
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.data.topic}</strong><br/>Avg Intensity: ${d.data.averageIntensity.toFixed(2)}`);
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

  }, [topicAverages]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-fit h-fit border border-gray-300 rounded-lg p-4 shadow-md my-6 ">
      <h2 className="text-2xl font-semibold">Average Intesity per Topic</h2>
      <div ref={chartRef}></div>
    </div>
  );
};

export default IntensityPieChart;
