import classNames from "classnames";
import {InputField} from "@/components";

function InputFields({
                       shape,
                       defaultRectangle,
                       defaultCircle,
                       errors,
                       handleInputChange,
                     }) {
  const inputFieldsConfig =
    shape === "Rectangle"
      ? [
        {key: "width", label: "Width (mm):", defaultValue: defaultRectangle.width},
        {key: "height", label: "Height (mm):", defaultValue: defaultRectangle.height},
        {key: "rectangleRebars", label: "Rebars:", defaultValue: defaultRectangle.rebars.count},
        {key: "rectangleDiameter", label: "Diameter (mm):", defaultValue: defaultRectangle.rebars.diameter},
      ]
      : [
        {key: "radius", label: "Radius (mm):", defaultValue: defaultCircle.radius},
        {key: "circleRebars", label: "Rebars:", defaultValue: defaultCircle.rebars.count},
        {key: "circleDiameter", label: "Diameter (mm):", defaultValue: defaultCircle.rebars.diameter},
      ];

  return (
    <div
      className={classNames(
        "grid gap-4 shadow-lg bg-gray-300 p-4 rounded text-black",
        shape === "Rectangle" ? "lg:grid-cols-4" : "lg:grid-cols-3"
      )}>
      {inputFieldsConfig.map(({key, label, defaultValue}) => (
        <div key={key}>
          <InputField
            label={label}
            defaultValue={defaultValue}
            onChange={(e) => handleInputChange(e, key, shape === "Rectangle")}
            className={classNames(
              "p-1 border rounded w-full",
              errors[key] && "border-red-500"
            )}/>
          {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
        </div>
      ))}
    </div>
  );
}

export default InputFields;