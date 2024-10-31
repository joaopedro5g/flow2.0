/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
"use client";

import { usePlayer } from "@/core/Context";
import { motion } from "framer-motion";
import { FaExpandAlt } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import {
  IoMdPlay,
  IoMdPause,
  IoMdSkipBackward,
  IoMdSkipForward,
} from "react-icons/io";
import { useCallback, useEffect } from "react";

export default function Player() {
  const {
    isPlay,
    pause,
    resume,
    videoRef,
    currentTime,
    seek,
    updateCurrentTime,
  } = usePlayer();
  const pathname = usePathname();
  const router = useRouter();
  const handleUpdateTime = useCallback(() => {
    if (videoRef.current && videoRef.current instanceof HTMLVideoElement) {
      videoRef.current?.addEventListener("timeupdate", (_) => {
        updateCurrentTime(videoRef.current?.currentTime);
      });
    }
  }, [updateCurrentTime, videoRef]);
  useEffect(handleUpdateTime, [handleUpdateTime]);
  useEffect(() => {
    if (videoRef.current && videoRef.current instanceof HTMLVideoElement) {
      if (pathname !== "play") videoRef.current.currentTime = currentTime;
      videoRef.current.addEventListener("canplay", resume);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <motion.div
      layout
      className={`w-96 h-[16.5rem] fixed bottom-4 right-2 z-20 rounded-md`}
    >
      {pathname !== "/play" && (
        <>
          <motion.div layout className="w-full h-[13.5rem]  rounded-t-md">
            <motion.div className="h-full relative rounded-t-md bg-black">
              <motion.video
                layout
                layoutId="video-player"
                ref={videoRef}
                className="w-full rounded-t-md"
                src="https://cdn.nixsolucoes.com.br/LADY%20LESTE.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900 to-transparent transition-opacity duration-150 ease-in-out opacity-0 hover:opacity-100 flex items-center justify-center text-4xl text-white gap-3">
                <FaExpandAlt
                  onClick={() => router.push("/play")}
                  className="rotate-90 text-base cursor-pointer absolute top-5 left-2"
                />
                <IoMdSkipBackward className="cursor-pointer" />
                {isPlay ? (
                  <IoMdPause onClick={pause} className="cursor-pointer" />
                ) : (
                  <IoMdPlay onClick={resume} className="cursor-pointer" />
                )}
                <IoMdSkipForward className="cursor-pointer" />
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            layout
            className="w-full h-12 rounded-b-md bg-neutral-900 flex flex-col items-start justify-center px-4 py-2"
          >
            <span className="text-white text-lg">Glória Groove</span>
            <span className="text-zinc-300 text-sm">Flow Podcast</span>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
