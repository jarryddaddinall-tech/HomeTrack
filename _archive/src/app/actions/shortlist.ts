"use server";

import { revalidatePath } from "next/cache";
import { addToShortlist, removeFromShortlist as removeFromShortlistStore, getShortlistByProject } from "@/lib/shortlist";
import type { AIPropertyResult } from "@/lib/mock-ai-property";

export async function addToShortlistAction(projectId: string, result: AIPropertyResult) {
  addToShortlist({
    projectId,
    address: result.address,
    town: result.town,
    postcode: result.postcode,
    price: result.price,
    beds: result.beds,
    baths: result.baths,
    propertyType: result.propertyType,
    source: result.source,
    sourceUrl: result.sourceUrl,
  });
  revalidatePath(`/dashboard/project/${projectId}`);
}

export async function removeFromShortlistAction(projectId: string, itemId: string) {
  removeFromShortlistStore(itemId);
  revalidatePath(`/dashboard/project/${projectId}`);
}

export async function getShortlist(projectId: string) {
  return getShortlistByProject(projectId);
}
