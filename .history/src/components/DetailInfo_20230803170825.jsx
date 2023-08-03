import React from "react";

export default function DetailInfo({ detailImg }) {
  return (
    <div>
      {detailImg &&
        detailImg?.map((img) => {
          return (
            <img src={process.env.PUBLIC_URL + `/../${img}`} alt="detail_img" />
          );
        })}
    </div>
  );
}
