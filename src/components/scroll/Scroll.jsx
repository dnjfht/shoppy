import { useEffect, useState } from "react";
import Button from "../button/Button";

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

  return (
    <div className="flex flex-col sm:text-[0.8rem] 3sm:text-[0.675rem] fixed bottom-5 right-5">
      <Button
        value="UP"
        onClick={handleTop}
        styleType="blackBg"
        styles={`${
          showButton ? "opacity-100" : "opacity-0"
        } mt-2 sm:w-16 sm:h-16 3sm:w-12 3sm:h-12 rounded-full drop-shadow-[0_5px_2px_rgba(0,0,0,0.25)] text-white justify-center items-center animate-bounce transition-all duration-700`}
      />
      <Button
        value="DOWN"
        onClick={handleBottom}
        styleType="blackBg"
        styles={`${
          showButton ? "opacity-100" : "opacity-0"
        } mt-2 sm:w-16 sm:h-16 3sm:w-12 3sm:h-12 rounded-full drop-shadow-[0_5px_2px_rgba(0,0,0,0.25)] text-white justify-center items-center animate-bounce transition-all duration-700`}
      />
    </div>
  );
}
