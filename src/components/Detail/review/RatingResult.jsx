import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const RatingResult = ({ averageRatingResult }) => {
  return (
    <Box component="fieldset" borderColor="transparent">
      <Rating
        name="read-only"
        value={averageRatingResult}
        readOnly
        IconContainerComponent={({ value, ...props }) => (
          <span style={{ fontSize: 40 }} {...props} />
        )}
      />
    </Box>
  );
};

export default RatingResult;
