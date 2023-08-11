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
      <div key={review.id} className="slide">
        <img
          src={process.env.PUBLIC_URL + `/../${review.image}`}
          alt={`Review ${review.id}`}
        />
        <div className="slide-overlay">
          <p>{review.content}</p>
          <p>{review.author}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="slider-container">
      {filteredReviews.length > 0 && (
        <button onClick={handlePrevSlide} disabled={currentSlide === 0}>
          Prev
        </button>
      )}

      <div className="slides">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <div
              key={review.id}
              className={`slide-wrapper ${
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
        >
          Next
        </button>
      )}
    </div>
  );
}
