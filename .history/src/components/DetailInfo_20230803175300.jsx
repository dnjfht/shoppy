import React from "react";

export default function DetailInfo({ detailImg }) {
  console.log(detailImg);
  return (
    <div className="py-[500px] px-[12rem]">
      {detailImg &&
        detailImg?.map((img) => {
          return (
            <img src={process.env.PUBLIC_URL + `/../${img}`} alt="detail_img" />
          );
        })}
    </div>
  );
}
