export default function Util({ text, icon, children, styles, onClick }) {
  const recieveStyles =
    styles ??
    "relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[0.1rem] after:bg-[#282828] hover:after:w-full transition-all duration-700";

  return (
    <li onClick={onClick} className={recieveStyles}>
      {text ?? icon}
      {children}
    </li>
  );
}
