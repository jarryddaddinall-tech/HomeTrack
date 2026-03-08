"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { linkPropertyToProject } from "@/lib/projects";
import { addProperty } from "@/lib/properties";
import { mockSolicitorCost } from "@/lib/mock-pricing";
import type { PropertyListing } from "@/lib/mock-property-lookup";

export async function addSellingPropertyFromLookup(projectId: string, listing: PropertyListing) {
  const solicitorCost = mockSolicitorCost(listing.price, "selling");

  const property = addProperty({
    address: listing.address,
    town: listing.town,
    postcode: listing.postcode,
    type: "selling",
    price: listing.price,
    beds: listing.beds,
    baths: listing.baths,
    propertyType: listing.propertyType,
    status: "offer_accepted",
    solicitorCost,
  });

  linkPropertyToProject(projectId, property.id, "selling");

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/project/${projectId}`);
  redirect(`/dashboard/project/${projectId}`);
}
