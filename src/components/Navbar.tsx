"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <Image
            src="/images/logo.png"
            alt={siteConfig.name}
            width={140}
            height={40}
            className="h-8 w-auto sm:h-10"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-brand-blue/10 hover:text-brand-blue-dark"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/trial-training"
              className="ml-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Book Trial
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <ul className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-brand-blue/10 hover:text-brand-blue-dark"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/trial-training"
                className="block rounded-lg bg-brand-blue px-4 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
                onClick={() => setIsOpen(false)}
              >
                Book Trial
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
