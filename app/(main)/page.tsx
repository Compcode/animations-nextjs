
import { Backdrop } from "@/components/backdrop";
import { CardSlider } from "@/components/card";

export default function MainHome() {

  return (
    <>
      <div className="min-w-[20em]">
        <section className="relative w-full h-screen overflow-hidden">
          <Backdrop />
        </section>

        {/* Scroll section */}
        <section className="h-[150dvh] overflow-hidden bg-yellow-100/50 px-4 py-16 min-h-[100vh] sm:px-6 md:px-10 md:py-20">
          <CardSlider />
        </section>
      </div>
    </>
  );
}
