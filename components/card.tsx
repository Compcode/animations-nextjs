"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Carousel } from "./carousel";

gsap.registerPlugin(ScrollTrigger);

export const CardSlider = () => {

  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const heading = headingRef.current;
    const para = paraRef.current;

    if (!heading || !para) return;

    // Reset any previous span-wrapping
    heading.innerHTML = heading.textContent
      ?.split("")
      .map(char =>
        `<span class="inline-block opacity-0 translate-y-2">${char === " " ? "&nbsp;" : char}</span>`
      )
      .join("") || "";

    para.innerHTML = para.textContent?.split(" ").map(word =>
        `<span class="inline-block opacity-0 translate-y-2 mr-1">${word}</span>`
      ).join(" ") || "";

    const headingSpans = heading.querySelectorAll("span");
    const paraSpans = para.querySelectorAll("span");

    ScrollTrigger.create({
      trigger: heading,
      start: "top 80%",
      onEnter: () => {
        // Animate heading in
        gsap.to(headingSpans, {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.6,
          ease: "power2.out",
        });

        // Animate para after 1s delay
        gsap.to(paraSpans, {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 0.5,
          ease: "power2.out",
          delay: 1,
        });
      },
      onLeaveBack: () => {
        gsap.set(headingSpans, { opacity: 0, y: 2 });
        gsap.set(paraSpans, { opacity: 0, y: 2 });
      },
      once: false,
    });
  });

  return (
    <section className="relative text-xl w-full overflow-hidden py-20 flex flex-col items-center">
      <h1 className="text-4xl mb-10 font-semibold" ref={headingRef}>
        Quality Products
      </h1>

      <p ref={paraRef} className="flex flex-wrap justify-center mx-auto max-w-[600px] my-5"> 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt illo cumque, officiis laboriosam id quas excepturi. 
        Natus molestias laudantium magnam maiores cum neque voluptatem dicta recusandae, consequatur quo quos officiis 
        reprehenderit. 
      </p>

      <Carousel />

      
    </section>
  );
};
