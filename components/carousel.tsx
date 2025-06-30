'use client';

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cardImages } from "@/utils/card-images";

gsap.registerPlugin(Draggable, ScrollTrigger);

export const Carousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const cardWidth = 300;
  const spacing = 100;
  const totalCards = cardImages.length;

  const current = cardImages[activeIndex];

  const updateCards = (index: number) => {
    const cards = gsap.utils.toArray<HTMLElement>(".carousel-card");

    cards.forEach((card, i) => {
      const offset = (i - index + totalCards) % totalCards;
      const isCenter = offset === 0;
      const isLeft = offset === totalCards - 1;
      const isRight = offset === 1;

      const x = (i - index) * (cardWidth + spacing);
      const rotate = isLeft ? -15 : isRight ? 15 : 0;
      const scale = isCenter ? 1 : 0.9;
      const opacity = isCenter || isLeft || isRight ? 1 : 0;

      gsap.to(card, {
        x,
        rotateZ: rotate,
        scale,
        opacity,
        zIndex: isCenter ? 10 : 5,
        duration: 0.5,
        ease: "power3.out",
      });
    });
  };

  const handleDragEnd = (deltaX: number) => {
    const threshold = cardWidth / 3;
    if (deltaX > threshold) {
      setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
    } else if (deltaX < -threshold) {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }
  };

  // Drag functionality
  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    updateCards(activeIndex);

    let startX = 0;
    let endX = 0;

    const drag = Draggable.create(track, {
      type: "x",
      edgeResistance: 0.9,
      inertia: true,
      onPress() {
        startX = this.x;
      },
      onDragEnd() {
        endX = this.x;
        handleDragEnd(endX - startX);
      },
    });

    return () => drag[0]?.kill();
  }, { dependencies: [activeIndex] });

  // Title and location animation
  useGSAP(() => {
    const title = titleRef.current;
    const location = locationRef.current;
    if (!title || !location) return;

    title.innerHTML = current.alt
      .split("")
      .map(char => `<span class="inline-block opacity-0 translate-y-2">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    location.innerHTML = current.location
      .split("")
      .map(char => `<span class="inline-block opacity-0 translate-y-2">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    const titleSpans = title.querySelectorAll("span");
    const locationSpans = location.querySelectorAll("span");

    ScrollTrigger.create({
      trigger: title,
      start: "top 80%",
      onEnter: () => {
        gsap.to(titleSpans, {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.to(locationSpans, {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.6,
        });
      },
      onLeaveBack: () => {
        gsap.set(titleSpans, { opacity: 0, y: 2 });
        gsap.set(locationSpans, { opacity: 0, y: 2 });
      },
      once: false,
    });
  }, { dependencies: [activeIndex] });

  // Custom cursor follow
  useGSAP(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 24,
          y: e.clientY - 24,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="relative w-[50em] h-[30em] flex justify-center items-center overflow-hidden pb-15">
      {/* Track */}
      <div
        ref={trackRef}
        className="relative w-full h-100 flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {cardImages.map((img) => (
          <div key={img.id} className="carousel-card absolute w-[300px] h-[450px] pointer-events-none">
            <Image
              src={img.src}
              alt={img.alt}
              width={300}
              height={450}
              className="w-full h-full object-cover shadow-md"
            />
          </div>
        ))}
      </div>

      {/* Animated Text Overlay */}
      <div className="absolute bottom-2 text-center mt-4">
        <h2 ref={titleRef} className="text-2xl font-bold text-black" />
        <p ref={locationRef} className="text-md text-black/80 mt-2" />
      </div>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none flex items-center justify-between text-white font-bold text-lg px-2 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          mixBlendMode: "difference",
          zIndex: 50,
          backgroundColor: "transparent",
          border: "2px solid white",
        }}
      >
        <span>{'<'}</span>
        <span>{'>'}</span>
      </div>
    </div>
  );
};
