export default function Button({
  value,
  icon,
  children,
  onClick,
  isDisabled,
  styleType,
  styles,
}) {
  const basicStyles = {
    whiteHover:
      "border-[1px] border-solid bg-black bg-opacity-100 border-black rounded-lg text-white hover:bg-opacity-0 hover:border-white transition-all duration-700",
    blackHover:
      "border-[1px] border-solid bg-black bg-opacity-100 border-black rounded-lg text-white hover:bg-opacity-0 hover:text-black transition-all duration-700",
    hover: "border-[1px] border-solid rounded-lg transition-all duration-700",
    grayBorder: "border-[1px] border-solid border-[#cacaca]",
    blackBorder: "border-[1px] border-solid border-black",
    blackBg: "bg-black text-white",
    redBg: "bg-[#ff4273] text-white",
  }[styleType];

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${styles} ${basicStyles}`}
    >
      {value ?? icon}
      {children}
    </button>
  );
}
