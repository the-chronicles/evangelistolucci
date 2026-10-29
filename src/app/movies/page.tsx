import type { Metadata } from "next";
import MoviesCatalogue from "@/components/MoviesCatalogue";

export const metadata: Metadata = {
  title: "Movies | Evangelist Tolucci",
  description:
    "Discover films produced and directed by Evangelist Tolucci, including Jàndùkú Ìsojí, Apostle Ben, and Mission Malaika.",
};

export default function MoviesPage() {
  return <MoviesCatalogue />;
}
