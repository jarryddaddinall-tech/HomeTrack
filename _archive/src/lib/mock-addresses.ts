/**
 * Mock address lookup - simulates postcode/address API.
 * Replace with real API (e.g. GetAddress.io, Loqate) in production.
 */

export interface AddressSuggestion {
  address: string;
  town: string;
  postcode: string;
}

// Curated UK addresses by postcode area for realistic mock lookup
const ADDRESSES_BY_POSTCODE: Record<string, AddressSuggestion[]> = {
  "SW4": [
    { address: "24 Oak Lane", town: "Clapham", postcode: "SW4 2PQ" },
    { address: "26 Oak Lane", town: "Clapham", postcode: "SW4 2PQ" },
    { address: "28 Oak Lane", town: "Clapham", postcode: "SW4 2PQ" },
    { address: "15 Clapham Common North Side", town: "Clapham", postcode: "SW4 0QL" },
    { address: "42 The Chase", town: "Clapham", postcode: "SW4 0NP" },
    { address: "8 Abbeville Road", town: "Clapham", postcode: "SW4 9NG" },
  ],
  "SW4 2PQ": [
    { address: "24 Oak Lane", town: "Clapham", postcode: "SW4 2PQ" },
    { address: "26 Oak Lane", town: "Clapham", postcode: "SW4 2PQ" },
    { address: "28 Oak Lane", town: "Clapham", postcode: "SW4 2PQ" },
  ],
  "W6": [
    { address: "7 Riverside Gardens", town: "Hammersmith", postcode: "W6 9AB" },
    { address: "9 Riverside Gardens", town: "Hammersmith", postcode: "W6 9AB" },
    { address: "11 Riverside Gardens", town: "Hammersmith", postcode: "W6 9AB" },
    { address: "45 Hammersmith Grove", town: "Hammersmith", postcode: "W6 0NE" },
    { address: "12 Fulham Palace Road", town: "Hammersmith", postcode: "W6 9ER" },
    { address: "3 Brackenbury Road", town: "Hammersmith", postcode: "W6 0BE" },
  ],
  "W6 9AB": [
    { address: "7 Riverside Gardens", town: "Hammersmith", postcode: "W6 9AB" },
    { address: "9 Riverside Gardens", town: "Hammersmith", postcode: "W6 9AB" },
    { address: "11 Riverside Gardens", town: "Hammersmith", postcode: "W6 9AB" },
  ],
  "E1": [
    { address: "42 Brick Lane", town: "Shoreditch", postcode: "E1 6AN" },
    { address: "18 Hanbury Street", town: "Shoreditch", postcode: "E1 6QR" },
    { address: "5 Fournier Street", town: "Shoreditch", postcode: "E1 6QE" },
    { address: "33 Commercial Street", town: "Shoreditch", postcode: "E1 6BD" },
    { address: "12 Shoreditch High Street", town: "Shoreditch", postcode: "E1 6PG" },
  ],
  "E1 6AN": [
    { address: "42 Brick Lane", town: "Shoreditch", postcode: "E1 6AN" },
    { address: "44 Brick Lane", town: "Shoreditch", postcode: "E1 6AN" },
    { address: "46 Brick Lane", town: "Shoreditch", postcode: "E1 6AN" },
  ],
  "N1": [
    { address: "22 Upper Street", town: "Islington", postcode: "N1 0PN" },
    { address: "55 Essex Road", town: "Islington", postcode: "N1 2SF" },
    { address: "8 Canonbury Lane", town: "Islington", postcode: "N1 2AS" },
    { address: "14 Newington Green", town: "Islington", postcode: "N1 4RQ" },
  ],
  "SE1": [
    { address: "50 Bermondsey Street", town: "London Bridge", postcode: "SE1 3UD" },
    { address: "12 Maltby Street", town: "Bermondsey", postcode: "SE1 3PA" },
    { address: "88 Southwark Bridge Road", town: "Southwark", postcode: "SE1 0EX" },
  ],
  "NW1": [
    { address: "30 Parkway", town: "Camden", postcode: "NW1 7AA" },
    { address: "15 Regent's Park Road", town: "Camden", postcode: "NW1 8TX" },
    { address: "72 Chalk Farm Road", town: "Camden", postcode: "NW1 8AN" },
  ],
};

function normalisePostcode(input: string): string {
  return input.toUpperCase().replace(/\s+/g, " ").trim();
}

/**
 * Mock address lookup - returns suggestions after a short delay to simulate API.
 * Searches by postcode (full or partial) or by address substring.
 */
export async function mockAddressLookup(query: string): Promise<AddressSuggestion[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!query || query.length < 2) return [];

  const normalised = normalisePostcode(query);

  // Try exact postcode match first
  const exactMatch = ADDRESSES_BY_POSTCODE[normalised];
  if (exactMatch) return exactMatch;

  // Try postcode area (e.g. SW4 matches SW4 2PQ)
  const areaPart = normalised.split(" ")[0] || normalised;
  const areaMatch = Object.entries(ADDRESSES_BY_POSTCODE).find(([key]) =>
    key.startsWith(areaPart) || areaPart.startsWith(key.split(" ")[0] || "")
  );
  if (areaMatch) return areaMatch[1];

  // Try postcode prefix (e.g. SW matches SW4)
  const prefixMatch = Object.entries(ADDRESSES_BY_POSTCODE).filter(([key]) =>
    key.toLowerCase().startsWith(normalised.toLowerCase()) ||
    normalised.toLowerCase().startsWith(key.toLowerCase().split(" ")[0] || "")
  );
  if (prefixMatch.length > 0) {
    const seen = new Map<string, AddressSuggestion>();
    for (const [, addrs] of prefixMatch) {
      for (const a of addrs) {
        seen.set(`${a.address}-${a.town}-${a.postcode}`, a);
      }
    }
    return Array.from(seen.values());
  }

  // Try address search
  const allAddresses = Object.values(ADDRESSES_BY_POSTCODE).flat();
  const addressMatch = allAddresses.filter(
    (a) =>
      a.address.toLowerCase().includes(query.toLowerCase()) ||
      a.town.toLowerCase().includes(query.toLowerCase()) ||
      a.postcode.toLowerCase().includes(query.toLowerCase())
  );
  if (addressMatch.length > 0) return addressMatch;

  return [];
}
