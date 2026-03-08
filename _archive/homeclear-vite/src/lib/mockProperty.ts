/**
 * Mock "AI" parsing of user prompt + property data.
 * In production this would call an AI API and real property APIs.
 */

import { mockValuationRange, mockStampDuty } from "./mockPricing";

// UK postcode regex: area (1-2 letters + 1-2 digits) + optional space + inward (1 digit + 2 letters)
const POSTCODE_REGEX = /\b([A-Z]{1,2}[0-9]{1,2}\s*[0-9][A-Z]{2})\b/gi;

export interface PropertyDetails {
  address: string;
  postcode: string;
  /** Current estimated value range */
  valuedPriceMin: number;
  valuedPriceMax: number;
  /** Last sale */
  lastSoldPrice: number;
  lastSoldDate: string;
  /** Council tax */
  councilTaxBand: string;
  councilTaxAnnual: number;
  /** Mortgage estimate (example monthly at 5% over 25y on 80% LTV) */
  estimatedMonthlyMortgage: number;
  estimatedStampDuty: number;
  /** Intent parsed from prompt */
  intent: string;
}

function normalisePostcode(raw: string): string {
  const cleaned = raw.trim().toUpperCase().replace(/\s/g, "");
  const match = cleaned.match(/^([A-Z]{1,2}[0-9][0-9A-Z]?)([0-9][A-Z]{2})$/);
  if (match) return `${match[1]} ${match[2]}`;
  return raw.trim().toUpperCase();
}

/**
 * "Parse" the user prompt to extract address and postcode, then return mock property details.
 */
export function mockParsePromptAndGetProperty(prompt: string): PropertyDetails | null {
  const trimmed = prompt.trim();
  if (!trimmed) return null;

  const normalisedPrompt = trimmed.replace(/\s+/g, " ").trim();
  const postcodeMatch = normalisedPrompt.match(POSTCODE_REGEX);
  const postcode = postcodeMatch
    ? normalisePostcode(postcodeMatch[postcodeMatch.length - 1].replace(/\s/g, " "))
    : "";

  // Build address: find a street-like part (contains number) before postcode, or use prompt snippet
  let address = "Your property";
  const beforePostcode = postcode
    ? normalisedPrompt
        .substring(0, normalisedPrompt.toUpperCase().indexOf(postcode.replace(/\s/g, "")) || normalisedPrompt.length)
        .trim()
    : normalisedPrompt;
  const parts = beforePostcode.split(/[,.]/).map((p) => p.trim()).filter(Boolean);
  const streetPart = parts.find((p) => /\d/.test(p));
  if (streetPart) {
    address = streetPart;
  } else if (parts.length > 0) {
    address = parts[parts.length - 1];
  }
  if (!postcode && trimmed.length > 0) {
    address = trimmed.slice(0, 50).trim();
  }

  const valuation = postcode ? mockValuationRange(postcode) : { min: 285000, max: 315000 };
  const midPrice = Math.round((valuation.min + valuation.max) / 2 / 1000) * 1000;

  const lastSoldPrice = Math.round(midPrice * (0.85 + Math.random() * 0.15));
  const lastSoldDate = new Date(Date.now() - 365 * (2 + Math.floor(Math.random() * 4)) * 24 * 60 * 60 * 1000);

  const bands = ["A", "B", "C", "D", "E", "F"];
  const bandIndex = Math.min(5, Math.floor(midPrice / 80000));
  const councilTaxBand = bands[bandIndex] || "D";
  const councilTaxAnnual = [1200, 1400, 1600, 1900, 2200, 2600][bandIndex] || 1900;

  const loanAmount = Math.round(midPrice * 0.8);
  const monthlyRate = 0.05 / 12;
  const numPayments = 25 * 12;
  const estimatedMonthlyMortgage = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
  );

  const estimatedStampDuty = mockStampDuty(midPrice);

  const intent = trimmed.length > 80 ? trimmed.slice(0, 77) + "…" : trimmed;

  return {
    address: address || "Your property",
    postcode: postcode || "—",
    valuedPriceMin: valuation.min,
    valuedPriceMax: valuation.max,
    lastSoldPrice,
    lastSoldDate: lastSoldDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
    councilTaxBand,
    councilTaxAnnual,
    estimatedMonthlyMortgage,
    estimatedStampDuty,
    intent,
  };
}
