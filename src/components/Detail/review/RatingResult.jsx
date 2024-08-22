import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

const RatingResult = ({ averageRatingResult }) => {
  // 미디어 쿼리 정의
  const isSmallScreen = useMediaQuery((theme) =>
    theme?.breakpoints?.down("sm")
  );
  const isMediumScreen = useMediaQuery((theme) =>
    theme?.breakpoints?.between("sm", "md")
  );

  // fontSize 설정
  let fontSize;
  if (isSmallScreen) {
    fontSize = 20;
  } else if (isMediumScreen) {
    fontSize = 30;
  } else {
    fontSize = 40;
  }

  return (
    <Box component="fieldset" borderColor="transparent">
      <Rating
        name="read-only"
        value={averageRatingResult}
        readOnly
        IconContainerComponent={({ value, ...props }) => (
          <span style={{ fontSize }} {...props} />
        )}
      />
    </Box>
  );
};

export default RatingResult;
