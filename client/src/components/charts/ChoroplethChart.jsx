import React, { useMemo } from "react";
import ChoroplethMap from "../ChoroplethMap";

const ChoroplethContainer = ({ data }) => {
  const dominantTopicsByCountry = useMemo(() => {
    const countryTopicCount = {};

    data.forEach(d => {
      if (d.country && d.topic) {
        const country = d.country.trim();
        const topic = d.topic.trim();
        if (!countryTopicCount[country]) countryTopicCount[country] = {};
        if (!countryTopicCount[country][topic]) countryTopicCount[country][topic] = 0;
        countryTopicCount[country][topic]++;
      }
    });

    const result = {};
    for (const country in countryTopicCount) {
      const topics = countryTopicCount[country];
      const dominant = Object.keys(topics).reduce((a, b) => topics[a] > topics[b] ? a : b);
      result[country] = dominant;
    }

    return result;
  }, [data]);

  return <ChoroplethMap dominantTopicsByCountry={dominantTopicsByCountry} />;
};

export default ChoroplethContainer;
