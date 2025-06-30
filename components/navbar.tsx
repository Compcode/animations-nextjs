'use client'
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link"
import { useEffect, useRef, useState } from "react";

const navLinks = [
    {href : '/about', label: 'About'},
    {href : '/news', label: 'News'},
    {href : '/services', label: 'Services'},
    {href : '/our-team', label: 'Our Team'},
    {href : '/make-enq', label: 'Make Enquiry'},    
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 767 && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener('resize', handleResize);
    }
  }, [isOpen]);

  return (
    <>
      <nav className="h-18  mx-0 md:mx-4 md:my-5 bg-white backdrop-blur-sm px-4 py-4 shadow-md flex items-center justify-between">


        {/* Mobile: Contact Left */}
        <div className="md:hidden">
          <Link
            href="/contact"
            className="border px-3 py-1 text-sm  border-black"
          >
            Contact us →
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 text-md">
          {navLinks.map((link) => (
            <li key={link.href} className="hover:underline hover:text-[#0781CD] hover:font-bold">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        {/* Desktop: Contact Right */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="border px-3 py-1 text-md border-black"
          >
            Contact us →
          </Link>
        </div>

        {/* Mobile: Hamburger Icon Right */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? (
              <XMarkIcon className="w-6 h-6 " />
            ) : (
              <Bars3Icon className="w-8 h-8 border border-gray-400 bg-gray-100/30 py-2 px-1" />
            )}
          </button>
        </div>
        
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="fixed top-15 right-0 w-full max-ws-xs bg-white shadow-lg z-40 p-4 rounded-bl-md transition-transform animate-slide-in"
        >
          <ul className="space-y-4 text-sm">
            {navLinks.map((link) => (
              <li key={link.href} className="hover:underline hover:text-[#0781CD] hover:font-bold">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
