import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GroOut · Creative Growth Studio for Creators & Brands" },
      {
        name: "description",
        content:
          "GroOut is your entire content team: video editing, design, social media, podcasts, paid ads and repurposing. One dedicated crew, from Bengaluru and Mumbai to the world.",
      },
      { property: "og:title", content: "GroOut · Creative Growth Studio" },
      {
        property: "og:description",
        content:
          "Your entire content team in one place. Video editing, design, social, podcasts, ads and repurposing, from Bengaluru and Mumbai to the world.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Landing />;
}
