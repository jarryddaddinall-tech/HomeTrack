export type TransactionType = "selling" | "buying";

export type TransactionStage =
  | "offer_accepted"
  | "survey_searches"
  | "mortgage_offer"
  | "contracts_exchanged"
  | "completion";

export type DocumentStatus = "pending" | "received" | "signed";

export interface PropertyDocument {
  id: string;
  name: string;
  type: string;
  status: DocumentStatus;
  url?: string;
  notes?: string;
}

export interface Property {
  id: string;
  address: string;
  town?: string;
  postcode: string;
  type: TransactionType;
  price: number;
  /** Optional main image URL for listing/card display */
  imageUrl?: string;
  beds?: number;
  baths?: number;
  propertyType?: string;
  status: TransactionStage;
  solicitorCost?: number;
  offerAcceptedDate?: string;
  targetCompletionDate?: string;
  exchangeDate?: string;
  completionDate?: string;
  solicitor?: string;
  solicitorEmail?: string;
  solicitorPhone?: string;
  solicitorCaseRef?: string;
  agent?: string;
  agentEmail?: string;
  agentPhone?: string;
  mortgageOfferExpiry?: string; // for buyers
  depositAmount?: number;
  progress: number; // 0-100
  documents?: PropertyDocument[];
}

export const STAGE_LABELS: Record<TransactionStage, string> = {
  offer_accepted: "Offer accepted",
  survey_searches: "Survey & searches",
  mortgage_offer: "Mortgage offer",
  contracts_exchanged: "Contracts exchanged",
  completion: "Completion",
};

export const STAGE_DETAILS: Record<
  TransactionStage,
  { label: string; description: string; typicalDuration?: string }
> = {
  offer_accepted: {
    label: "Offer accepted",
    description: "Your offer has been accepted. The sale or purchase is agreed in principle.",
    typicalDuration: "1–2 weeks",
  },
  survey_searches: {
    label: "Survey & searches",
    description: "Your surveyor visits the property; local searches are ordered. This checks for issues and legal matters.",
    typicalDuration: "2–4 weeks",
  },
  mortgage_offer: {
    label: "Mortgage offer",
    description: "Your lender has approved your mortgage. The offer is valid for a set period—usually 3–6 months.",
    typicalDuration: "2–6 weeks",
  },
  contracts_exchanged: {
    label: "Contracts exchanged",
    description: "Both parties have signed. The sale is legally binding. Completion date is set.",
    typicalDuration: "1–2 weeks to completion",
  },
  completion: {
    label: "Completion",
    description: "Keys are handed over. You're in. Congratulations!",
    typicalDuration: "—",
  },
};

export const DOCUMENT_TYPES = [
  "Survey report",
  "Local searches",
  "Mortgage offer",
  "Draft contract",
  "Signed contract",
  "Transfer deed",
  "Other",
] as const;

const STAGE_ORDER: TransactionStage[] = [
  "offer_accepted",
  "survey_searches",
  "mortgage_offer",
  "contracts_exchanged",
  "completion",
];

export function getProgressFromStage(stage: TransactionStage): number {
  const index = STAGE_ORDER.indexOf(stage);
  return Math.round(((index + 1) / STAGE_ORDER.length) * 100);
}

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    address: "24 Oak Lane",
    town: "Clapham",
    postcode: "SW4 2PQ",
    type: "selling",
    price: 485000,
    status: "contracts_exchanged",
    offerAcceptedDate: "2025-01-15",
    targetCompletionDate: "2025-03-28",
    exchangeDate: "2025-03-15",
    solicitor: "Barton & Co Solicitors",
    solicitorEmail: "enquiries@barton.co.uk",
    solicitorPhone: "020 7123 4567",
    solicitorCaseRef: "BART-2025-001",
    agent: "Knight Frank",
    agentEmail: "clapham@knightfrank.com",
    agentPhone: "020 7591 1234",
    progress: 80,
    solicitorCost: 1180,
    documents: [
      { id: "d1", name: "Draft contract", type: "Draft contract", status: "signed", notes: "Signed 15 Mar" },
      { id: "d2", name: "Transfer deed", type: "Transfer deed", status: "pending" },
    ],
  },
  {
    id: "prop-2",
    address: "7 Riverside Gardens",
    town: "Hammersmith",
    postcode: "W6 9AB",
    type: "buying",
    price: 620000,
    status: "survey_searches",
    offerAcceptedDate: "2025-02-10",
    targetCompletionDate: "2025-05-02",
    solicitor: "Taylor & Wright",
    solicitorEmail: "conveyancing@taylorwright.co.uk",
    solicitorPhone: "020 7946 1234",
    solicitorCaseRef: "TW-2025-0892",
    agent: "Savills",
    agentEmail: "hammersmith@savills.com",
    agentPhone: "020 7498 5678",
    mortgageOfferExpiry: "2025-06-15",
    depositAmount: 62000,
    progress: 35,
    solicitorCost: 1580,
    documents: [
      { id: "d3", name: "Survey report", type: "Survey report", status: "pending" },
      { id: "d4", name: "Local searches", type: "Local searches", status: "pending" },
    ],
  },
];

// In-memory store - replace with real DB (Firebase/Firestore) for production
let propertiesStore: Property[] = [...INITIAL_PROPERTIES];

export function getAllProperties(): Property[] {
  return [...propertiesStore];
}

export function getPropertyById(id: string): Property | undefined {
  return propertiesStore.find((p) => p.id === id);
}

export function addProperty(property: Omit<Property, "id" | "progress"> & { solicitorCost?: number }): Property {
  const id = `prop-${Date.now()}`;
  const progress = getProgressFromStage(property.status);
  const newProperty: Property = {
    ...property,
    id,
    progress,
    documents: property.documents ?? [],
    solicitorCost: property.solicitorCost,
  };
  propertiesStore.push(newProperty);
  return newProperty;
}

export function updateProperty(id: string, updates: Partial<Property>): Property | undefined {
  const index = propertiesStore.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  const existing = propertiesStore[index];
  const updated = { ...existing, ...updates };
  if (updates.status) {
    updated.progress = getProgressFromStage(updates.status);
  }
  propertiesStore[index] = updated;
  return updated;
}

export function deleteProperty(id: string): boolean {
  const index = propertiesStore.findIndex((p) => p.id === id);
  if (index === -1) return false;
  propertiesStore.splice(index, 1);
  return true;
}

export function addDocument(propertyId: string, doc: Omit<PropertyDocument, "id">): PropertyDocument | undefined {
  const property = getPropertyById(propertyId);
  if (!property) return undefined;
  const newDoc: PropertyDocument = {
    ...doc,
    id: `doc-${Date.now()}`,
  };
  const documents = property.documents ?? [];
  documents.push(newDoc);
  updateProperty(propertyId, { documents });
  return newDoc;
}

export function updateDocument(
  propertyId: string,
  docId: string,
  updates: Partial<PropertyDocument>
): PropertyDocument | undefined {
  const property = getPropertyById(propertyId);
  if (!property) return undefined;
  const documents = property.documents ?? [];
  const index = documents.findIndex((d) => d.id === docId);
  if (index === -1) return undefined;
  documents[index] = { ...documents[index], ...updates };
  updateProperty(propertyId, { documents });
  return documents[index];
}
