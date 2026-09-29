"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main > section:not(:first-of-type), main > footer");
    sections.forEach((section) => {
      section.classList.add("reveal-section");
      section.querySelectorAll<HTMLElement>("h2, article, form").forEach((item, index) => {
        item.classList.add("reveal-item");
        item.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 70}ms`);
      });
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          entry.target.querySelectorAll(".reveal-item").forEach((item) => item.classList.add("reveal-item-visible"));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6%" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return null;
}
