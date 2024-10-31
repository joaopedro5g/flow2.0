import Banner from "@/components/Banner";
import CardContainer from "@/components/CardContainer";

/* eslint-disable @next/next/no-img-element */

export default function Home() {
  return (
    <div className="w-full h-full">
      <Banner />
      <CardContainer data={[1, 1, 1, 1, 1, 1, 1, 1]} title="EM ALTA" />
      <CardContainer data={[1, 1]} title="Flow Podcast" />
    </div>
  );
}
