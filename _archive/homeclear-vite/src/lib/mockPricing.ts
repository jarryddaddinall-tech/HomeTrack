const PRICE_BY_POSTCODE_AREA: Record<string, number> = {
  SW4: 550000,
  "SW4 2PQ": 485000,
  W6: 720000,
  "W6 9AB": 620000,
  E1: 480000,
  N1: 650000,
  SE1: 580000,
  NW1: 750000,
  YO30: 320000,
  "YO30 6QN": 295000,
};

function getPostcodeArea(postcode: string): string {
  const match = postcode.toUpperCase().match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})?/);
  if (match) return match[2] ? `${match[1]} ${match[2]}` : match[1];
  return postcode.split(" ")[0] || postcode;
}

export function mockPriceByPostcode(postcode: string): number {
  const area = getPostcodeArea(postcode);
  const basePrice = PRICE_BY_POSTCODE_AREA[area] ?? 350000;
  const hash = postcode.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const variation = 0.95 + (hash % 11) / 100;
  return Math.round((basePrice * variation) / 1000) * 1000;
}

export function mockValuationRange(postcode: string): { min: number; max: number } {
  const mid = mockPriceByPostcode(postcode);
  const range = Math.round(mid * 0.05);
  return { min: mid - range, max: mid + range };
}

export function mockStampDuty(price: number): number {
  if (price <= 250000) return 0;
  let duty = 0;
  if (price > 250000) duty += Math.min(price - 250000, 675000) * 0.05;
  if (price > 925000) duty += Math.min(price - 925000, 575000) * 0.1;
  if (price > 1500000) duty += (price - 1500000) * 0.12;
  return Math.round(duty);
}
