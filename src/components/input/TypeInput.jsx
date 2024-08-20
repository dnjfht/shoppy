import Button from "../button/Button";

import { GoX } from "react-icons/go";

export default function TypeInput({
  id,
  type,
  placeholder,
  text,
  setText,
  onChange,
  divStyles,
  inputStyles,
  deleteButtonStyle,
  styleType,
}) {
  const basicStyles = {
    search:
      "w-full placeholder:text-[#a5a5a5] bg-[rgba(0,0,0,0.6)] border-[2px] border-solid border-white",
    auth: "w-full placeholder:text-[#a5a5a5] bg-transparent border-[1px] border-solid border-[#a3a3a3]",
  }[styleType];

  return (
    <div className={`${divStyles} relative`}>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={text}
        onChange={onChange}
        className={`${basicStyles} ${inputStyles} outline-none`}
      />
      <Button
        icon={<GoX />}
        onClick={() => setText("")}
        styleType="blackBg"
        styles={`${
          text?.length !== 0 ? "opacity-100" : "opacity-0"
        } ${deleteButtonStyle} rounded-full absolute flex items-center justify-center md:text-[1.4rem] 3sm:text-[1.2rem] transition-all duration-700`}
      />
    </div>
  );
}
