/* eslint-disable @next/next/no-img-element */
"use client";

import { Roboto_Condensed } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
const roboto = Roboto_Condensed({
  subsets: ["latin"],
});

export default function Banner() {
  const [play, setPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleEffect = useCallback(() => {
    setTimeout(() => {
      setPlay(true);
      // videoRef.current?.play();
    }, 1000 * 4);
  }, []);
  useEffect(handleEffect, [handleEffect]);

  return (
    <div className="w-full h-[80vh] relative">
      <div className="w-full h-full bg-gradient-to-tr from-black to-[#0002] absolute inset-0" />
      <video
        className="w-full"
        src="https://cdn.nixsolucoes.com.br/LADY%20LESTE.mp4"
        ref={videoRef}
      />
      <div className="w-1/3 absolute bottom-10 left-10 z-10 text-white">
        <img
          className={`${
            play ? "w-24 h-24" : "w-28 h-28"
          } transition-all duration-700 ease-in-out`}
          src="https://cdn.flowpodcast.com.br/criador/25x0SqMaSNXgwv14g0Xg/assets/images/j-o2CbKjMl.png"
          alt="OKOK"
        />
        <h2
          style={roboto.style}
          className={`uppercase font-bold mb-1 transition-all duration-700 ease-in-out ${
            play ? "text-2xl" : "text-3xl"
          }`}
        >
          Glória Groove
        </h2>
        {!play && (
          <span className="text-sm font-light">
            Glória Groove é uma artista multifacetada que combina pop, funk e
            rap. Com seu projeto &quot;Serenata da GG&quot;, ela explora o
            pagode, refletindo sobre sua trajetória musical e o impacto de seu
            álbum &quot;Lady Leste&quot;. Além de sua habilidade vocal, Glória
            se destaca como um ícone do empoderamento LGBTQIA+, promovendo a
            autoexpressão em sua arte.
          </span>
        )}
      </div>
    </div>
  );
}
