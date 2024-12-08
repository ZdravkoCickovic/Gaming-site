import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

import { ScrollTrigger } from "gsap/all";
import AnimatedText from "./AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          The Brewer’s Journey
        </h2>

        <AnimatedText
          title="European Beers: </br> A World of Flavors"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>
            Beer has been cherished for thousands of years. Explore how this
            golden beverage shaped cultures and brought people together.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
