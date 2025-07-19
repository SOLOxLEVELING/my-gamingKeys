import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    url: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/12/mechanical-keyboards.jpg",
    alt: "Slide 1",
  },
  {
    url: "https://epomaker.com/cdn/shop/articles/DSC451221_1.jpg?v=1724744824",
    alt: "Slide 2",
  },
  {
    url: "https://i.ytimg.com/vi/JeHjoby-q9U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCTjezNevQu-qhwdDT0OeaFRG1geA",
    alt: "Slide 3",
  },
  {
    url: "https://wallpapers.com/images/hd/gaming-mouse-1600-x-1066-wallpaper-cbhk6f1ajskba4s6.jpg",
    alt: "Slide 4",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval); // Cleanup interval on component unmount
  }, [nextSlide]);

  return (
    <div className="w-full max-w-5xl mx-auto h-[500px] relative group">
      {/* Slides Container */}
      <div className="relative h-full rounded-2xl overflow-hidden">
        <div
          className="w-full h-full flex transition-transform ease-in-out duration-700"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.url}
              alt={slide.alt}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer">
        <ChevronLeft size={30} onClick={prevSlide} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer">
        <ChevronRight size={30} onClick={nextSlide} />
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center gap-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`
              w-3 h-3 rounded-full cursor-pointer transition-all duration-300
              ${
                currentIndex === slideIndex
                  ? "bg-white scale-125"
                  : "bg-white/50"
              }
            `}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
