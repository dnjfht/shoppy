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

  const renderSlide = (review) => {
    return (
      <div
        key={review.id}
        className={`slide-wrapper ${
          currentSlide === review.id ? "active" : ""
        }`}
      >
        <div className="relative group">
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
      <button onClick={handlePrevSlide} className="btn">
        Prev
      </button>

      <div className="flex overflow-hidden">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => renderSlide(review))
        ) : (
          <div className="slide-wrapper">
            <p>No reviews available.</p>
          </div>
        )}
      </div>

      <button onClick={handleNextSlide} className="btn">
        Next
      </button>
    </div>
  );
}
