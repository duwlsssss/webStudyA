const Input = ({ className, value, onChange, placeholder, onKeyDown }) =>{
  return (
    <input
      type="text"
      className={className}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    />
  );
}

export default Input;