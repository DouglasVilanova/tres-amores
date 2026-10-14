import type { MetadataRoute } from "next";
import { manifest as site } from "@/lib/manifest";

export default function webManifest(): MetadataRoute.Manifest {
  return {
    name: site.nome,
    short_name: "Três Amores",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf7",
    theme_color: "#fffdf7",
  };
}
