import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";

const MultiLineChartByPestle = ({ data }) => {
  const ref = useRef();

  const uniquePestles = useMemo(() => {
    return [...new Set(data.map(d => d.pestle).filter(Boolean))];
  }, [data]);

  const uniqueRegions = useMemo(() => {
    return [...new Set(data.map(d => d.region).filter(Boolean))];
  }, [data]);

  const [selectedPestle, setSelectedPestle] = useState("Industries");

  useEffect(() => {
    if (data.length && selectedPestle) drawChart();
  }, [data, selectedPestle]);

  const drawChart = () => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 60, right: 150, bottom: 50, left: 60 };
    const width = 1080 - margin.left - margin.right;
    const height = 480 - margin.top - margin.bottom;

    const chart = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const filtered = data.filter(
      d =>
        d.pestle === selectedPestle &&
        d.start_year &&
        !isNaN(+d.start_year) &&
        d.intensity &&
        !isNaN(+d.intensity) &&
        d.region
    );

    const grouped = d3.groups(filtered, d => d.region);

    const lineData = grouped.map(([region, entries]) => {
      const yearMap = d3.rollup(
        entries,
        v => d3.sum(v, d => +d.intensity),
        d => +d.start_year
      );

      return {
        region,
        values: Array.from(yearMap, ([year, intensity]) => ({
          year,
          intensity
        })).sort((a, b) => a.year - b.year)
      };
    });

    const allYears = [...new Set(filtered.map(d => +d.start_year))].sort((a, b) => a - b);

    const x = d3.scaleLinear()
      .domain(d3.extent(allYears))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(lineData, r => d3.max(r.values, d => d.intensity))])
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(uniqueRegions)
      .range(d3.schemeTableau10);

    chart.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    chart.append("g").call(d3.axisLeft(y));

    const line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.intensity))
      .curve(d3.curveMonotoneX);

    chart.selectAll(".line")
      .data(lineData)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", d => color(d.region))
      .attr("stroke-width", 2)
      .attr("d", d => line(d.values));

    chart.selectAll(".dots")
      .data(lineData.flatMap(d => d.values.map(v => ({ ...v, region: d.region }))))
      .enter()
      .append("circle")
      .attr("cx", d => x(d.year))
      .attr("cy", d => y(d.intensity))
      .attr("r", 3)
      .attr("fill", d => color(d.region))
      .append("title")
      .text(d => `${d.region} (${d.year}): ${d.intensity}`);

    const legend = chart.selectAll(".legend")
      .data(uniqueRegions)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${width + 10}, ${i * 25})`);

    legend.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", d => color(d));

    legend.append("text")
      .attr("x", 16)
      .attr("y", 10)
      .text(d => d)
      .style("font-size", "12px");
  };

  return (
    <div className="p-4 border-gray-200 border rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">Multi-Line Chart of PESTLE Data</h1>
      <div className="mb-4 flex items-center gap-3">
        <label className="font-medium">Select PESTLE Topic:</label>
        <select
          className="border p-2 rounded"
          value={selectedPestle}
          onChange={e => setSelectedPestle(e.target.value)}
        >
          {uniquePestles.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <h2 className="text-xl font-semibold mb-3">
        Intensity Over Years by Region ({selectedPestle})
      </h2>
      <svg ref={ref}></svg>
    </div>
  );
};

export default MultiLineChartByPestle;
