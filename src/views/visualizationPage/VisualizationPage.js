import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {useRouter} from "next/router";

export default function VisualizationPage({defaultRectangle, defaultCircle}) {
  const [shape, setShape] = useState("Rectangle")
  const router = useRouter()

  const rectangleValuesRef = useRef({
    width: defaultRectangle.width,
    height: defaultRectangle.height,
    rebars: defaultRectangle.rebars.count,
    diameter: defaultRectangle.rebars.diameter,
  })

  const circleValuesRef = useRef({
    radius: defaultCircle.radius,
    rebars: defaultCircle.rebars.count,
    diameter: defaultCircle.rebars.diameter,
  })

  const svgRef = useRef(null);

  const renderRectangle = () => {
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const {width, height, rebars, diameter} = rectangleValuesRef.current

    const margin = 20
    const viewBoxWidth = width + margin * 2
    const viewBoxHeight = height + margin * 2

    svg
      .attr("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet")

    svg
      .append("rect")
      .attr("x", margin)
      .attr("y", margin)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#ddd")
      .attr("stroke", "#000")

    const perimeter = 2 * (width + height)
    const spacing = perimeter / rebars

    let currentLength = 0

    for (let i = 0; i < rebars; i++) {
      let x, y

      if (currentLength <= width) {
        x = margin + currentLength
        y = margin
      } else if (currentLength <= width + height) {
        x = margin + width
        y = margin + (currentLength - width)
      } else if (currentLength <= 2 * width + height) {
        x = margin + (width - (currentLength - (width + height)))
        y = margin + height
      } else {
        x = margin
        y = margin + (height - (currentLength - (2 * width + height)))
      }

      svg
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", diameter / 2)
        .attr("fill", "red")

      currentLength += spacing
    }
  };

  const renderCircle = () => {
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const {radius, rebars, diameter} = circleValuesRef.current

    const margin = 20
    const viewBoxSize = 2 * (radius + margin)

    svg
      .attr("viewBox", `0 0 ${viewBoxSize} ${viewBoxSize}`)
      .attr("preserveAspectRatio", "xMidYMid meet")

    svg
      .append("circle")
      .attr("cx", viewBoxSize / 2)
      .attr("cy", viewBoxSize / 2)
      .attr("r", radius)
      .attr("fill", "#ddd")
      .attr("stroke", "#000")

    for (let i = 0; i < rebars; i++) {
      const angle = (i * 2 * Math.PI) / rebars
      svg
        .append("circle")
        .attr("cx", viewBoxSize / 2 + radius * Math.cos(angle))
        .attr("cy", viewBoxSize / 2 + radius * Math.sin(angle))
        .attr("r", diameter / 2)
        .attr("fill", "red")
    }
  }

  const updateVisualization = () => {
    if (shape === "Rectangle") {
      renderRectangle()
    } else {
      renderCircle()
    }
  }

  useEffect(() => {
    updateVisualization()
  }, [shape])

  const handleInputChange = (e, key, isRectangle = true) => {
    const value = +e.target.value
    if (isRectangle) {
      rectangleValuesRef.current[key] = value
    } else {
      circleValuesRef.current[key] = value
    }
    updateVisualization()
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="md:text-2xl sm:text-xl text-lg font-bold my-4">2D Visualization Tool</h1>
      <div className="flex mb-4 bg-gray-300 shadow-lg p-4 rounded text-black">
        <label>
          Shape:
          <select
            value={shape}
            onChange={(e) => {
              const selectedShape = e.target.value
              setShape(selectedShape)

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
                }
              }
              updateVisualization()
            }}
            className="ml-2 p-1 border rounded text-black">
            <option value="Rectangle">Rectangle</option>
            <option value="Circle">Circle</option>
          </select>
        </label>
      </div>
      {shape === "Rectangle" ? (
        <div
          className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 shadow-lg bg-gray-300 p-4 rounded text-black">
          <div className="flex flex-col">
            <label className="text-center">Width (mm):</label>
            <input
              type="number"
              key="width"
              min={1}
              defaultValue={defaultRectangle.width}
              onChange={(e) => handleInputChange(e, "width")}
              className="p-1 border rounded w-full"/>
          </div>
          <div className="flex flex-col">
            <label className="text-center">Height (mm):</label>
            <input
              type="number"
              key="height"
              min={1}
              defaultValue={defaultRectangle.height}
              onChange={(e) => handleInputChange(e, "height")}
              className="p-1 border rounded w-full"/>
          </div>
          <div className="flex flex-col">
            <label className="text-center">Rebars:</label>
            <input
              type="number"
              key="rebars"
              min={1}
              defaultValue={defaultRectangle.rebars.count}
              onChange={(e) => handleInputChange(e, "rebars")}
              className="p-1 border rounded w-full"/>
          </div>
          <div className="flex flex-col">
            <label className="text-center">Diameter (mm):</label>
            <input
              type="number"
              key="diameter"
              min={1}
              defaultValue={defaultRectangle.rebars.diameter}
              onChange={(e) => handleInputChange(e, "diameter")}
              className="p-1 border rounded w-full"/>
          </div>
        </div>
      ) : (
        <div
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 shadow-lg bg-gray-300 p-4 rounded text-black">
          <div className="flex flex-col">
            <label className="text-center">Radius (mm):</label>
            <input
              type="number"
              key="radius"
              min={1}
              defaultValue={defaultCircle.radius}
              onChange={(e) => handleInputChange(e, "radius", false)}
              className="p-1 border rounded w-full"/>
          </div>
          <div className="flex flex-col">
            <label className="text-center">Rebars:</label>
            <input
              type="number"
              key="rebars"
              min={1}
              defaultValue={defaultCircle.rebars.count}
              onChange={(e) => handleInputChange(e, "rebars", false)}
              className="p-1 border rounded w-full"/>
          </div>
          <div className="flex flex-col">
            <label className="text-center">Diameter (mm):</label>
            <input
              type="number"
              key="diameter"
              min={1}
              defaultValue={defaultCircle.rebars.diameter}
              onChange={(e) => handleInputChange(e, "diameter", false)}
              className="p-1 border rounded w-full"/>
          </div>
        </div>
      )}
      <div
        className="flex justify-center items-center w-full max-w-[800px] md:max-w-[600px] sm:max-w-[400px] h-auto my-10 aspect-square overflow-hidden bg-gray-100 rounded-lg">
        <svg
          ref={svgRef}
          className="w-full h-full"/>
      </div>
      <button
        onClick={() => router.push("/")}
        className="mb-8 px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
        Back to Home
      </button>
    </div>
  )
}