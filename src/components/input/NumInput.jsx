export default function NumInput({
  id,
  placeholder,
  text,
  onChange,
  inputStyles,
  styleType,
}) {
  const basicStyles = {
    search:
      "placeholder:text-[#a5a5a5] bg-[rgba(0,0,0,0.6)] border-[2px] border-solid border-white",
    auth: "",
  }[styleType];

  return (
    <input
      id={id}
      type="number"
      placeholder={placeholder}
      value={text}
      onChange={onChange}
      className={`${basicStyles} ${inputStyles} outline-none`}
    />
  );
}
