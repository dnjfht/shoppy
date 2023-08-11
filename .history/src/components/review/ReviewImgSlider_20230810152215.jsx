import React, { useState } from "react";
import RatingResult2 from "./RatingResult2";

export default function ReviewImgSlider({ filteredReviews, user }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide < filteredReviews.length - 8 ? prevSlide + 1 : prevSlide
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : prevSlide));
  };

  const renderSlide = (review, index) => {
    return (
      <div
        key={review.id}
        className={`slide-wrapper ${index === currentSlide ? "active" : ""}`}
      >
        <div className="relative w-[160px] mr-3 group">
          <img
            src={process.env.PUBLIC_URL + `/../${review.image}`}
            alt={`Review ${review.id}`}
            className="w-full h-[160px] object-cover rounded-lg"
          />
          <div className="w-full h-full p-4 box-border rounded-lg absolute bottom-0 left-0 bg-black bg-opacity-70 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col items-center justify-center">
            <p className="mb-1 [0.8125rem]">
              {user
                ? review.userId
                : review.phoneNumber.substring(0, 7) + "****"}
            </p>
            <div className="mb-2">
              <RatingResult2 ratingValue={review.ratingValue} />
            </div>
            <p className="text-[0.8125rem]">{`색상 : ${review.reviewColorSatisfaction}`}</p>
            <p className="text-[0.8125rem]">{`사이즈 : ${review.reviewSizeSatisfaction}`}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center">
        <button
          onClick={handlePrevSlide}
          className={`btn ${currentSlide === 0 ? "text-[#a4a4a4]" : ""}`}
        >
          Prev
        </button>
        <button
          onClick={handleNextSlide}
          className={`btn ${
            currentSlide + 8 >= filteredReviews.length ? "text-[#a4a4a4]" : ""
          } ml-2`}
        >
          Next
        </button>
      </div>

      <div className="flex overflow-hidden">
        {filteredReviews.length > 0 ? (
          filteredReviews
            .slice(currentSlide, currentSlide + 8)
            .map((review, index) => renderSlide(review, index + currentSlide))
        ) : (
          <div className="w-full h-[160px] flex items-center">
            <p>No reviews available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
