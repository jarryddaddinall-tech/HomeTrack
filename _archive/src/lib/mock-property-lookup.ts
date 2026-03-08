/**
 * Mock Zoopla-style property lookup by postcode.
 * Returns full property details (beds, baths, type, price, etc.)
 */

import { mockPriceByPostcode } from "./mock-pricing";
import type { AddressSuggestion } from "./mock-addresses";

export interface PropertyListing {
  address: string;
  town: string;
  postcode: string;
  price: number;
  beds: number;
  baths: number;
  propertyType: "House" | "Flat" | "Bungalow" | "Semi-detached" | "Terraced";
  description?: string;
}

const LISTINGS: Record<string, PropertyListing[]> = {
  "SW4": [
    { address: "24 Oak Lane", town: "Clapham", postcode: "SW4 2PQ", price: 485000, beds: 3, baths: 2, propertyType: "Terraced" },
    { address: "26 Oak Lane", town: "Clapham", postcode: "SW4 2PQ", price: 495000, beds: 3, baths: 1, propertyType: "Terraced" },
    { address: "15 Clapham Common North Side", town: "Clapham", postcode: "SW4 0QL", price: 720000, beds: 4, baths: 2, propertyType: "Semi-detached" },
    { address: "42 The Chase", town: "Clapham", postcode: "SW4 0NP", price: 550000, beds: 3, baths: 2, propertyType: "House" },
    { address: "8 Abbeville Road", town: "Clapham", postcode: "SW4 9NG", price: 620000, beds: 4, baths: 3, propertyType: "House" },
  ],
  "W6": [
    { address: "7 Riverside Gardens", town: "Hammersmith", postcode: "W6 9AB", price: 620000, beds: 3, baths: 2, propertyType: "House" },
    { address: "45 Hammersmith Grove", town: "Hammersmith", postcode: "W6 0NE", price: 580000, beds: 2, baths: 1, propertyType: "Flat" },
    { address: "12 Fulham Palace Road", town: "Hammersmith", postcode: "W6 9ER", price: 750000, beds: 4, baths: 3, propertyType: "Semi-detached" },
  ],
  "E1": [
    { address: "42 Brick Lane", town: "Shoreditch", postcode: "E1 6AN", price: 520000, beds: 2, baths: 1, propertyType: "Flat" },
    { address: "18 Hanbury Street", town: "Shoreditch", postcode: "E1 6QR", price: 480000, beds: 2, baths: 1, propertyType: "Flat" },
  ],
  "N1": [
    { address: "22 Upper Street", town: "Islington", postcode: "N1 0PN", price: 650000, beds: 3, baths: 2, propertyType: "House" },
    { address: "55 Essex Road", town: "Islington", postcode: "N1 2SF", price: 580000, beds: 2, baths: 1, propertyType: "Flat" },
  ],
  "SE1": [
    { address: "50 Bermondsey Street", town: "London Bridge", postcode: "SE1 3UD", price: 580000, beds: 2, baths: 1, propertyType: "Flat" },
  ],
  "NW1": [
    { address: "30 Parkway", town: "Camden", postcode: "NW1 7AA", price: 750000, beds: 4, baths: 3, propertyType: "House" },
    { address: "15 Regent's Park Road", town: "Camden", postcode: "NW1 8TX", price: 680000, beds: 3, baths: 2, propertyType: "Semi-detached" },
  ],
};

function normalisePostcode(input: string): string {
  return input.toUpperCase().replace(/\s+/g, " ").trim();
}

/**
 * Mock postcode lookup - returns properties with full Zoopla-style details.
 */
export async function mockPropertyLookupByPostcode(postcode: string): Promise<PropertyListing[]> {
  await new Promise((r) => setTimeout(r, 400));

  if (!postcode || postcode.length < 2) return [];

  const normalised = normalisePostcode(postcode);
  const area = normalised.split(" ")[0] || normalised;

  const exact = LISTINGS[normalised];
  if (exact) return exact;

  const areaMatch = LISTINGS[area];
  if (areaMatch) return areaMatch;

  const prefixMatch = Object.entries(LISTINGS).find(([key]) =>
    key.toLowerCase().startsWith(area.toLowerCase())
  );
  if (prefixMatch) return prefixMatch[1];

  return [];
}
