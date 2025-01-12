import {InputField} from "@/components";

function InputFields({
                       shape,
                       defaultRectangle,
                       defaultCircle,
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

  const validateInput = (key, value) => {
    const validations = {
      width: (value) => (value > 80 ? null : "It must be greater than 80 mm."),
      height: (value) => (value > 80 ? null : "It must be greater than 80 mm."),
      rectangleRebars: (value) => (value > 0 ? null : "It must be greater than 0."),
      rectangleDiameter: (value) => (value > 0 ? null : "It must be greater than 0."),
      radius: (value) => (value > 40 ? null : "It must be greater than 40 mm."),
      circleRebars: (value) => (value > 0 ? null : "It must be greater than 0."),
      circleDiameter: (value) => (value > 0 ? null : "It must be greater than 0."),
    };

    return validations[key](value) || null;
  };

  return (
    <div
      className={`grid gap-4 shadow-lg bg-gray-300 p-4 rounded text-black ${
        shape === "Rectangle" ? "lg:grid-cols-4" : "lg:grid-cols-3"
      }`}>
      {inputFieldsConfig.map(({key, label, defaultValue}) => (
        <InputField
          key={key}
          label={label}
          defaultValue={defaultValue}
          onChange={(e, value) => {
            const errorMessage = validateInput(key, +value);
            handleInputChange(e, key, shape === "Rectangle")
            return errorMessage;
          }}/>
      ))}
    </div>
  );
}

export default InputFields;