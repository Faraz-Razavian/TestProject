import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {useRouter} from "next/router";
import {renderSVGCircle, renderSVGRectangle} from "@/utils/tools";
import InputFields from "@/views/visualizationPage/InputFields";
import ShapeSelector from "@/views/visualizationPage/ShapeSelector";
import SVGRenderer from "@/views/visualizationPage/SVGRenderer";

export default function VisualizationPage({defaultRectangle, defaultCircle}) {
  const [shape, setShape] = useState("Rectangle");
  const [errors, setErrors] = useState({});
  const router = useRouter();

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

  const validateInput = (value, minValue, errorMessage) => {
    if (value > minValue) {
      return {isValid: true, error: null};
    }
    return {isValid: false, error: errorMessage}
  };

  const handleInputChange = (e, key, isRectangle = true) => {
    const value = +e.target.value;
    const newErrors = {...errors};
    let isValid = true;

    const keyMapping = {
      rectangleRebars: "rebars",
      rectangleDiameter: "diameter",
      width: "width",
      height: "height",
      circleRebars: "rebars",
      circleDiameter: "diameter",
      radius: "radius",
    }

    const mappedKey = keyMapping[key];

    const validations = {
      rebars: () =>
        validateInput(value, 0, "Rebars must be greater than 0."),
      diameter: () =>
        validateInput(value, 0, "Diameter must be greater than 0."),
      width: () =>
        validateInput(value, 80, "Width must be greater than 80 mm."),
      height: () =>
        validateInput(value, 80, "Height must be greater than 80 mm."),
      radius: () =>
        validateInput(value, 40, "Radius must be greater than 40 mm."),
    }

    const {isValid: valid, error} = validations[mappedKey]();

    if (valid) {
      if (isRectangle) {
        rectangleValuesRef.current[mappedKey] = value;
      } else {
        circleValuesRef.current[mappedKey] = value;
      }
      delete newErrors[key];
    } else {
      newErrors[key] = error;
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      updateVisualization();
    }
  }

  const updateVisualization = () => {
    if (shape === "Rectangle") {
      renderRectangle();
    } else {
      renderCircle();
    }
  };

  const renderRectangle = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const {width, height, rebars, diameter} = rectangleValuesRef.current;

    renderSVGRectangle(svg, {width, height, rebars, diameter});
  };

  const renderCircle = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const {radius, rebars, diameter} = circleValuesRef.current;

    renderSVGCircle(svg, {radius, rebars, diameter});
  };

  useEffect(() => {
    if (Object.keys(errors)?.length) setErrors({});

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

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="md:text-2xl sm:text-xl text-lg font-bold my-4">2D Visualization Tool</h1>
      <ShapeSelector shape={shape} setShape={setShape}/>
      <InputFields
        shape={shape}
        defaultRectangle={defaultRectangle}
        defaultCircle={defaultCircle}
        rectangleValuesRef={rectangleValuesRef}
        circleValuesRef={circleValuesRef}
        errors={errors}
        handleInputChange={handleInputChange}/>
      <SVGRenderer svgRef={svgRef}/>
      <button
        onClick={() => router.push("/")}
        className="mb-8 px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
        Back to Home
      </button>
    </div>
  )
}