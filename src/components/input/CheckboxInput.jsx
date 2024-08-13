export default function CheckboxInput({ checked, onChange, styles }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`${styles}`}
    />
  );
}
