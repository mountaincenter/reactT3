import React from "react";

interface TextAtomProps {
  children: React.ReactNode;
  size: "small" | "medium" | "large";
  className?: string;
}

const TextAtom = ({ children, size, className, ...props }: TextAtomProps) => (
  <p
    className={`text-center font-bold text-black dark:text-white ${
      size === "small"
        ? "text-xl sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl"
        : size === "medium"
          ? "text-3xl sm:text-4xl md:text-5xl lg:text-8xl xl:text-8xl"
          : "text-5xl sm:text-8xl md:text-8xl lg:text-10xl xl:text-10xl"
    } ${className}`}
    {...props}
  >
    {children}
  </p>
);

export default TextAtom;
