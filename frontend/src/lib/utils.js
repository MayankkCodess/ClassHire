import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

// cn() = smart className builder for Tailwind + React
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// ###clsx - // Handles conditional class joining

// Example:
// clsx("p-2", isActive && "bg-blue-500", "text-white")

// ✔ Output:
// "p-2 bg-blue-500 text-white"



// twMerge- Solves Tailwind conflicts

// Example: twMerge("bg-red-500", "bg-blue-500")

// ✔ Output: "bg-blue-500"
// It keeps only the last valid Tailwind class



// Real-world usage (VERY IMPORTANT)

// import { cn } from "@/lib/utils";

// <button
//   className={cn(
//     "px-4 py-2 rounded",
//     isActive ? "bg-blue-500" : "bg-gray-500",
//     disabled && "opacity-50 cursor-not-allowed"
//   )}
// >
//   Click Me
// </button>