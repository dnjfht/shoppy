// 가격 뒤에 원 붙이기 + 세 자리마다 쉼표 추가하기
export const attach_won = (prc) => {
  // 숫자를 문자열로 변환하여 쉼표를 적용
  const commaPrice = prc?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // 문자열을 문자열의 길이만큼 잘라낸 후 원 붙이기
  const attachWon = `${commaPrice?.slice(0, commaPrice.length)}원`;
  return attachWon;
};

export const shortString = (str, num) => {
  if (str?.length > num) {
    return `${str?.slice(0, num - 1)} ...`;
  }
  return str;
};

export const salePercent = (price, salePrice) => {
  const percent = parseInt(price / (price - salePrice));
  return percent + "%";
};
