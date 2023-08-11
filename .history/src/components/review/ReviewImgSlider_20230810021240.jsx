import React, { useState } from "react";
import "./App.css"; // 스타일링은 필요에 따라 수정하세요.

const reviewsData = [
  {
    id: 1,
    image: "image1.jpg",
    author: "Author 1",
    content: "Review content 1",
  },
  // ... 다른 리뷰 데이터
];

export default function ReviewImgSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      Math.min(prevSlide + 1, reviewsData.length - 1)
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const renderSlide = (review) => {
    return (
      <div key={review.id} className="slide">
        <img src={review.image} alt={`Review ${review.id}`} />
        <div className="slide-overlay">
          <p>{review.content}</p>
          <p>{review.author}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="slider-container">
      {reviewsData.length > 0 && (
        <button onClick={handlePrevSlide} disabled={currentSlide === 0}>
          Prev
        </button>
      )}

      <div className="slides">
        {reviewsData.length > 0 ? (
          reviewsData.map((review, index) => (
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

      {reviewsData.length > 0 && (
        <button
          onClick={handleNextSlide}
          disabled={currentSlide === reviewsData.length - 1}
        >
          Next
        </button>
      )}
    </div>
  );
}
