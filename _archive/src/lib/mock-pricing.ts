/**
 * Mock pricing - simulates property price, solicitor cost, and stamp duty APIs.
 * Replace with real APIs in production.
 */

// UK average prices by postcode area (approximate, for mock)
const PRICE_BY_POSTCODE_AREA: Record<string, number> = {
  SW4: 550000,
  "SW4 2PQ": 485000,
  W6: 720000,
  "W6 9AB": 620000,
  E1: 480000,
  "E1 6AN": 520000,
  N1: 650000,
  SE1: 580000,
  NW1: 750000,
};

function getPostcodeArea(postcode: string): string {
  const match = postcode.toUpperCase().match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})?/);
  if (match) {
    return match[2] ? `${match[1]} ${match[2]}` : match[1];
  }
  return postcode.split(" ")[0] || postcode;
}

/**
 * Mock property price by postcode.
 * Returns estimated price based on area; add variation by address hash for realism.
 */
export function mockPriceByPostcode(postcode: string): number {
  const area = getPostcodeArea(postcode);
  const basePrice = PRICE_BY_POSTCODE_AREA[area] ?? 350000;
  // Add ±5% variation based on postcode string
  const hash = postcode.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const variation = 0.95 + (hash % 11) / 100;
  return Math.round((basePrice * variation) / 1000) * 1000;
}

/**
 * Valuation range for selling property - min/max estimate.
 */
export function mockValuationRange(postcode: string): { min: number; max: number } {
  const mid = mockPriceByPostcode(postcode);
  const range = Math.round(mid * 0.05);
  return { min: mid - range, max: mid + range };
}

/**
 * Mock solicitor cost by property price and transaction type.
 * UK typical: buying £1,200–£2,200, selling £1,000–£1,800.
 */
export function mockSolicitorCost(price: number, type: "buying" | "selling"): number {
  if (type === "buying") {
    const base = 1200;
    const scaled = Math.min(800, Math.floor(price / 500000) * 100);
    return base + scaled;
  }
  const base = 1000;
  const scaled = Math.min(600, Math.floor(price / 600000) * 80);
  return base + scaled;
}

/**
 * UK stamp duty (2024/25 thresholds) - buyers only.
 * 0% up to £250k, 5% £250k–£925k, 10% £925k–£1.5m, 12% above.
 */
export function mockStampDuty(price: number): number {
  if (price <= 250000) return 0;
  let duty = 0;
  if (price > 250000) duty += Math.min(price - 250000, 675000) * 0.05;
  if (price > 925000) duty += Math.min(price - 925000, 575000) * 0.10;
  if (price > 1500000) duty += (price - 1500000) * 0.12;
  return Math.round(duty);
}

/**
 * Mock estate agent fee (sellers) - typically 1–2%.
 */
export function mockEstateAgentFee(price: number): number {
  return Math.round(price * 0.015); // 1.5%
}
