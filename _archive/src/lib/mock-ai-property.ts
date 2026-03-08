/**
 * Mock AI: parses a natural-language prompt and "generates" ideal properties.
 * Returns multiple results with source tags (Rightmove, Zoopla, etc.)
 */

import { mockPriceByPostcode } from "./mock-pricing";
import type { AddressSuggestion } from "./mock-addresses";
import type { ListingSource } from "./shortlist";

const SOURCES: ListingSource[] = ["Rightmove", "Zoopla", "OnTheMarket", "PrimeLocation"];

// Area keywords → address suggestions
const AREA_TO_ADDRESS: Record<string, AddressSuggestion[]> = {
  clapham: [
    { address: "24 Oak Lane", town: "Clapham", postcode: "SW4 2PQ" },
    { address: "15 Clapham Common North Side", town: "Clapham", postcode: "SW4 0QL" },
    { address: "42 The Chase", town: "Clapham", postcode: "SW4 0NP" },
  ],
  hammersmith: [
    { address: "7 Riverside Gardens", town: "Hammersmith", postcode: "W6 9AB" },
    { address: "45 Hammersmith Grove", town: "Hammersmith", postcode: "W6 0NE" },
  ],
  shoreditch: [
    { address: "42 Brick Lane", town: "Shoreditch", postcode: "E1 6AN" },
    { address: "18 Hanbury Street", town: "Shoreditch", postcode: "E1 6QR" },
  ],
  islington: [
    { address: "22 Upper Street", town: "Islington", postcode: "N1 0PN" },
    { address: "55 Essex Road", town: "Islington", postcode: "N1 2SF" },
  ],
  camden: [
    { address: "30 Parkway", town: "Camden", postcode: "NW1 7AA" },
    { address: "15 Regent's Park Road", town: "Camden", postcode: "NW1 8TX" },
  ],
  london: [
    { address: "24 Oak Lane", town: "Clapham", postcode: "SW4 2PQ" },
    { address: "7 Riverside Gardens", town: "Hammersmith", postcode: "W6 9AB" },
    { address: "42 Brick Lane", town: "Shoreditch", postcode: "E1 6AN" },
  ],
};

const BED_PATTERNS = [/\b(\d)\s*bed/i, /\b(\d)\s*bedroom/i, /\b(\d)br\b/i];
const DEFAULT_ADDRESS: AddressSuggestion = { address: "12 Maple Gardens", town: "Clapham", postcode: "SW4 2PQ" };

function parsePrompt(prompt: string): { area?: string; beds?: number; addresses: AddressSuggestion[] } {
  const lower = prompt.toLowerCase().trim();
  let area: string | undefined;
  let beds: number | undefined;

  for (const [key] of Object.entries(AREA_TO_ADDRESS)) {
    if (lower.includes(key)) {
      area = key;
      break;
    }
  }

  for (const pattern of BED_PATTERNS) {
    const m = lower.match(pattern);
    if (m) {
      beds = parseInt(m[1], 10);
      break;
    }
  }

  const addresses = area && AREA_TO_ADDRESS[area] ? AREA_TO_ADDRESS[area] : Object.values(AREA_TO_ADDRESS).flat();
  return { area, beds, addresses };
}

function hashString(s: string): number {
  return s.split("").reduce((acc, c) => acc * 31 + c.charCodeAt(0), 0);
}

export interface AIPropertyResult {
  address: string;
  town: string;
  postcode: string;
  price: number;
  beds?: number;
  baths?: number;
  propertyType?: string;
  source: ListingSource;
  sourceUrl?: string;
}

/**
 * Mock AI: returns 3–5 properties with source tags.
 */
export async function mockAISearchProperties(prompt: string): Promise<AIPropertyResult[]> {
  await new Promise((r) => setTimeout(r, 1500));

  const { beds, addresses } = parsePrompt(prompt);
  const count = 3 + (hashString(prompt) % 3);
  const results: AIPropertyResult[] = [];
  const used = new Set<string>();

  for (let i = 0; i < count && i < addresses.length; i++) {
    const idx = (hashString(prompt + i) + i) % addresses.length;
    const addr = addresses[idx];
    const key = `${addr.address}-${addr.postcode}`;
    if (used.has(key)) continue;
    used.add(key);

    const price = mockPriceByPostcode(addr.postcode);
    const source = SOURCES[i % SOURCES.length];
    results.push({
      address: addr.address,
      town: addr.town,
      postcode: addr.postcode,
      price,
      beds: beds ?? 2 + (i % 2),
      baths: 1 + (i % 2),
      propertyType: ["House", "Flat", "Semi-detached"][i % 3],
      source,
      sourceUrl: `https://${source.toLowerCase()}.co.uk/listing/${hashString(key)}`,
    });
  }

  return results;
}
