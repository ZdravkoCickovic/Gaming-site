import React, { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Icons for mobile menu toggle
import Button from "./Button";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { CgLoadbarSound } from "react-icons/cg";

const navItems = ["Home", "About", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [showPopup, setShowPopup] = useState(true); // State for popup visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  const handlePopupChoice = (playMusic) => {
    setShowPopup(false); // Close the popup
    if (playMusic) {
      setIsAudioPlaying(true);
      setIsIndicatorActive(true);
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <>
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-50 rounded-lg p-6 w-80 md:w-70 text-center">
            <p className="mb-4 font-circular-web text-sm">
              If you want to experience a better vision of our site, choose to
              play or not.
              <br />
              If not there are{" "}
              <span className="inline-block items-center justify-center">
                <CgLoadbarSound className="inline-block text-xl mb-1" />
              </span>{" "}
              up
            </p>
            <button
              className="bg-yellow-400 text-black text-sm px-4 py-2 rounded-lg mr-4 font-circular-web"
              onClick={() => handlePopupChoice(true)}
            >
              Play Music
            </button>
            <button
              className="bg-black text-sm text-white px-4 py-2 rounded-lg font-circular-web"
              onClick={() => handlePopupChoice(false)}
            >
              No, Thanks
            </button>
          </div>
        </div>
      )}

      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            <div className="flex items-center gap-7">
              <img src="/img/logo.png" alt="Logo" className="w-12" />

              <Button
                id="product-button"
                title="Products"
                rightIcon={TiLocationArrow}
                containerClass="bg-blue-50 hidden md:flex items-center justify-center gap-1"
              />
            </div>

            <div className="flex h-full items-center">
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                {navItems.map((item) => (
                  <a
                    href={`#${item.toLowerCase()}`}
                    key={item}
                    className="nav-hover-btn"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Mobile Navigation Toggle */}
              <div className="md:hidden flex items-center">
                <button onClick={toggleMobileMenu} className="text-2xl">
                  {isMobileMenuOpen ? (
                    <HiX className="text-white" />
                  ) : (
                    <HiMenuAlt3 className="text-white" />
                  )}
                </button>
              </div>

              {/* Audio Indicator */}
              <button
                className="ml-10 flex items-center space-x-0.5"
                onClick={toggleAudioIndicator}
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.wav"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`indicator-line ${
                      isIndicatorActive ? "active" : " "
                    } `}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
              <ul className="flex flex-col items-center p-6 space-y-6">
                {navItems.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-800 hover:text-orange-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>
      </div>
    </>
  );
};

export default Navbar;
