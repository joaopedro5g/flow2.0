/* eslint-disable @typescript-eslint/no-unsafe-function-type */
"use client";

import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";
import { IoPlaySkipForward, IoPlaySkipBackSharp } from "react-icons/io5";
import ButtonPlayPausePlayer from "./ButtonPlayPausePlayer";
import { usePlayer } from "@/core/Context";

const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export default function Player() {
  const { currentTime } = usePlayer();
  const animate = useAnimation();
  const mouseInside = useRef(false);
  const debouncedHide = useRef(
    debounce(async () => {
      if (!mouseInside.current) {
        await animate.start({ y: -65 });
      }
    }, 500)
  ).current;

  const onHoverLeave = () => {
    mouseInside.current = false;
    debouncedHide();
  };

  const onHoverEnter = () => {
    mouseInside.current = true;
    animate.start({ y: 0 });
  };

  return (
    <motion.div
      animate={animate}
      initial={{ y: -65 }}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      className="w-full h-20 bg-gray-200 shadow-md shadow-slate-400 relative rounded-b-md flex justify-between items-center"
    >
      <div />
      <div className="flex justify-center items-center text-3xl gap-2">
        <IoPlaySkipBackSharp className="cursor-pointer" />
        <ButtonPlayPausePlayer />
        <IoPlaySkipForward className="cursor-pointer" />
      </div>
      <div />
      <div className="w-full h-1 absolute bottom-0 rounded-b-md bg-gray-500">
        <div
          style={{ width: `${currentTime}%` }}
          className="h-1 rounded-bl-md bg-yellow-600"
        />
      </div>
    </motion.div>
  );
}
