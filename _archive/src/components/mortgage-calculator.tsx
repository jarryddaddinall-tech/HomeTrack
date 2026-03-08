"use client";

import { useState } from "react";
import { mockStampDuty } from "@/lib/mock-pricing";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);
}

interface MortgageCalculatorProps {
  /** Default purchase price (e.g. from property) */
  defaultPrice?: number;
  /** Default deposit if known */
  defaultDeposit?: number;
}

export function MortgageCalculator({ defaultPrice = 0, defaultDeposit = 0 }: MortgageCalculatorProps) {
  const [purchasePrice, setPurchasePrice] = useState(defaultPrice ? String(defaultPrice) : "");
  const [deposit, setDeposit] = useState(defaultDeposit ? String(defaultDeposit) : "");
  const [termYears, setTermYears] = useState("25");
  const [ratePercent, setRatePercent] = useState("5");

  const priceNum = parseInt(purchasePrice.replace(/[^0-9]/g, ""), 10) || 0;
  const depositNum = parseInt(deposit.replace(/[^0-9]/g, ""), 10) || 0;
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

  return (
    <div className="rounded-xl border border-slate-100/80 bg-accent/5 p-4">
      <h3 className="text-sm font-semibold text-slate-700">Mortgage calculator</h3>
      <p className="mt-1 text-xs text-slate-500">
        See what you could borrow and your estimated monthly payment.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="mc-price" className="block text-xs font-medium text-slate-600">
            Purchase price (£)
          </label>
          <input
            id="mc-price"
            type="text"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            placeholder={defaultPrice ? String(defaultPrice) : "e.g. 450000"}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
          />
        </div>
        <div>
          <label htmlFor="mc-deposit" className="block text-xs font-medium text-slate-600">
            Deposit (£)
          </label>
          <input
            id="mc-deposit"
            type="text"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            placeholder={defaultDeposit ? String(defaultDeposit) : "e.g. 50000"}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
          />
        </div>
        <div>
          <label htmlFor="mc-term" className="block text-xs font-medium text-slate-600">
            Term (years)
          </label>
          <input
            id="mc-term"
            type="number"
            min="5"
            max="40"
            value={termYears}
            onChange={(e) => setTermYears(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
          />
        </div>
        <div>
          <label htmlFor="mc-rate" className="block text-xs font-medium text-slate-600">
            Interest rate (%)
          </label>
          <input
            id="mc-rate"
            type="text"
            value={ratePercent}
            onChange={(e) => setRatePercent(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
          />
        </div>
      </div>
      {(loanAmount > 0 || stampDuty > 0) && (
        <dl className="mt-4 space-y-1 border-t border-slate-200 pt-3 text-sm">
          {loanAmount > 0 && (
            <>
              <div className="flex justify-between">
                <dt className="text-slate-600">Loan amount</dt>
                <dd className="font-medium text-slate-900">{formatPrice(loanAmount)}</dd>
              </div>
              {monthlyPayment > 0 && (
                <div className="flex justify-between">
                  <dt className="text-slate-600">Monthly payment</dt>
                  <dd className="font-medium text-slate-900">{formatPrice(monthlyPayment)}</dd>
                </div>
              )}
            </>
          )}
          {stampDuty > 0 && (
            <div className="flex justify-between">
              <dt className="text-slate-600">Stamp duty</dt>
              <dd className="font-medium text-slate-900">{formatPrice(stampDuty)}</dd>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}
