import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const BasicRating = () => {
  // 초기 별점 값으로 0.0을 가집니다.
  const [ratingValue, setRatingValue] = useState(0);

  const handleRatingChange = (event, newValue) => {
    // newValue는 선택한 별점의 값입니다.
    setRatingValue(newValue);
  };
  console.log(ratingValue);
  return (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Rating
        name="basic-rating"
        value={ratingValue}
        onChange={handleRatingChange}
      />
    </Box>
  );
};

export default BasicRating;
