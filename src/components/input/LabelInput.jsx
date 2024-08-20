import Label from "./Label";

export default function LabelInput({
  htmlFor,
  text,
  divStyle,
  labelStyle,
  children,
}) {
  return (
    <div className={`${divStyle}`}>
      <Label htmlFor={htmlFor} text={text} styles={labelStyle} />
      {children}
    </div>
  );
}
