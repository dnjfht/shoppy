import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const CustomStarIcon = (props) => {
  return <StarIcon fontSize="inherit" {...props} />; // 아이콘의 크기를 상속합니다
};

const BasicRating = ({ ratingValue, setRatingValue }) => {
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
