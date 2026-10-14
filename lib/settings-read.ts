// Conteúdo do site. Fica em lib/defaults.ts; não há banco.
import { cache } from "react";
import { SITE_DEFAULTS } from "./defaults";
import type { SiteSettings } from "./types";

export const getSettings = cache(async (): Promise<SiteSettings> => SITE_DEFAULTS);
