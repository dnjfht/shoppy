export default function Button({
  value,
  icon,
  children,
  onClick,
  styleType,
  styles,
}) {
  const basicStyles = {
    hover:
      "hover:bg-opacity-0 hover:text-black last:py-3 bg-black bg-opacity-100 border-[1px] border-solid border-black rounded-lg text-white transition-all duration-700",
    grayBorder: "border-solid border-[#cacaca]",
    blackBorder: "border-solid border-black",
    blackBg: "bg-black",
  }[styleType];

  return (
    <button onClick={onClick} className={`${styles} ${basicStyles}`}>
      {value ?? icon}
      {children}
    </button>
  );
}
