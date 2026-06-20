import { createFileRoute } from "@tanstack/react-router";
import {
  Nav,
  Hero,
  Marquee,
  About,
  Process,
  Services,
  Featured,
  Markets,
  Pricing,
  Quality,
  Contact,
  Footer,
} from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GroOut — Creative Growth Agency for Brands Ready to Scale" },
      {
        name: "description",
        content:
          "Content, design, social media, podcasts, paid ads and repurposing — one growth-focused system from Mumbai to the world.",
      },
      { property: "og:title", content: "GroOut — Creative Growth Agency" },
      {
        property: "og:description",
        content:
          "Content, Design & Growth Systems for brands ready to scale. India and International clients welcome.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-paper text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Process />
      <Services />
      <Featured />
      <Markets />
      <Pricing />
      <Quality />
      <Contact />
      <Footer />
    </main>
  );
}
