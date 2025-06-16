import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";

const ChoroplethMap = ({ dominantTopicsByCountry }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 960;
    const height = 500;

    d3.select(ref.current).selectAll("*").remove();

    const svg = d3.select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const projection = d3.geoNaturalEarth1().scale(160).translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    d3.json("/world.json").then(worldData => {
      const countries = feature(worldData, worldData.objects.countries).features;

      svg.append("g")
        .selectAll("path")
        .data(countries)
        .join("path")
        .attr("d", path)
        .attr("fill", d => {
          const name = d.properties.name;
          const topic = dominantTopicsByCountry[name];
          return topic ? color(topic) : "#f3f4f6"; // Tailwind gray-100 fallback
        })
        .attr("stroke", "#ccc")
        .attr("stroke-width", 0.5)
        .append("title")
        .text(d => {
          const name = d.properties.name;
          const topic = dominantTopicsByCountry[name];
          return topic ? `${name}: ${topic}` : name;
        });
    });
  }, [dominantTopicsByCountry]);

  return (
    <div className="w-fit my-6 shadow-md border rounded-md p-4">
      <h2 className="text-lg font-medium text-center mb-4">
        Choropleth Map of Dominant Topics by Country
      </h2>
      <div ref={ref} />
    </div>
  );
};

export default ChoroplethMap;
