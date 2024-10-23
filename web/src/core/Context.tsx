"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface PlayerContext {
  resume: () => void;
  isPlay: boolean;
  pause: () => void;
  currentTime: number;
  seek: (position: number) => void;
}

const Context = createContext({} as PlayerContext);

export const usePlayer = () => useContext(Context);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlay, setPlay] = useState(false);
  const [currentTime, setCurrentime] = useState(0);
  const audio = useMemo(
    () =>
      new Audio(
        "https://cdn.nixsolucoes.com.br/tmp/1e4e0961-3476-4318-b0fe-b727156cab62.mp4"
      ),
    []
  );
  const seek = (position: number) => {
    audio.currentTime = position;
  };
  const resume = useCallback(() => {
    setPlay(true);
    audio.play();
  }, [audio]);
  const pause = useCallback(() => {
    setPlay(false);
    audio.pause();
  }, [audio]);
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
  audio.addEventListener("timeupdate", () => {
    if (audio.currentTime === audio.duration) {
      audio.currentTime = 0;
      setPlay(false);
    }
    setCurrentime((audio.currentTime / audio.duration) * 100);
  });
  return (
    <Context.Provider value={{ currentTime, isPlay, pause, resume, seek }}>
      {children}
    </Context.Provider>
  );
};
