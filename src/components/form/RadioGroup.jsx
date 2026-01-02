
function RadioGroup({ name, text, options, handleOnChange, value }) {
  return (
    <div className="mb-3">
      <label className="form-label">{text}:</label>
      <div>
        {options.map((option) => (
          <label key={option.value} style={{ marginRight: "10px" }}>
            <input 
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleOnChange}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioGroup