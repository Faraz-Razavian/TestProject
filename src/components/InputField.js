function InputField({
                      key,
                      label,
                      defaultValue,
                      className = "p-1 border rounded w-full",
                      min = 1,
                      type = "number",
                      onChange
                    }) {
  return (
    <div className="flex flex-col">
      <label className="text-center">{label}</label>
      <input
        type={type}
        min={min}
        key={key}
        defaultValue={defaultValue}
        onChange={onChange}
        className={className}/>
    </div>
  );
}

export default InputField;