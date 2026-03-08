"use client";

import { useState } from "react";
import { getValuation } from "@/app/actions/start";
import { createProjectFromStart } from "@/app/actions/start";
import { PROBLEM_REASON_LABELS, type ProblemReason } from "@/lib/projects";
import { mockStampDuty } from "@/lib/mock-pricing";
import { SubmitButton } from "@/components/submit-button";

const REASONS: ProblemReason[] = [
  "too_small",
  "too_far",
  "too_old",
  "need_garden",
  "need_schools",
  "near_family",
  "downsize",
  "other",
];

const PROPERTY_TYPES = [
  { value: "house", label: "House" },
  { value: "flat", label: "Flat" },
  { value: "bungalow", label: "Bungalow" },
  { value: "other", label: "Other" },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);
}

export function StartHereForm({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [postcode, setPostcode] = useState("");
  const [valuation, setValuation] = useState<{ min: number; max: number } | null>(null);
  const [valuationLoading, setValuationLoading] = useState(false);
  const [valuationError, setValuationError] = useState<string | null>(null);

  // Mortgage calculator state
  const [deposit, setDeposit] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [income, setIncome] = useState("");
  const [termYears, setTermYears] = useState("25");
  const [ratePercent, setRatePercent] = useState("5");

  const fetchValuation = () => {
    const trimmed = postcode.trim();
    if (trimmed.length < 4) {
      setValuation(null);
      setValuationError(null);
      return;
    }
    setValuationLoading(true);
    setValuationError(null);
    getValuation(trimmed)
      .then((result) => {
        setValuation(result);
        setValuationError(null);
      })
      .catch(() => {
        setValuation(null);
        setValuationError("We couldn’t get a valuation for that postcode. Please try again.");
      })
      .finally(() => setValuationLoading(false));
  };

  // Mortgage calc: typical 4.5x income multiple, or affordability
  const depositNum = parseInt(deposit.replace(/[^0-9]/g, ""), 10) || 0;
  const priceNum = parseInt(purchasePrice.replace(/[^0-9]/g, ""), 10) || 0;
  const incomeNum = parseInt(income.replace(/[^0-9]/g, ""), 10) || 0;
  const termNum = parseInt(termYears, 10) || 25;
  const rateNum = parseFloat(ratePercent) || 5;

  const loanAmount = Math.max(0, priceNum - depositNum);
  const monthlyRate = rateNum / 100 / 12;
  const numPayments = termNum * 12;
  const monthlyPayment =
    loanAmount > 0 && monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : 0;
  const stampDuty = priceNum > 0 ? mockStampDuty(priceNum) : 0;
  const maxBorrow = incomeNum > 0 ? Math.round(incomeNum * 4.5 * 12) : 0;

  return (
    <div className="space-y-8">
      <form action={createProjectFromStart} className="card-base p-6">
        <h2 className="text-lg font-semibold text-slate-900">Tell us about your situation</h2>
        <p className="mt-1 text-sm text-slate-600">
          We&apos;ll use this to personalise your experience. No signup required to see your valuation.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-slate-700">
              Why are you thinking about moving?
            </label>
            <select
              id="reason"
              name="reason"
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            >
              <option value="">Select a reason</option>
              {REASONS.map((r) => (
                <option key={r} value={r}>
                  {PROBLEM_REASON_LABELS[r]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="postcode" className="block text-sm font-medium text-slate-700">
              Your postcode (for valuation)
            </label>
            <div className="mt-1 flex gap-2">
              <input
                id="postcode"
                name="postcode"
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                onBlur={fetchValuation}
                placeholder="e.g. SW4 2PQ"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
              <button
                type="button"
                onClick={fetchValuation}
                disabled={valuationLoading || postcode.trim().length < 4}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
              >
                {valuationLoading ? "..." : "Get valuation"}
              </button>
            </div>
            {valuation && (
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-accent">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Your home could be worth {formatPrice(valuation.min)}–{formatPrice(valuation.max)} based on similar sales in your area.
              </p>
            )}
            {valuationError && (
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-amber-700" role="alert">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                {valuationError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-slate-700">
              Property type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            >
              <option value="">Select type</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Name your move (optional)
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Move to a bigger house"
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </div>
        </div>

        <div className="mt-6">
          <SubmitButton
            className="btn-primary w-full bg-accent disabled:opacity-70"
          >
            {isLoggedIn ? "Start my move" : "Create your move"}
          </SubmitButton>
          {!isLoggedIn && (
            <p className="mt-2 text-center text-xs text-slate-500">
              You&apos;ll create an account to save your move and continue.
            </p>
          )}
        </div>
      </form>

      {/* Mortgage calculator - Stage 1 value */}
      <div className="card-base p-6">
        <h2 className="text-lg font-semibold text-slate-900">What can you afford?</h2>
        <p className="mt-1 text-sm text-slate-600">
          Use our mortgage calculator to see monthly payments and stamp duty.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="purchasePrice" className="block text-sm font-medium text-slate-700">
              Purchase price (£)
            </label>
            <input
              id="purchasePrice"
              type="text"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder="e.g. 450000"
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </div>
          <div>
            <label htmlFor="deposit" className="block text-sm font-medium text-slate-700">
              Deposit (£)
            </label>
            <input
              id="deposit"
              type="text"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              placeholder="e.g. 50000"
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </div>
          <div>
            <label htmlFor="income" className="block text-sm font-medium text-slate-700">
              Annual income (£) — for affordability
            </label>
            <input
              id="income"
              type="text"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g. 60000"
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </div>
          <div>
            <label htmlFor="termYears" className="block text-sm font-medium text-slate-700">
              Mortgage term (years)
            </label>
            <input
              id="termYears"
              type="number"
              min="5"
              max="40"
              value={termYears}
              onChange={(e) => setTermYears(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </div>
          <div>
            <label htmlFor="ratePercent" className="block text-sm font-medium text-slate-700">
              Interest rate (%)
            </label>
            <input
              id="ratePercent"
              type="text"
              value={ratePercent}
              onChange={(e) => setRatePercent(e.target.value)}
              placeholder="5"
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </div>
        </div>

        {(priceNum > 0 || depositNum > 0 || incomeNum > 0) && (
          <div className="mt-6 rounded-xl border border-slate-100 bg-accent/5 p-4">
            <dl className="space-y-2 text-sm">
              {loanAmount > 0 && (
                <>
                  <div className="flex justify-between">
                    <dt className="text-slate-600">Loan amount</dt>
                    <dd className="font-semibold text-slate-900">{formatPrice(loanAmount)}</dd>
                  </div>
                  {monthlyPayment > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-slate-600">Estimated monthly payment</dt>
                      <dd className="font-semibold text-accent">{formatPrice(monthlyPayment)}</dd>
                    </div>
                  )}
                </>
              )}
              {stampDuty > 0 && (
                <div className="flex justify-between">
                  <dt className="text-slate-600">Stamp duty</dt>
                  <dd className="font-semibold text-slate-900">{formatPrice(stampDuty)}</dd>
                </div>
              )}
              {maxBorrow > 0 && (
                <div className="flex justify-between">
                  <dt className="text-slate-600">Typical max borrow (4.5× income)</dt>
                  <dd className="font-semibold text-accent">{formatPrice(maxBorrow)}</dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
