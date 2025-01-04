"use client";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

interface CustomScrollbarProps {
  children: React.ReactNode;
  variant?: "default" | "rounded" | "minimal"; // Different visual variants
  thumbColor?: string; // Custom thumb color
  trackWidth?: string; // Custom track width
  trackHoverWidth?: "hover:w-2" | "hover:w-3" | "hover:w-4"; // Custom track hover width
  trackWidthOnScroll?: "w-2" | "w-3" | "w-4"; // Custom track width on scroll
  thumbHeightPercentage?: number; // Custom thumb height in percentage
  padding?: string; // Custom padding
  className?: string; // Custom class name for styling
}

const CustomScrollbar = ({
  children,
  variant = "default", // Default variant is "default"
  thumbColor = "bg-gray-600", // Default thumb color
  trackWidth = "w-1", // Default track width
  trackHoverWidth = "hover:w-2", // Default track hover width
  trackWidthOnScroll = "w-2", // Default track width on scroll
  thumbHeightPercentage = 20, // Default thumb height percentage
  padding = "", // Default padding
  className = "", // Additional class name for customization
}: CustomScrollbarProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollbarThumbRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(thumbHeightPercentage);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [showScrollbar, setShowScrollbar] = useState(false);

  const handleScroll = () => {
    if (!contentRef.current || !scrollbarThumbRef.current) return;

    const content = contentRef.current;
    const thumb = scrollbarThumbRef.current;

    const scrollPercentage = content.scrollTop / content.scrollHeight;
    const thumbTop = scrollPercentage * content.clientHeight;

    thumb.style.top = `${thumbTop}px`;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartY(e.clientY);
    if (contentRef.current) {
      setStartScrollTop(contentRef.current.scrollTop);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !contentRef.current) return;

    const deltaY = e.clientY - startY;
    const scrollPercentage =
      (deltaY / contentRef.current.clientHeight) *
      contentRef.current.scrollHeight;

    contentRef.current.scrollTop = startScrollTop + scrollPercentage;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Recalculate thumb height based on content size
  const updateThumbHeight = () => {
    if (!contentRef.current) return;

    const content = contentRef.current;
    const thumbHeight =
      (content.clientHeight / content.scrollHeight) * content.clientHeight;

    // Show/Hidden the scrollbar
    setShowScrollbar(thumbHeight !== content.scrollHeight);

    setThumbHeight(thumbHeight);
  };

  const handleOnScroll = () => {
    // Clear the existing timeout to reset it
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Set a new timeout to detect when the scroll stops
    setScrollTimeout(
      setTimeout(() => {
        setIsScrolling(false); // This means scrolling has stopped
      }, 150), // Adjust the timeout duration (in ms) based on when you want to detect the stop
    );

    // Set the isScrolling state to true when scrolling starts
    setIsScrolling(true);
  };

  useEffect(() => {
    const content = contentRef.current;

    content?.addEventListener("scroll", handleScroll);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", updateThumbHeight);

    // Initial calculation
    updateThumbHeight();

    return () => {
      content?.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", updateThumbHeight);
    };
  }, [isDragging, handleMouseMove]);

  useEffect(() => {
    const content = contentRef.current;
    // Add scroll event listener
    content?.addEventListener("scroll", handleOnScroll);

    // Cleanup the event listener on component unmount
    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      content?.removeEventListener("scroll", handleOnScroll);
    };
  }, [scrollTimeout, handleOnScroll]);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={contentRef}
        onScroll={handleOnScroll}
        className={`customSidebar relative h-full select-none overflow-y-auto ${padding}`}
      >
        {children}
      </div>

      {/* Custom Scrollbar */}
      <div
        className={cn(
          "absolute right-0 top-0 h-full transition-all duration-300",
          trackHoverWidth,
          trackWidth,
          isScrolling && trackWidthOnScroll, // Adjust the width when scrolling
        )}
      >
        {showScrollbar && (
          <div
            ref={scrollbarThumbRef}
            className={cn(
              "w-full cursor-pointer rounded",
              variant === "rounded" && "rounded-full",
              thumbColor,
            )}
            style={{
              position: "absolute",
              height: `${thumbHeight}px`, // Dynamic height in pixels
              top: 0,
            }}
            onMouseDown={handleMouseDown}
          />
        )}
      </div>
    </div>
  );
};

export default CustomScrollbar;
