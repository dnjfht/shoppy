export default function MyBodySizeModalInput({
  labelName,
  title,
  onChange,
  value,
  sizeData,
}) {
  return (
    <div className="w-full mb-3 py-4 px-5 box-border border-[1px] border-solid border-[#c1c1c1] rounded-lg flex items-center">
      <label
        className="w-[30%] border-r-[1px] border-solid border-[#282828] text-[0.875rem]"
        htmlFor={labelName}
      >
        {title}
      </label>
      <input
        className="w-[70%] outline-none text-center"
        onChange={onChange}
        value={value}
        id={labelName}
        type="text"
        placeholder={`${sizeData ?? "0"}`}
      />
    </div>
  );
}
