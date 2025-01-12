import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {useRouter} from "next/router";
import {renderSVGCircle, renderSVGRectangle} from "@/utils/tools";
import InputFields from "@/views/visualizationPage/InputFields";
import ShapeSelector from "@/views/visualizationPage/ShapeSelector";
import SVGRenderer from "@/views/visualizationPage/SVGRenderer";

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

  const validateInput = (key, value) => {
    const rules = {
      width: (v) => v > 80,
      height: (v) => v > 80,
      radius: (v) => v > 40,
      rebars: (v) => v > 0,
      diameter: (v) => v > 0,
    };
    return rules[key]?.(value) || false;
  };

  const handleInputChange = (e, key, isRectangle = true) => {
    const value = +e.target.value;

    const keyMapping = {
      rectangleRebars: "rebars",
      rectangleDiameter: "diameter",
      width: "width",
      height: "height",
      circleRebars: "rebars",
      circleDiameter: "diameter",
      radius: "radius",
    };

    const mappedKey = keyMapping[key];

    if (!validateInput(mappedKey, value)) return;

    if (isRectangle) {
      rectangleValuesRef.current[mappedKey] = value;
    } else {
      circleValuesRef.current[mappedKey] = value;
    }

    updateVisualization();
  };

  const updateVisualization = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    if (shape === "Rectangle") {
      const {width, height, rebars, diameter} = rectangleValuesRef.current;
      renderSVGRectangle(svg, {width, height, rebars, diameter});
    } else {
      const {radius, rebars, diameter} = circleValuesRef.current;
      renderSVGCircle(svg, {radius, rebars, diameter});
    }
  };

  useEffect(() => {
    if (shape === "Rectangle") {
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
  }, [shape]);

  console.log("Render")

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="md:text-2xl sm:text-xl text-lg font-bold my-4">
        2D Visualization Tool
      </h1>
      <ShapeSelector shape={shape} setShape={setShape}/>
      <InputFields
        shape={shape}
        defaultRectangle={defaultRectangle}
        defaultCircle={defaultCircle}
        handleInputChange={handleInputChange}/>
      <SVGRenderer svgRef={svgRef}/>
      <button
        onClick={() => router.push("/")}
        className="mb-8 px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
        Back to Home
      </button>
    </div>
  );
}
