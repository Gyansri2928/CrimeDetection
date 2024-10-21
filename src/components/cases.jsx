import React, { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { Style, Fill, Stroke, Icon } from "ol/style";
import "ol/ol.css";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import MarkerPin from "../assets/img/location-pin.png";
import * as d3 from "d3";
// import IndiaMap from "../assets/img/file.png"
// import crimeData from "../assets/data/latest_district_wise_crimes_with_location.json"

// Coordinates for the map to focus on India
const position = [78.9629, 21.7937]; // Center coordinates for India

// Predefined colors with desired opacity
const colorMap = {
  lightgreen: "rgba(144, 238, 144, 0.5)", // lightgreen with 50% opacity
  crimson: "rgba(220, 20, 60, 0.5)", // crimson with 50% opacity
  gold: "rgba(255, 215, 0, 0.5)", // gold with 50% opacity
  coral: "rgba(255, 127, 80, 0.5)", // coral with 50% opacity
};

const styleFunction = (feature) => {
  const color = feature.get("color");
  return new Style({
    fill: new Fill({
      color: colorMap[color] || "rgba(255, 255, 255, 0.6)",
    }),
    stroke: new Stroke({
      color: "#000000",
      width: 1,
    }),
  });
};

// Utility function for counting animation
const useCountUp = (start, end, duration) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const current = Math.min(
        Math.floor((progress / duration) * (end - start) + start),
        end
      );
      setCount(current);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [start, end, duration]);

  return count;
};

