import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const RatingResult = () => {
  return (
    <Box component="fieldset" borderColor="transparent">
      <Rating name="read-only" value={value} readOnly />
    </Box>
  );
};

export default RatingResult;
