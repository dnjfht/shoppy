export default function Label({ htmlFor, text, styles }) {
  return (
    <label htmlFor={htmlFor} className={`block ${styles}`}>
      {text}
    </label>
  );
}
