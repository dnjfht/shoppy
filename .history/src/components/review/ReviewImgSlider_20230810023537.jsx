import React, { useState } from "react";

export default function ReviewImgSlider({ filteredReviews }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      Math.min(prevSlide + 1, Math.ceil(filteredReviews.length / 8) - 1)
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
          className="w-[170px] h-[170] object-cover"
        />
        <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-70 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-sm">{review.content}</p>
          <p className="text-xs">{review.id}</p>
        </div>
      </div>
    );
  };

  const slidesPerPage = 8;
  const startIdx = currentSlide * slidesPerPage;
  const visibleReviews = filteredReviews.slice(
    startIdx,
    startIdx + slidesPerPage
  );

  return (
    <div className="flex items-center justify-center h-screen">
      {currentSlide > 0 && (
        <button onClick={handlePrevSlide} className="btn">
          Prev
        </button>
      )}

      <div className="flex overflow-x-scroll snap-type-mandatory slides">
        {visibleReviews.length > 0 ? (
          visibleReviews.map((review) => (
            <div key={review.id} className={`slide-wrapper snap-start`}>
              {renderSlide(review)}
            </div>
          ))
        ) : (
          <div className="slide-wrapper">
            <p>No reviews available.</p>
          </div>
        )}
      </div>

      {currentSlide < Math.ceil(filteredReviews.length / slidesPerPage) - 1 && (
        <button onClick={handleNextSlide} className="btn">
          Next
        </button>
      )}
    </div>
  );
}
