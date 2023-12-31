import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const RatingResult2 = ({ ratingValue }) => {
  return (
    <Box component="fieldset" borderColor="transparent">
      <Rating
        name="read-only"
        value={ratingValue}
        readOnly
        IconContainerComponent={({ value, ...props }) => (
          <span style={{ fontSize: 20 }} {...props} />
        )}
      />
    </Box>
  );
};

export default RatingResult2;
