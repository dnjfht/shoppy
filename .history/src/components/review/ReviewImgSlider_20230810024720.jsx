import React, { useState } from "react";

export default function ReviewImgSlider({ filteredReviews }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      Math.min(prevSlide + 1, Math.floor((filteredReviews.length - 1) / 8))
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const renderSlide = (review) => {
    return (
      <div key={review.id} className="relative">
        <img
          src={process.env.PUBLIC_URL + `/../${review.image}`}
          alt={`Review ${review.id}`}
          className="w-[170px] h-[170px] object-top"
        />
        <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-70 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-sm">{review.content}</p>
          <p className="text-xs">{review.id}</p>
        </div>
      </div>
    );
  };

  const startIndex = currentSlide * 8;
  const endIndex = Math.min(startIndex + 8, filteredReviews.length);
  const visibleReviews = filteredReviews.slice(startIndex, endIndex);

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handlePrevSlide}
        disabled={currentSlide === 0}
        className="btn"
      >
        Prev
      </button>

      <div className="flex overflow-hidden">
        {filteredReviews.length > 0 ? (
          <div className="flex transition-transform ease-in-out duration-300 transform -translate-x-full translate-x-0">
            {visibleReviews.map((review, index) => (
              <div
                key={review.id}
                className={`slide-wrapper ${
                  index === currentSlide ? "active" : ""
                }`}
              >
                {renderSlide(review)}
              </div>
            ))}
          </div>
        ) : (
          <div className="slide-wrapper">
            <p>No reviews available.</p>
          </div>
        )}
      </div>

      <button
        onClick={handleNextSlide}
        disabled={currentSlide >= Math.floor((filteredReviews.length - 1) / 8)}
        className="btn"
      >
        Next
      </button>
    </div>
  );
}
