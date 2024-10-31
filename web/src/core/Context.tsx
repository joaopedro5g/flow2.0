/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface PlayerContext {
  resume: () => void;
  isPlay: boolean;
  pause: () => void;
  currentTime: number;
  seek: (position: number) => void;
  updateCurrentTime: (position: number) => void;
  videoRef: MutableRefObject<HTMLVideoElement>;
}

const Context = createContext({} as PlayerContext);

export const usePlayer = () => useContext(Context);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlay, setPlay] = useState(false);
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>({} as HTMLVideoElement);
  const [currentTime, setCurrentTime] = useState(0);
  const seek = (position: number) => {
    if (videoRef.current && videoRef.current instanceof HTMLVideoElement) {
      videoRef.current.currentTime = position;
    }
  };
  const resume = useCallback(() => {
    setPlay(true);
    videoRef.current?.play();
  }, []);
  const pause = useCallback(() => {
    setPlay(false);
    videoRef.current?.pause();
  }, []);
  // const handleStart = useCallback(() => {
  //   if (videoRef.current && videoRef.current instanceof HTMLVideoElement) {
  //     videoRef.current.currentTime = currentTime;
  //     videoRef.current.addEventListener("canplay", resume);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [videoRef, resume]);
  // useEffect(handleStart, [handleStart, pathname]);
  useEffect(() => {
    if ("mediaSession" in navigator) {
      const media = navigator.mediaSession;
      media.metadata = new MediaMetadata({
        title: "Californication",
        artist: "RHCP",
        artwork: [
          {
            src: "https://cdn.nixsolucoes.com.br/flow/96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "https://cdn.nixsolucoes.com.br/flow/128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "https://cdn.nixsolucoes.com.br/flow/192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "https://cdn.nixsolucoes.com.br/flow/256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
        ],
      });
      media.setActionHandler("play", () => resume());
      media.setActionHandler("pause", () => pause());
    }
  }, [pause, resume]);
  const handleUpdateTime = useCallback(() => {
    if (videoRef.current && videoRef.current instanceof HTMLVideoElement) {
      videoRef.current?.addEventListener("timeupdate", (_) => {
        if (videoRef.current.currentTime === videoRef.current.duration) {
          pause();
          videoRef.current.currentTime = 0;
          seek(0);
        }
      });
    }
  }, [pause]);
  useEffect(handleUpdateTime, [handleUpdateTime]);
  return (
    <Context.Provider
      value={{
        currentTime,
        isPlay,
        pause,
        resume,
        seek,
        videoRef,
        updateCurrentTime: setCurrentTime,
      }}
    >
      {children}
    </Context.Provider>
  );
};
