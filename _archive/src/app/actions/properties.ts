"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { mockSolicitorCost } from "@/lib/mock-pricing";
import { linkPropertyToProject } from "@/lib/projects";
import {
  addProperty,
  updateProperty,
  deleteProperty,
  addDocument,
  updateDocument,
  type Property,
  type TransactionStage,
  type PropertyDocument,
  type DocumentStatus,
} from "@/lib/properties";

export async function createProperty(formData: FormData) {
  const address = formData.get("address") as string;
  const town = (formData.get("town") as string) || undefined;
  const postcode = formData.get("postcode") as string;
  const formType = (formData.get("type") as "selling" | "buying") ?? "buying";
  const projectId = (formData.get("projectId") as string) || undefined;
  const price = parseInt(formData.get("price") as string, 10) || 0;
  const status = (formData.get("status") as TransactionStage) ?? "offer_accepted";
  const offerAcceptedDate = (formData.get("offerAcceptedDate") as string) || undefined;
  const targetCompletionDate = (formData.get("targetCompletionDate") as string) || undefined;
  const solicitor = (formData.get("solicitor") as string) || undefined;
  const solicitorEmail = (formData.get("solicitorEmail") as string) || undefined;
  const solicitorPhone = (formData.get("solicitorPhone") as string) || undefined;
  const solicitorCaseRef = (formData.get("solicitorCaseRef") as string) || undefined;
  const agent = (formData.get("agent") as string) || undefined;
  const agentEmail = (formData.get("agentEmail") as string) || undefined;
  const agentPhone = (formData.get("agentPhone") as string) || undefined;
  const mortgageOfferExpiry = (formData.get("mortgageOfferExpiry") as string) || undefined;
  const depositAmount = formData.get("depositAmount")
    ? parseInt(formData.get("depositAmount") as string, 10)
    : undefined;

  if (!address?.trim()) {
    throw new Error("Address is required");
  }

  const transactionType = formType;
  const solicitorCost = mockSolicitorCost(price, transactionType);

  const property = addProperty({
    address: address.trim(),
    town: town?.trim() || undefined,
    postcode: (postcode || "").trim() || "—",
    type: transactionType,
    price,
    status,
    offerAcceptedDate: offerAcceptedDate || undefined,
    targetCompletionDate: targetCompletionDate || undefined,
    solicitor: solicitor || undefined,
    solicitorEmail: solicitorEmail || undefined,
    solicitorPhone: solicitorPhone || undefined,
    solicitorCaseRef: solicitorCaseRef || undefined,
    agent: agent || undefined,
    agentEmail: agentEmail || undefined,
    agentPhone: agentPhone || undefined,
    mortgageOfferExpiry: mortgageOfferExpiry || undefined,
    depositAmount,
    solicitorCost,
  });

  if (projectId && (transactionType === "selling" || transactionType === "buying")) {
    linkPropertyToProject(projectId, property.id, transactionType);
  }

  revalidatePath("/dashboard");
  if (projectId) revalidatePath(`/dashboard/project/${projectId}`);
  redirect(projectId ? `/dashboard/project/${projectId}` : `/dashboard/property/${property.id}`);
}

export async function updatePropertyAction(id: string, formData: FormData) {
  const updates: Partial<Property> = {};
  const fields = [
    "address",
    "town",
    "postcode",
    "status",
    "offerAcceptedDate",
    "targetCompletionDate",
    "exchangeDate",
    "completionDate",
    "solicitor",
    "solicitorEmail",
    "solicitorPhone",
    "solicitorCaseRef",
    "agent",
    "agentEmail",
    "agentPhone",
    "mortgageOfferExpiry",
    "depositAmount",
  ] as const;

  for (const field of fields) {
    const value = formData.get(field);
    if (value !== null && value !== "") {
      if (field === "status") {
        updates[field] = value as TransactionStage;
      } else if (field === "depositAmount") {
        updates[field] = parseInt(value as string, 10);
      } else {
        (updates as Record<string, unknown>)[field] = value;
      }
    }
  }

  const price = formData.get("price");
  if (price) updates.price = parseInt(price as string, 10);

  const result = updateProperty(id, updates);
  if (!result) throw new Error("Property not found");

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/property/${id}`);
  redirect(`/dashboard/property/${id}`);
}

export async function deletePropertyAction(id: string) {
  const ok = deleteProperty(id);
  if (!ok) throw new Error("Property not found");
  revalidatePath("/dashboard");
}

export async function addDocumentAction(
  propertyId: string,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const status = (formData.get("status") as DocumentStatus) ?? "pending";
  const url = (formData.get("url") as string) || undefined;
  const notes = (formData.get("notes") as string) || undefined;

  if (!name?.trim()) throw new Error("Document name is required");

  const doc = addDocument(propertyId, {
    name: name.trim(),
    type: type || "Other",
    status,
    url,
    notes,
  });

  if (!doc) throw new Error("Property not found");

  revalidatePath(`/dashboard/property/${propertyId}`);
}

export async function updateDocumentAction(
  propertyId: string,
  docId: string,
  formData: FormData
) {
  const updates: Partial<PropertyDocument> = {};
  const status = formData.get("status") as DocumentStatus | null;
  const url = formData.get("url") as string | null;
  const notes = formData.get("notes") as string | null;
  if (status) updates.status = status;
  if (url !== null) updates.url = url || undefined;
  if (notes !== null) updates.notes = notes || undefined;

  const result = updateDocument(propertyId, docId, updates);
  if (!result) throw new Error("Document not found");

  revalidatePath(`/dashboard/property/${propertyId}`);
}
