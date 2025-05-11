"use client";
import Link from "next/link";
import React from "react";

const ScrollToTopLink = ({ href, children, ...props }: React.ComponentProps<typeof Link>) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let Next.js handle the navigation, then scroll to top
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default ScrollToTopLink;