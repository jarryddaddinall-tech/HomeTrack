export type TransactionType = "selling" | "buying";

export type TransactionStage =
  | "offer_accepted"
  | "survey_searches"
  | "mortgage_offer"
  | "contracts_exchanged"
  | "completion";

export interface Property {
  id: string;
  address: string;
  postcode: string;
  type: TransactionType;
  price: number;
  status: TransactionStage;
  offerAcceptedDate?: string;
  targetCompletionDate?: string;
  solicitor?: string;
  agent?: string;
  progress: number; // 0-100
}

export const STAGE_LABELS: Record<TransactionStage, string> = {
  offer_accepted: "Offer accepted",
  survey_searches: "Survey & searches",
  mortgage_offer: "Mortgage offer",
  contracts_exchanged: "Contracts exchanged",
  completion: "Completion",
};

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    address: "24 Oak Lane",
    postcode: "SW4 2PQ",
    type: "selling",
    price: 485000,
    status: "contracts_exchanged",
    offerAcceptedDate: "2025-01-15",
    targetCompletionDate: "2025-03-28",
    solicitor: "Barton & Co Solicitors",
    agent: "Knight Frank",
    progress: 80,
  },
  {
    id: "prop-2",
    address: "7 Riverside Gardens",
    postcode: "W6 9AB",
    type: "buying",
    price: 620000,
    status: "survey_searches",
    offerAcceptedDate: "2025-02-10",
    targetCompletionDate: "2025-05-02",
    solicitor: "Taylor & Wright",
    agent: "Savills",
    progress: 35,
  },
];

export function getPropertyById(id: string): Property | undefined {
  return MOCK_PROPERTIES.find((p) => p.id === id);
}
