import React, { useState } from "react";

export default function DetailInfo({ detailImg }) {
  const [fold, setFold] = useState(false);

  return (
    <div className="w-full py-[50px] px-[12rem]">
      {detailImg &&
        detailImg?.map((img) => {
          return (
            <img
              className="w-full object-cover"
              src={process.env.PUBLIC_URL + `/../${img}`}
              alt="detail_img"
            />
          );
        })}
    </div>
  );
}
