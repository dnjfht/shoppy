import RatingResult2 from "./RatingResult2";

import { GoX } from "react-icons/go";

export default function DetailReviewModal({
  user,
  onClose,
  reviewDetailModalOpen,
  datas,
  reviewEdit,
  handleEditReviewSuccess,
  changeText,
  setChangeText,
  handleClickBenefitBtn,
  handleEditReview,
  handleDeleteReview,
}) {
  return (
    <div
      className={`${
        reviewDetailModalOpen ? "block" : "hidden"
      } w-[100vw] h-[100vh] bg-black bg-opacity-60 fixed top-0 left-0 z-[999999999] flex justify-center items-center`}
    >
      <div className="w-[40%] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="box-border flex items-center w-full p-4">
          <button className="mr-20 text-[1.6rem]" onClick={onClose}>
            <GoX />
          </button>
        </div>

        {datas?.map((review) => {
          return (
            <div className="flex w-full px-4 pb-4">
              <div className="w-1/2">
                <img
                  className="object-cover w-full rounded-lg"
                  src={process.env.PUBLIC_URL + `/../${review.image}`}
                  alt="detail_review_img"
                />
              </div>

              <div className="box-border w-1/2 px-5">
                <div className="w-full pb-4 pl-5 box-border flex items-center border-b-[1px] shadow-lg">
                  <img
                    className="w-[65px] h-[65px] object-cover rounded-lg"
                    src={process.env.PUBLIC_URL + `/../${review.image}`}
                    alt="detail_review_img"
                  />
                  <div className="ml-4">
                    <div className="flex items-center">
                      <RatingResult2 ratingValue={review.ratingValue} />
                      <p className="ml-1 mt-[-5px]">{review.ratingValue}</p>
                    </div>

                    <p className="text-[0.75rem] text-[#888]">
                      {!review.phoneNumber
                        ? review.profileDisplayName
                        : review.phoneNumber.slice(0, 7) + "***"}
                    </p>
                  </div>
                </div>

                <div className="w-full py-5 text-[0.8125rem]">
                  <div className="w-full p-3 box-border text-[#898989] border-[1px] border-dotted border-[#dcdcdc] rounded-lg">
                    <p className="mb-2">{`선택한 옵션 : ${review.reviewColor} / ${review.reviewSize}`}</p>
                    <p className="mb-2">{`키 : ${review.reviewHeight}cm | 몸무게 : ${review.reviewWeight}kg | 평소 사이즈 : ${review.reviewBodySize}size | 발사이즈 : ${review.reviewBodyFoot}mm`}</p>
                    <p className="text-[#ff827e]">{`색상 : ${review.reviewColorSatisfaction} | 사이즈 : ${review.reviewSizeSatisfaction}`}</p>
                  </div>

                  {reviewEdit.id !== review.id && (
                    <p className="mt-3 text-[0.75rem] text-[#222]">
                      {review.content}
                    </p>
                  )}

                  {reviewEdit.id === review.id && (
                    <form
                      className="flex"
                      onSubmit={(e) =>
                        handleEditReviewSuccess(e, review.detailUserId)
                      }
                    >
                      <input
                        defaultValue={changeText}
                        onChange={(e) => {
                          e.preventDefault();
                          setChangeText(e.target.value);
                        }}
                        className="w-3/4 mt-5 p-2 box-border border-[1px] border-solid border-[#afafaf] rounded-lg outline-none text-[0.875rem] placeholder:text-[0.875rem]"
                        type="text"
                        placeholder="수정할 내용을 입력하세요."
                      />
                      <button
                        type="submit"
                        className="w-[120px] ml-2 mt-5  bg-[#282828] text-white rounded-lg"
                      >
                        수정 완료
                      </button>
                    </form>
                  )}

                  <div className="flex items-center justify-between mt-10">
                    <p className="text-[0.8125rem] text-[#8D8B8B]">
                      <span className="text-[0.875rem] text-[#000] font-semibold">{`${review?.count?.reduce(
                        (sum, benifit) => {
                          return sum + benifit.count;
                        },
                        0
                      )}명`}</span>
                      에게 도움이 되었습니다.
                    </p>

                    <button
                      onClick={(e) =>
                        handleClickBenefitBtn(e, review.detailUserId)
                      }
                      className={`${
                        review?.count?.find((c) =>
                          c?.userId?.includes(user?.uid)
                        )?.count === 1
                          ? "bg-opacity-100 text-[#ffffff]"
                          : "bg-opacity-0 text-[#ff4273]"
                      } w-[100px] h-[30px] ml-2 border-[1px] border-solid border-[#ff4273] bg-[#ff4273] text-[0.8125rem] flex justify-center items-center transition-all duration-700`}
                    >
                      도움이 돼요
                    </button>
                  </div>

                  <div className="flex items-center mt-14">
                    {user && user.uid === review.userId && (
                      <>
                        {reviewEdit.id !== review.id && (
                          <button
                            onClick={(e) =>
                              handleEditReview(e, review.password, review.id)
                            }
                            className={`${
                              reviewEdit.id == review.id ? "mr-none" : "mr-2"
                            } w-[120px] h-[40px] bg-[#000000] text-white border-[1px] border-solid border-[#000000] text-[0.8125rem] rounded-lg hover:text-[#000000] hover:bg-opacity-0 transition-all duration-700 flex justify-center items-center`}
                          >
                            수정하기
                          </button>
                        )}

                        <button
                          onClick={(e) =>
                            handleDeleteReview(
                              e,
                              review?.password,
                              review?.detailUserId
                            )
                          }
                          className="w-[120px] h-[40px] bg-[#000000] text-white border-[1px] border-solid border-[#000000] text-[0.8125rem] rounded-lg hover:text-[#000000] hover:bg-opacity-0 transition-all duration-700 flex justify-center items-center"
                        >
                          삭제하기
                        </button>
                      </>
                    )}

                    <div className={`${user === null ? "block" : "hidden"}`}>
                      {reviewEdit.id !== review.id && (
                        <button
                          onClick={(e) =>
                            handleEditReview(e, review.password, review.id)
                          }
                          className="w-[120px] h-[40px] bg-[#000000] text-white border-[1px] border-solid border-[#000000] text-[0.8125rem] rounded-lg hover:text-[#000000] hover:bg-opacity-0 transition-all duration-700 flex justify-center items-center"
                        >
                          수정하기
                        </button>
                      )}

                      <button
                        onClick={(e) =>
                          handleDeleteReview(
                            e,
                            review?.password,
                            review?.detailUserId
                          )
                        }
                        className={`${
                          reviewEdit.id === review.id ? "ml-none" : "ml-2"
                        } w-[120px] h-[40px]  bg-[#000000] text-white border-[1px] border-solid border-[#000000] text-[0.8125rem] rounded-lg hover:text-[#000000] hover:bg-opacity-0 transition-all duration-700 flex justify-center items-center`}
                      >
                        삭제하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
