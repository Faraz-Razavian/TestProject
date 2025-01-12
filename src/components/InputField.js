import {useRef} from "react";

function InputField({
                      key,
                      label,
                      min = 1,
                      defaultValue,
                      className = "p-1 border rounded w-full",
                      type = "number",
                      onChange,
                    }) {
  const errorRef = useRef(null);

  const showError = (errorMessage) => {
    if (errorMessage) {
      errorRef.current.textContent = errorMessage;
      errorRef.current.classList.remove("hidden");
    } else {
      errorRef.current.textContent = "";
      errorRef.current.classList.add("hidden");
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-center">{label}</label>
      <input
        type={type}
        key={key}
        min={min}
        defaultValue={defaultValue}
        onChange={(e) => {
          const {value} = e.target;
          const errorMessage = onChange(e, value);
          showError(errorMessage);
        }}
        className={className}/>
      <p ref={errorRef} className="text-red-500 text-sm hidden"></p>
    </div>
  );
}

export default InputField;