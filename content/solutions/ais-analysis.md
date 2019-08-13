---
template: SingleSolution
title: Automatic Identification System (AIS) Vessel Traffic Analysis
subtitle: >-
  Reducing analysis time for NOAA’s Office of Coastal Survey from months to
  hours
slug: ais-analysis
featured:
  caption: CONUS heatmap of AIS tracks over an entire year
  image: /assets/ais-preview.jpg
categories:
  - category: Big Data Analytics
---
The Automatic Identification System is a system of shipboard transmitters and both land-based and satellite-based receivers that broadcast and record vessel locations. While traditionally used for real-time maritime applications, there is increasing interest in using these rich datasets to provide insight into a wide array of oceanographic challenges, such as:

* Prioritizing hydrographic surveys,
* Predicting the probability and impact of oil spills, 
* Quantifying the amount of vessel interactions with marine wildlife,
* and more

Tens of billions of raw AIS messages per year create datasets of immense size. This size, combined with limitations in infrastructure and computing power, have restricted previous AIS data processing to small temporal or spatial subsets. This has proven inadequate for decision-making that often requires analysis on a national or global scale over an entire year. As a solution, we have developed a big-data compute cluster using Apache Spark as the computing engine to overcome the limitations of traditional data storage and processing infrastructure.

As a demonstration of this technical approach, we worked with NOAA’s Office of Coastal Surveys to produce vessel traffic heatmaps for use in their Hydrographic Health Model. Starting with a 2015 terrestrial AIS dataset composed of 74 billion raw messages, we used our computing cluster to parse the messages, clean out invalid data, and aggregate the individual messages into 20 million tracklines, each representing a distinct ship voyage per day. We then used these voyages to produce a set of heatmaps in GeoTIFF format with 500 meter resolution across two different metrics: total traffic volume and unique vessel count. We also developed the ability to run ad-hoc queries against both the raw messages and ship voyages.

The previous state-of-the art, an ArcMap plugin, takes days to weeks to process raw AIS data for one month in one UTM zone. In comparison, processing time using our computing cluster, including all US waters for all of 2015, was only 48 hours.

For more information see https://ais.axds.co/.
