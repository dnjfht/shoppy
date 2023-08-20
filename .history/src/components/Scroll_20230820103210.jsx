import React, { useEffect, useState } from "react";

export default function Scroll({ contentRef }) {
  const [scrollY, setScrollY] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
  };

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0);
    setShowButton(false);
  };

  const handleBottom = () => {
    contentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    setScrollY(scrollY);
    setShowButton(true);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };

    watch();

    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  }, []);

  useEffect(() => {
    const handleShowButton = () => {
      window.scrollY > 100 ? setShowButton(true) : setShowButton(false);
    };

    window.addEventListener("scroll", handleShowButton);

    return () => window.removeEventListener("scroll", handleShowButton);
  }, []);

  console.log(scrollY);

  return (
    <div className="flex flex-col text-[0.8rem] fixed bottom-5 right-5">
      <button
        onClick={handleTop}
        className="w-16 h-16 bg-slate-900 rounded-full drop-shadow-[0_5px_2px_rgba(0,0,0,0.25)] text-white justify-center items-center animate-bounce"
      >
        <p>UP</p>
      </button>
      <button
        onClick={handleBottom}
        className="w-16 h-16 mt-2 bg-slate-900 rounded-full drop-shadow-[0_5px_2px_rgba(0,0,0,0.25)] text-white flex justify-center items-center animate-bounce"
      >
        <p>DOWN</p>
      </button>
    </div>
  );
}
