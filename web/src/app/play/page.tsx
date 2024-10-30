/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { usePlayer } from "@/core/Context";
import { motion } from "framer-motion";
import { useCallback, useEffect } from "react";
// import { useCallback, useEffect } from "react";
export default function PlayPage() {
  const { videoRef, updateCurrentTime } = usePlayer();

  const handleUpdateTime = useCallback(() => {
    if (videoRef.current) {
      videoRef.current?.addEventListener("timeupdate", (_) => {
        updateCurrentTime(videoRef.current?.currentTime);
      });
    }
  }, [updateCurrentTime, videoRef]);
  useEffect(handleUpdateTime, [handleUpdateTime]);
  return (
    <div className="w-full bg-black">
      <motion.video
        layoutId="video-player"
        layout
        autoPlay
        ref={videoRef}
        src="https://cdn.nixsolucoes.com.br/LADY%20LESTE.mp4"
      />
    </div>
  );
}
