// Enquanto o site não estiver publicado no domínio final, nada é indexado.
import { NextResponse } from "next/server";
import { indexavel, manifest } from "./lib/manifest";

export function proxy() {
  const res = NextResponse.next();
  if (!indexavel(manifest)) res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?)$).*)"],
};
