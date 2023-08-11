import React, { useState } from "react";

export default function ReviewImgSlider({ filteredReviews }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      Math.min(prevSlide + 1, filteredReviews.length - 1)
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const renderSlide = (review) => {
    return (
      <div key={review.id} className="relative">
        <img
          src={review.image}
          alt={`Review ${review.id}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-70 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-sm">{review.content}</p>
          <p className="text-xs">{review.id}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {filteredReviews.length > 0 && (
        <button
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
          className="btn"
        >
          Prev
        </button>
      )}

      <div className="flex overflow-x-scroll snap-type-mandatory slides">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <div
              key={review.id}
              className={`slide-wrapper snap-start ${
                index === currentSlide ? "active" : ""
              }`}
            >
              {renderSlide(review)}
            </div>
          ))
        ) : (
          <div className="slide-wrapper">
            <p>No reviews available.</p>
          </div>
        )}
      </div>

      {filteredReviews.length > 0 && (
        <button
          onClick={handleNextSlide}
          disabled={currentSlide === filteredReviews.length - 1}
          className="btn"
        >
          Next
        </button>
      )}
    </div>
  );
}
