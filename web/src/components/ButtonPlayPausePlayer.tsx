"use client";

import { usePlayer } from "@/core/Context";
import { IoPause, IoPlay } from "react-icons/io5";

export default function ButtonPlayPausePlayer() {
  const { isPlay, resume, pause } = usePlayer();
  return (
    <>
      {!isPlay ? (
        <IoPlay onClick={resume} className="cursor-pointer" />
      ) : (
        <IoPause onClick={pause} className="cursor-pointer" />
      )}
    </>
  );
}
