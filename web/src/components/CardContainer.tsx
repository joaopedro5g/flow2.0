"use client";
import Card from "@/components/Card";
import { Roboto_Condensed } from "next/font/google";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";

const robotoCondensed = Roboto_Condensed({
  weight: "700",
  subsets: ["latin"],
});

interface CardContainerProps {
  data: unknown[];
  title: string | React.ReactNode;
}

export default function CardContainer({ data, title }: CardContainerProps) {
  const [page, setPage] = useState(0);
  const handleNext = () => {
    if (page < data.length - 1) setPage((p) => p + 1);
  };
  const handlePrev = () => {
    if (page > 0) setPage((p) => p - 1);
  };
  return (
    <div className="relative overflow-x-hidden px-2">
      <div className="w-full h-16 flex items-center justify-between">
        <h1
          className="pb-2 text-xl font-bold uppercase"
          style={robotoCondensed.style}
        >
          {title}
        </h1>
        <div className="flex gap-2 text-3xl">
          <MdKeyboardArrowLeft
            className="cursor-pointer"
            onClick={handlePrev}
          />
          <MdKeyboardArrowRight
            className="cursor-pointer"
            onClick={handleNext}
          />
        </div>
      </div>
      <div
        style={{
          width: `calc(${data.length} * 16rem)`,
          marginLeft: `calc(-${page} * 16rem)`,
        }}
        className="h-full flex gap-2 transition-all duration-500 ease-in-out"
      >
        {data.map((_, i) => (
          <Card key={i} />
        ))}
      </div>
    </div>
  );
}
