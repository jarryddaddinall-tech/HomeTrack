/**
 * Shortlist = properties user is considering buying (from Rightmove, Zoopla, etc.)
 */

export type ListingSource = "Rightmove" | "Zoopla" | "OnTheMarket" | "PrimeLocation";

export interface ShortlistItem {
  id: string;
  projectId: string;
  address: string;
  town: string;
  postcode: string;
  price: number;
  beds?: number;
  baths?: number;
  propertyType?: string;
  source: ListingSource;
  sourceUrl?: string;
  createdAt: string;
}

let shortlistStore: ShortlistItem[] = [];

export function getShortlistByProject(projectId: string): ShortlistItem[] {
  return shortlistStore.filter((s) => s.projectId === projectId);
}

export function addToShortlist(item: Omit<ShortlistItem, "id" | "createdAt">): ShortlistItem {
  const newItem: ShortlistItem = {
    ...item,
    id: `short-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  shortlistStore.push(newItem);
  return newItem;
}

export function removeFromShortlist(id: string): boolean {
  const index = shortlistStore.findIndex((s) => s.id === id);
  if (index === -1) return false;
  shortlistStore.splice(index, 1);
  return true;
}
