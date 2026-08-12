import SplinePage from "@/components/spline";

export default function Home() {
  const splineUrl = {
    bg: {
      link: "https://prod.spline.design/OZIFEJyygtHz0WqQ/scene.splinecode",
      code: "OZIFEJyygtHz0WqQ",
    },
    drone: {
      link: "https://prod.spline.design/BimzZn0WNgEZZz0W/scene.splinecode",
      code: "BimzZn0WNgEZZz0W",
    },
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <SplinePage url={splineUrl.drone.link} cacheKey={splineUrl.drone.code} />
    </div>
  );
}
