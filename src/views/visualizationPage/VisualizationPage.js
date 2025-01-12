import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {useRouter} from "next/router";
import {InputField} from "@/components";

export default function VisualizationPage({defaultRectangle, defaultCircle}) {
  const [shape, setShape] = useState("Rectangle");
  const router = useRouter();

  const rectangleValuesRef = useRef({
    width: defaultRectangle.width,
    height: defaultRectangle.height,
    rebars: defaultRectangle.rebars.count,
    diameter: defaultRectangle.rebars.diameter,
  });

  const circleValuesRef = useRef({
    radius: defaultCircle.radius,
    rebars: defaultCircle.rebars.count,
    diameter: defaultCircle.rebars.diameter,
  });

  const svgRef = useRef(null);

  const renderRectangle = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const {width, height, rebars, diameter} = rectangleValuesRef.current;
    const cover = 40;
    const margin = 20;

    const viewBoxWidth = width + margin * 2;
    const viewBoxHeight = height + margin * 2;

    svg
      .attr("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg
      .append("rect")
      .attr("x", margin)
      .attr("y", margin)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#ddd")
      .attr("stroke", "#000");

    const innerWidth = width - 2 * cover;
    const innerHeight = height - 2 * cover;

    const perimeter = 2 * (innerWidth + innerHeight);
    const spacing = perimeter / rebars;

    let currentLength = 0;

    for (let i = 0; i < rebars; i++) {
      let x, y;

      if (currentLength <= innerWidth) {
        x = margin + cover + currentLength;
        y = margin + cover;
      } else if (currentLength <= innerWidth + innerHeight) {
        x = margin + cover + innerWidth;
        y = margin + cover + (currentLength - innerWidth);
      } else if (currentLength <= 2 * innerWidth + innerHeight) {
        x = margin + cover + (innerWidth - (currentLength - (innerWidth + innerHeight)));
        y = margin + cover + innerHeight;
      } else {
        x = margin + cover;
        y = margin + cover + (innerHeight - (currentLength - (2 * innerWidth + innerHeight)));
      }

      svg
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", diameter / 2)
        .attr("fill", "red");

      currentLength += spacing;
    }
  };

  const renderCircle = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const {radius, rebars, diameter} = circleValuesRef.current;
    const cover = 40;
    const margin = 20;

    const effectiveRadius = radius - cover;
    const viewBoxSize = 2 * (radius + margin);

    svg
      .attr("viewBox", `0 0 ${viewBoxSize} ${viewBoxSize}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg
      .append("circle")
      .attr("cx", viewBoxSize / 2)
      .attr("cy", viewBoxSize / 2)
      .attr("r", radius)
      .attr("fill", "#ddd")
      .attr("stroke", "#000");

    for (let i = 0; i < rebars; i++) {
      const angle = (i * 2 * Math.PI) / rebars;

      svg
        .append("circle")
        .attr(
          "cx",
          viewBoxSize / 2 + effectiveRadius * Math.cos(angle)
        )
        .attr(
          "cy",
          viewBoxSize / 2 + effectiveRadius * Math.sin(angle)
        )
        .attr("r", diameter / 2)
        .attr("fill", "red");
    }
  };


  const updateVisualization = () => {
    if (shape === "Rectangle") {
      renderRectangle();
    } else {
      renderCircle();
    }
  };

  useEffect(() => {
    updateVisualization();
  }, [shape]);

  const handleInputChange = (e, key, isRectangle = true) => {
    const value = +e.target.value;
    if (isRectangle) {
      if (key === "rectangleRebars") {
        rectangleValuesRef.current.rebars = value;
      } else {
        rectangleValuesRef.current[key] = value;
      }
    } else {
      if (key === "circleRebars") {
        circleValuesRef.current.rebars = value;
      } else {
        circleValuesRef.current[key] = value;
      }
    }
    updateVisualization();
  };

  const inputFieldsConfig = shape === "Rectangle"
    ? [
      {key: "width", label: "Width (mm):", defaultValue: defaultRectangle.width},
      {key: "height", label: "Height (mm):", defaultValue: defaultRectangle.height},
      {key: "rectangleRebars", label: "Rebars:", defaultValue: defaultRectangle.rebars.count},
      {key: "diameter", label: "Diameter (mm):", defaultValue: defaultRectangle.rebars.diameter},
    ]
    : [
      {key: "radius", label: "Radius (mm):", defaultValue: defaultCircle.radius},
      {key: "circleRebars", label: "Rebars:", defaultValue: defaultCircle.rebars.count},
      {key: "diameter", label: "Diameter (mm):", defaultValue: defaultCircle.rebars.diameter},
    ];

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="md:text-2xl sm:text-xl text-lg font-bold my-4">2D Visualization Tool</h1>
      <div className="flex mb-4 bg-gray-300 shadow-lg p-4 rounded text-black">
        <label>
          Shape:
          <select
            value={shape}
            onChange={(e) => {
              const selectedShape = e.target.value;
              setShape(selectedShape);
              if (selectedShape === "Rectangle") {
                rectangleValuesRef.current = {
                  width: defaultRectangle.width,
                  height: defaultRectangle.height,
                  rebars: defaultRectangle.rebars.count,
                  diameter: defaultRectangle.rebars.diameter,
                };
              } else {
                circleValuesRef.current = {
                  radius: defaultCircle.radius,
                  rebars: defaultCircle.rebars.count,
                  diameter: defaultCircle.rebars.diameter,
                };
              }
              updateVisualization();
            }}
            className="ml-2 p-1 border rounded text-black">
            <option value="Rectangle">Rectangle</option>
            <option value="Circle">Circle</option>
          </select>
        </label>
      </div>
      <div
        className={`grid ${shape === "Rectangle" ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-4 shadow-lg bg-gray-300 p-4 rounded text-black`}>
        {inputFieldsConfig.map(({key, label, defaultValue}) => (
          <InputField
            key={key}
            label={label}
            defaultValue={defaultValue}
            onChange={(e) => handleInputChange(e, key, shape === "Rectangle")}/>
        ))}
      </div>
      <div
        className="flex justify-center items-center w-full max-w-[800px] md:max-w-[600px] sm:max-w-[400px] h-auto my-10 aspect-square overflow-hidden bg-gray-100 rounded-lg">
        <svg ref={svgRef} className="w-full h-full"/>
      </div>
      <button
        onClick={() => router.push("/")}
        className="mb-8 px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
        Back to Home
      </button>
    </div>
  );
}