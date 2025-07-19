import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// --- Mock Data for Articles ---
const articles = [
  {
    id: 1,
    title: "Building the Perfect Typing Experience: A Deep Dive...",
    description:
      "There is something uniquely satisfying about building your own keyboard. In a time when most gadgets come ready-made and mass-produced, the ability to design a typing experience that is completely tailored to individual needs, from the sound each key makes to the feel of...",
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Keyboard",
    link: "#",
  },
  {
    id: 2,
    title: "Choosing the Right Mouse for Pro-Level Gaming",
    description:
      "In the competitive world of esports, every millisecond counts. Your mouse is your primary weapon, and choosing the right one can make the difference between victory and defeat. We explore the key factors to consider, from sensor technology to ergonomics.",
    imageUrl: "https://placehold.co/400x250/d1d5db/000000?text=Gaming+Mouse",
    link: "#",
  },
  {
    id: 3,
    title: "The Art of the Deskmat: More Than Just a Surface",
    description:
      "A deskmat is the canvas for your workspace. It not only protects your desk but also adds a touch of personality and can significantly improve mouse tracking. Discover the different materials, sizes, and designs that can elevate your setup.",
    imageUrl: "https://placehold.co/400x250/9ca3af/ffffff?text=Deskmat",
    link: "#",
  },
];

const ArticleSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSlideChange = (direction) => {
    // Prevent changing slides if an animation is already in progress
    if (isAnimating) return;

    setIsAnimating(true); // Trigger the "out" animation

    // Wait for the fade-out animation to complete
    setTimeout(() => {
      if (direction === "next") {
        const isLastSlide = currentIndex === articles.length - 1;
        setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
      } else {
        const isFirstSlide = currentIndex === 0;
        setCurrentIndex(isFirstSlide ? articles.length - 1 : currentIndex - 1);
      }
      // Trigger the "in" animation
      setIsAnimating(false);
    }, 300); // This duration should match the transition duration
  };

  const currentArticle = articles[currentIndex];

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white text-black rounded-2xl shadow-2xl p-8 sm:p-12 relative overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-sm font-semibold tracking-widest uppercase text-gray-500">
              BEYOND THE KEYS - EXPLORE MORE!
            </p>
            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold border border-gray-300 rounded-full px-4 py-2 transition-colors hover:bg-gray-100"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Slider Content Wrapper to prevent layout jank */}
          <div className="min-h-[350px] md:min-h-[250px] flex items-center">
            <div
              className={`
                flex w-full flex-col items-center gap-8 transition-all duration-300 ease-in-out md:flex-row md:gap-12
                ${
                  isAnimating
                    ? "opacity-0 translate-y-5"
                    : "opacity-100 translate-y-0"
                }
              `}
            >
              {/* Text Content */}
              <div className="md:w-1/2 text-left">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  {currentArticle.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {currentArticle.description}
                </p>
                <a
                  href={currentArticle.link}
                  className="text-cyan-600 font-bold hover:underline"
                >
                  READ MORE
                </a>
              </div>
              {/* Image */}
              <div className="md:w-1/2">
                <img
                  src={currentArticle.imageUrl}
                  alt={currentArticle.title}
                  className="rounded-lg shadow-lg w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => handleSlideChange("prev")}
              className="p-2 rounded-full border border-gray-300 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-50"
              aria-label="Previous slide"
              disabled={isAnimating}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {articles.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "w-6 bg-black" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => handleSlideChange("next")}
              className="p-2 rounded-full border border-gray-300 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-50"
              aria-label="Next slide"
              disabled={isAnimating}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleSlider;
