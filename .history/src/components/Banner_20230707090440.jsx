import React from "react";

export default function Banner() {
  return (
    <div>
      <div></div>
      <img
        src={process.env.PUBLIC_URL + "/image/mainBanner.png"}
        alt="banner"
      />
    </div>
  );
}