export default function Cases() {
  const mapRef = useRef();
  const tooltipRef = useRef();

  const [totalIPC, setTotalIPC] = useState(0);
  const [totalSLL, setTotalSLL] = useState(0);

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState([0, 0]);
  const [markerName, setMarkerName] = useState("");
  const [markerPopulation, setMarkerPopulation] = useState(0);
  const [markerArea, setMarkerArea] = useState(0);
  const [markerIPC, setMarkerIPC] = useState(0);
  const [markerSLL, setMarkerSLL] = useState(0);
  const [markerSafetyCategory, setMarkerSafetyCategory] = useState("");

  const [subTooltipVisible, setSubTooltipVisible] = useState(false);

  const osmLayer = new TileLayer({
    preload: Infinity,
    source: new OSM(),
  });

  useEffect(() => {
    // console.log(crimeData);
  });

  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [osmLayer],
      view: new View({
        center: position,
        zoom: 5,
        maxZoom: 8,
        minZoom: 5,
        projection: "EPSG:4326",
      }),
    });

    const fetchCrimeData = async () => {
      try {
        const res = await fetch("/api/get_map?state=all");
        const data = await res.json();

        let countIPC = 0;
        let countSLL = 0;

        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:4326",
          }),
        });

        const polygonLayer = new VectorLayer({
          source: vectorSource,
          style: styleFunction,
        });

        const markerSource = new VectorSource();

        vectorSource.getFeatures().forEach((feature) => {
          const geom = feature.getGeometry();
          const extent = geom.getExtent();
          const centroid = [
            (extent[0] + extent[2]) / 2,
            (extent[1] + extent[3]) / 2,
          ];

          countIPC += parseInt(
            feature.getProperties()["Total IPC Crimes per 100K people"]
          );
          countSLL += parseInt(
            feature.getProperties()["Total SLL Crimes per 100K people"]
          );

          const exceptions = {
            puducherry: [79.8083, 11.9416],
            "west bengal": [88.3639, 22.5726],
            "d&n haveli & daman & diu": [73.0169, 20.267],
          };

          const marker = new Feature({
            geometry: new Point(
              exceptions[feature.getProperties()["State"]] || centroid
            ),
            population: feature.getProperties()["Population"],
            area: feature.getProperties()["SHAPE_AREA"],
            name: feature.getProperties()["State"],
            ipc: feature.getProperties()["Total IPC Crimes per 100K people"],
            sll: feature.getProperties()["Total SLL Crimes per 100K people"],
            total:
              feature.getProperties()[
                "Total Crimes per 100K people (IPC_wt=3*SLL_wt)"
              ],
            safety_category: feature.getProperties()["safety_category"],
            type: "marker",
          });

          // Set a style for the marker
          marker.setStyle(
            new Style({
              image: new Icon({
                src: MarkerPin,
                scale: 0.3,
                anchor: [0.5, 1],
              }),
            })
          );

          markerSource.addFeature(marker);
        });

        const markerLayer = new VectorLayer({
          source: markerSource,
        });

        map.addLayer(polygonLayer);
        map.addLayer(markerLayer);

        // Change cursor on marker hover
        map.on("pointermove", (event) => {
          const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => {
            return feature;
          });

          if (feature && feature.get("type") === "marker") {
            // If hovering over a marker, set cursor to pointer
            mapRef.current.style.cursor = "pointer";

            setMarkerName(feature.get("name"));
            setMarkerPopulation(
              parseInt(feature.get("population")).toLocaleString()
            );
            setMarkerArea(
              parseInt(feature.get("area") / 1000000).toLocaleString()
            );
            setMarkerIPC(feature.get("ipc"));
            setMarkerSLL(feature.get("sll"));
            setMarkerSafetyCategory(feature.get("safety_category"));

            setTooltipVisible(true);

            // Position the tooltip
            const coordinates = feature.getGeometry().getCoordinates();
            const pixel = map.getPixelFromCoordinate(coordinates);
            setTooltipPosition([pixel[0] - 2, pixel[1]]);
          } else {
            // Reset cursor if not hovering over a marker
            mapRef.current.style.cursor = "";
            setTooltipVisible(false);
          }
        });
        
        map.on("click", async (event) => {
          setTooltipVisible(false);

          const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => {
            return feature;
          });

          if (feature && feature.get("type") === "marker") {
            const exclude = ["ladakh", "lakshadweep"];

            if (!exclude.includes(feature.getProperties()["name"])) {
              const res = await fetch(
                `/api/get_map?state=${encodeURIComponent(
                  feature.getProperties()["name"]
                )}`
              );
              const data = await res.json();

              d3.select("#district-map")
                .append("h1")
                .text(`${data.features[0].properties.State_x} Districts`)
                .attr(
                  "class",
                  "text-black text-2xl my-4 w-full text-center capitalize"
                )
                .attr("id", "district-head");

              const svg = d3
                .select("#district-map")
                .append("svg")
                .attr("width", "90%")
                .attr("height", "90%")
                .attr("viewBox", "0 0 800 600")
                .attr("id", "district-svg")
                .style("margin", "auto");

              const projection = d3
                .geoIdentity() // Doesn't convert or project coords, treats them as raw x/y
                .reflectY(true) // Flip Y axis since SVG's Y is inverted
                .fitSize([800, 600], data);

              const pathGenerator = d3.geoPath().projection(projection);

              const group = svg.append("g");

              group
                .selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                .attr("d", pathGenerator)
                .attr("fill", (d) => d.properties.color)
                .attr("stroke", "black")
                .attr("stroke-width", 2);

              const markers = group
                .selectAll("image")
                .data(data.features)
                .enter()
                .append("image")
                .attr("xlink:href", MarkerPin) // Set the marker image source
                .attr("width", 32) // Set the width of the marker image
                .attr("height", 32) // Set the height of the marker image
                .attr("transform", (d) => {
                  const centroid = d3.geoCentroid(d); // Calculate the centroid
                  return `translate(${projection(centroid)[0] - 12}, ${
                    projection(centroid)[1] - 12
                  })`; // Center the image on the centroid
                })
                .style("cursor", "pointer");

              markers.on("mouseover", (event, d) => {
                setMarkerName(d.properties["District"]);
                setMarkerPopulation(
                  parseInt(d.properties["Population"]).toLocaleString()
                );
                setMarkerArea(
                  parseInt(
                    d.properties["SHAPE_AREA"] / 1000000
                  ).toLocaleString()
                );
                setMarkerIPC(d.properties["Total IPC Crimes per 100K people"]);
                setMarkerSLL(d.properties["Total IPC Crimes per 100K people"]);
                setMarkerSafetyCategory(d.properties["safety_category"]);

                setSubTooltipVisible(true);

                // Position the tooltip
                // const transform = d3.select(this).attr("transform");
                // const [x, y] = transform.match(/translate\(([^,]+), ([^,]+)\)/).slice(1).map(Number);
                setTooltipPosition([event.clientX, event.clientY]);
              });

              markers.on("mouseout", (event, d) => {
                setSubTooltipVisible(false);
              });

              let mf = document.getElementById("modal-fade");
              mf.classList.remove("hidden");
            }
          }
        });

        setTotalIPC(countIPC);
        setTotalSLL(countSLL);
      } catch (e) {
        console.log(e);
      }
    };

    fetchCrimeData();

    return () => {
      map.setTarget(null);
      setTooltipVisible(false);
      setSubTooltipVisible(false);
      setTooltipPosition(null);
      setMarkerName("");
      setMarkerPopulation(0);
      setMarkerArea(0);
      setMarkerIPC(0);
      setMarkerSLL(0);
      setMarkerSafetyCategory("");
    };
  }, []);

  // Using useCountUp for counting animation
  const ipcCount = useCountUp(0, totalIPC, 2000); // Duration is 2000ms (2 seconds)
  const sllCount = useCountUp(0, totalSLL, 2000);
  const totalCount = useCountUp(0, totalIPC + totalSLL, 2000);

  const Tooltip = ({
    tooltipRef,
    tooltipPosition,
    markerName,
    markerPopulation,
    markerArea,
    markerIPC,
    markerSLL,
    markerSafetyCategory,
    pos,
  }) => {
    return (
      <div
        ref={tooltipRef}
        className={`${
          pos ?? "fixed"
        } bg-gray-50 text-black border rounded-md p-5 pointer-events-none w-80 h-auto flex flex-col justify-aroundd z-50`}
        style={{
          left: `${tooltipPosition[0]}px`,
          top: `${tooltipPosition[1]}px`,
        }}
      >
        <h2 className="text-purple-500 capitalize w-full">{markerName}</h2>
        <p className="w-full flex justify-between">
          <span>Population</span>
          <span>{markerPopulation}</span>
        </p>
        <p className="w-full flex justify-between">
          <span>Area</span>
          <span>
            {markerArea}{" "}
            <span className="text-xs">
              km<sup>2</sup>
            </span>
          </span>
        </p>
        <p className="w-full flex justify-between">
          <span>Total IPC Crimes</span>
          <span>
            {markerIPC} <span className="text-xs">per 100K people</span>
          </span>
        </p>
        <p className="w-full flex justify-between">
          <span>Total SLL Crimes</span>
          <span>
            {markerSLL} <span className="text-xs">per 100K people</span>
          </span>
        </p>
        <p className="w-full flex justify-between">
          <span>Safety Category</span>
          <span className="capitalize">
            {markerSafetyCategory}
          </span>
        </p>
        {pos==="absolute" && <p class="mt-4 text-red-400 italic text-sm">*Click on the marker to enlarge</p>}
      </div>
    );
  };

  return (
    <div
      className="flex flex-col items-center justify-around max-w-full w-full m-auto px-6 py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white"
      id="cases"
    >
      <h2
        className="text-center text-blue-300 font-bold text-5xl mb-16 max-lg:w-11/12 w-4/5"
        id="cases-title"
      >
        Crime Stats
      </h2>

      {/* Crime Data Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-lg:w-11/12 w-4/5">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-blue-500">
          <h3 className="text-blue-300 font-semibold text-xl mb-4">
            IPC Crimes
          </h3>
          <p className="text-2xl font-bold">{ipcCount.toLocaleString()}</p>
          <p className="text-xs text-gray-400 my-1">* per 100K people</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-blue-500">
          <h3 className="text-blue-300 font-semibold text-xl mb-4">
            SLL Crimes
          </h3>
          <p className="text-2xl font-bold">{sllCount.toLocaleString()}</p>
          <p className="text-xs text-gray-400 my-1">* per 100K people</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-blue-500">
          <h3 className="text-blue-300 font-semibold text-xl mb-4">
            Total Crimes
          </h3>
          <p className="text-2xl font-bold">{totalCount.toLocaleString()}</p>
          <p className="text-xs text-gray-400 my-1">* per 100K people</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 text-center text-sm text-gray-400 max-lg:w-11/12 w-4/5">
        <p>
          Disclaimer: The crime statistics provided above are normalized to
          crimes per 1,00,000 people based on the mean data from 2014 to 2022.
          The numbers represent an approximation and may vary as new data
          becomes available.
        </p>
      </div>

      {/* Map Container */}
      <div className="mt-12 max-lg:w-11/12 w-4/5 relative">
        <div
          id="map"
          ref={mapRef}
          className="map-container w-full min-h-80 h-[80vh]"
        />
        {tooltipVisible && (
          <Tooltip
            tooltipRef={tooltipRef}
            tooltipPosition={tooltipPosition}
            markerName={markerName}
            markerPopulation={markerPopulation}
            markerArea={markerArea}
            markerIPC={markerIPC}
            markerSLL={markerSLL}
            markerSafetyCategory={markerSafetyCategory}
            pos="absolute"
          />
        )}
        <div className="legend px-5 py-2 absolute top-0 right-0 bg-white text-black">
          <div className="legend-item flex justify-between w-40 my-2">
            <div className="color-box bg-[lightgreen] opacity-50 w-8 h-6"></div>
            <span>Safe</span>
          </div>
          <div className="legend-item flex justify-between w-40 my-2">
            <div className="color-box bg-[gold] opacity-50 w-8 h-6"></div>
            <span>Less Safe</span>
          </div>
          <div className="legend-item flex justify-between w-40 my-2">
            <div className="color-box bg-[coral] opacity-50 w-8 h-6"></div>
            <span>Unsafe</span>
          </div>
          <div className="legend-item flex justify-between w-40 my-2">
            <div className="color-box bg-[crimson] opacity-50 w-8 h-6"></div>
            <span>Highly Unsafe</span>
          </div>
        </div>
      </div>
      <div
        className="hidden fixed top-0 left-0 bg-[rgba(0,0,0,0.9)] w-screen h-screen z-20"
        id="modal-fade"
      >
        <div
        className="fixed object-fill map-container h-[80vh] top-[calc(100vh-90vh)] max-lg:left-[calc(100%-95%)] max-lg:w-11/12 w-4/5 left-[calc(100%-90%)] z-30 border-2 border-gray-400 rounded-lg"
        id="district-map"
      >
        {subTooltipVisible && (
          <Tooltip
            tooltipRef={tooltipRef}
            tooltipPosition={tooltipPosition}
            markerName={markerName}
            markerPopulation={markerPopulation}
            markerArea={markerArea}
            markerIPC={markerIPC}
            markerSLL={markerSLL}
            markerSafetyCategory={markerSafetyCategory}
            pos="fixed"
          />
        )}

        <div className="patch absolute top-0 left-0 bg-white w-full h-10"></div>

        <button
          type="button"
          id="modal-close-btn"
          className="absolute w-8 h-8 rounded-md z-40 right-1 top-1 bg-red-500 hover:bg-red-600 text-white"
          title="Close"
          onClick={() => {
            let mf = document.getElementById("modal-fade");
            mf.classList.add("hidden");
            d3.select("#district-head").remove();
            d3.select("#district-svg").remove();
          }}
        >
          X
        </button>
      </div>
      </div>
    </div>
  );
}
