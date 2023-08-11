import React, { useState } from "react";

export default function ReviewImgSlider({ filteredReviews }) {
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
        className={`slide-wrapper transform transition-transform duration-300 ease-in-out ${
          index === currentSlide ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "160px" }} // 너비 고정 삭제
      >
        <div className="relative h-160 mr-3">
          <img
            src={process.env.PUBLIC_URL + `/../${review.image}`}
            alt={`Review ${review.id}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-70 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-sm">{review.content}</p>
            <p className="text-xs">{review.id}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handlePrevSlide}
        className={`btn ${currentSlide === 0 ? "hidden" : ""}`}
      >
        Prev
      </button>

      <div className="flex overflow-hidden flex-wrap">
        {" "}
        {/* flex-wrap 추가 */}
        {filteredReviews.length > 0 ? (
          filteredReviews
            .slice(currentSlide, currentSlide + 8)
            .map((review, index) => renderSlide(review, index + currentSlide))
        ) : (
          <div className="slide-wrapper">
            <p>No reviews available.</p>
          </div>
        )}
      </div>

      <button
        onClick={handleNextSlide}
        className={`btn ${
          currentSlide + 8 >= filteredReviews.length ? "hidden" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
}
