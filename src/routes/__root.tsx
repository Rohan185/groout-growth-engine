import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

// Local-business / organization structured data for search (helps local SEO in
// Bengaluru and Mumbai). Keep email/locations in sync with src/lib/groout-data.ts.
const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "GroOut",
  url: "https://groout.com",
  logo: "https://groout.com/groout-black.png",
  image: "https://groout.com/og.png",
  description:
    "Creative growth studio. Your entire content team: editing, design, social media, podcasts, paid ads and repurposing. Bengaluru and Mumbai, serving clients worldwide.",
  slogan: "You create. We grow it out.",
  email: "kushal@groout.com",
  areaServed: ["India", "Worldwide"],
  address: [
    { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
    { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" },
  ],
});

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-grow px-5 py-2.5 text-sm font-medium text-[oklch(0.02_0_0)] transition-opacity hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-grow px-5 py-2.5 text-sm font-medium text-[oklch(0.02_0_0)] transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GroOut · Creative Growth Studio for Creators & Brands" },
      {
        name: "description",
        content:
          "GroOut is a creative growth studio in Bengaluru and Mumbai. Your entire content team: editing, design, social media, podcasts, paid ads and repurposing, for creators and brands worldwide.",
      },
      { name: "author", content: "GroOut" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#f7f6f2" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "GroOut" },
      { property: "og:title", content: "GroOut · Creative Growth Studio" },
      {
        property: "og:description",
        content:
          "Your entire content team: editing, design, social, podcasts, ads and repurposing. Bengaluru and Mumbai, serving clients worldwide.",
      },
      { property: "og:url", content: "https://groout.com/" },
      { property: "og:image", content: "https://groout.com/og.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "GroOut. You create. We grow it out." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "GroOut · Creative Growth Studio" },
      { name: "twitter:description", content: "Your entire content team, from Bengaluru and Mumbai to the world." },
      { name: "twitter:image", content: "https://groout.com/og.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "canonical", href: "https://groout.com/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
