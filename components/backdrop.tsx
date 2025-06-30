'use client'

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { backdropImages } from "@/utils/images";

export const Backdrop = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(currentIndex)

    const nextIndex = (currentIndex + 1) % backdropImages.length;

    const [showHeading, setShowHeading] = useState(false)

    const topRightRef = useRef<HTMLDivElement>(null);
    const topLeftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);

    const boxRef = useRef<HTMLDivElement>(null);

    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    //creating a container to wrap the image in it and animate smoothy
    const newImageRef = useRef<HTMLDivElement>(null)

    //avoiding animating first image
    const hasMounted = useRef<boolean>(null)

    const restartProgress = () => {
    timelineRef.current?.kill();

    gsap.set(topRightRef.current, { scaleX: 0 });
    gsap.set(rightRef.current, { scaleY: 0 });
    gsap.set(bottomRef.current, { scaleX: 0 });
    gsap.set(leftRef.current, { scaleY: 0 });
    gsap.set(topLeftRef.current, { scaleX: 0 });

    const tl = gsap.timeline({
        onComplete: () => {
        setPrevIndex(currentIndex);
        setCurrentIndex(nextIndex);
        setShowHeading(true)
        },
    });

    tl.to(topRightRef.current, { scaleX: 1, duration: 2, ease: "none" }) // center → right
        .to(rightRef.current, { scaleY: 1, duration: 2, ease: "none" })     // down
        .to(bottomRef.current, { scaleX: 1, duration: 2, ease: "none" })    // right → left
        .to(leftRef.current, { scaleY: 1, duration: 2, ease: "none" })      // up
        .to(topLeftRef.current, { scaleX: 1, duration: 2, ease: "none" })  // left → center

    timelineRef.current = tl;
    };

    //image display function
    const animateBackdrop = () => {
      if (newImageRef.current) {
        gsap.fromTo(
          newImageRef.current,
          { scaleY: 0, opacity: 0, transformOrigin: "center" },
          { scaleY: 1, opacity: 1, duration: 2, ease: "power2.out" }
        );
      }
    }


    const handleClick = () => {
    setPrevIndex(currentIndex)
    setCurrentIndex(nextIndex)
    animateBackdrop()
    restartProgress()
    setShowHeading(true)
    };

    useGSAP(() => {
      restartProgress()
      if(hasMounted.current) {
        animateBackdrop()
      }
      else {
        hasMounted.current = true
      }
    }, [currentIndex]);

    return (
      <>
        {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">

            {/* Previous Image (static) */}
            <Image
              src={backdropImages[prevIndex].src}
              alt={backdropImages[prevIndex].alt}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover absolute"
              priority
            />

            {/* New Image (animated in) */}
            <div ref={newImageRef} className="absolute inset-0 w-full h-full">
              <Image
                src={backdropImages[currentIndex].src}
                alt={backdropImages[currentIndex].alt}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          </div>

        {/* Heading Section */}
        <article className="absolute inset-0 flex items-center pl-10 md:pl-20 z-10">
          {showHeading && (
          <div className="text-white animate-fade-in">
            <h2 className="text-[0.75rem] mb-2">Welcome to TenTwenty Farms</h2>
            {/* Desktop: 3 words */}
            <h1 className="hidden md:block text-[3rem] w-[22rem] leading-tight">
              <span className="whitespace-nowrap">From Our Farms</span>
              <br />
              <span>To Your Hands</span>
            </h1>
            {/* Mobile: 2 words */}
            <h1 className="block md:hidden text-[2.2rem] w-[13rem] leading-tight">
              <span className="wrap">From Our Farms To Your Hands</span>
            </h1>
          </div>
          )}
        </article>

        {/* Thumbnail with Square Border Animation */}
        <div 
          ref={boxRef}
          onClick={handleClick}
          className="absolute bottom-20 md:left-20 left-10 w-24 h-24 z-20 cursor-pointer group p-3 border border-gray-100/30"
        >
          {/* Thumbnail */}
          <div className="relative w-full h-full z-10 border">
            <Image
              src={backdropImages[nextIndex].src}
              alt="Next thumbnail"
              fill
              sizes="(max-width: 110px) 3vw, 40px"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center text-white bg-black/40 font-medium text-sm">
              Next
            </div>
          </div>

          {/* Animated Border Box */}

              {/* Top-right: center → right */}
          <div
            ref={topRightRef}
            className="absolute top-[-2] left-1/2 w-1/2 h-[4px] bg-white origin-left scale-x-0 z-20"
          />

              {/* Right */}
          <div
            ref={rightRef}
            className="absolute top-0 right-0 w-[4px] h-full bg-white origin-top scale-y-0 z-20"
          />

              {/* Bottom */}
          <div
            ref={bottomRef}
            className="absolute bottom-[-2] right-0 w-full h-[4px] bg-white origin-right scale-x-0 z-20"
          />

              {/* Left */}
          <div
            ref={leftRef}
            className="absolute bottom-0 left-0 w-[4px] h-full bg-white origin-bottom scale-y-0 z-20"
          />

          {/* Top-left: left → center */}
          <div
            ref={topLeftRef}
            className="absolute top-[-2] left-0 w-1/2 h-[4px] bg-white origin-left scale-x-0 z-20"
          />
        </div>

        <span className="absolute bottom-30 left-50 text-white text-sm flex items-center gap-3">
            <h2> {String(currentIndex + 1).padStart(2,'0')} </h2> 
            <hr className="bg-white w-20"/>
            <h2> {String(backdropImages.length).padStart(2,'0')} </h2>
        </span>
      </>
  )}

