/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { usePlayer } from "@/core/Context";
import { motion } from "framer-motion";
import { useCallback, useEffect } from "react";

export default function ModalPage() {
  const { videoRef, updateCurrentTime } = usePlayer();

  const handleUpdateTime = useCallback(() => {
    if (videoRef.current && videoRef.current instanceof HTMLVideoElement) {
      videoRef.current?.addEventListener("timeupdate", (_) => {
        updateCurrentTime(videoRef.current?.currentTime);
      });
    }
  }, [updateCurrentTime, videoRef]);
  useEffect(handleUpdateTime, [handleUpdateTime]);
  return (
    <div className="fixed z-50 inset-0 bg-gradient-to-t from-black to-[#000d]">
      <motion.video
        ref={videoRef}
        src="https://cdn.nixsolucoes.com.br/LADY%20LESTE.mp4"
        layout
        layoutId="video-player"
      />
    </div>
  );
}
