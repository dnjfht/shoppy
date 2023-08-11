import React, { useState } from "react";

export default function ReviewImgSlider({ filteredReviews }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide < filteredReviews.length - 1 ? prevSlide + 1 : prevSlide
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
        <div className="relative w-170 h-170 mr-3 group">
          <img
            src={process.env.PUBLIC_URL + `/../${review.image}`}
            alt={`Review ${review.id}`}
            className="w-full h-full object-cover"
          />
          <div className="w-full absolute bottom-0 left-0 p-4 bg-black bg-opacity-70 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-sm">{review.content}</p>
            <p className="text-xs">{review.id}</p>
          </div>
        </div>
      </div>
    );
  };

  const startIndex = Math.max(currentSlide - 4, 0);
  const endIndex = Math.min(startIndex + 8, filteredReviews.length);

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handlePrevSlide}
        className={`btn ${currentSlide === 0 ? "hidden" : ""}`}
      >
        Prev
      </button>

      <div className="flex overflow-hidden">
        {filteredReviews.length > 0 ? (
          filteredReviews
            .slice(startIndex, endIndex)
            .map((review, index) => renderSlide(review, index + startIndex))
        ) : (
          <div className="slide-wrapper">
            <p>No reviews available.</p>
          </div>
        )}
      </div>

      <button
        onClick={handleNextSlide}
        className={`btn ${
          currentSlide + 1 >= filteredReviews.length ? "hidden" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
}
