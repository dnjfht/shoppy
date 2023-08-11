import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const RatingResult = ({ ratingValue, setRatingValue }) => {
  const handleRatingChange = (event, newValue) => {
    // newValue는 선택한 별점의 값입니다.
    setRatingValue(newValue);
  };
  console.log(ratingValue);
  return (
    <Box component="fieldset" borderColor="transparent">
      <Rating name="read-only" value={value} readOnly />
    </Box>
  );
};

export default BasicRating;
