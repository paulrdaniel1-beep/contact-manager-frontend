// api.js
import { getToken } from "@clerk/clerk-react";

const BASE_URL = "https://contact-manager-backend-dhl9.onrender.com";

// Convert snake_case → camelCase
function toCamel(row) {
  return {
    id: row.id,
    firstName: row.first_name,
    familyName: row.family_name,
    email: row.email,
    phone: row.phone,
  };
}

// Convert camelCase → snake_case
function toSnake(contact) {
  return {
    first_name: contact.firstName,
    family_name: contact.familyName,
    email: contact.email,
    phone: contact.phone,
  };
}

// Helper: fetch with Clerk token
async function authedFetch(url, options = {}) {
  const token = await getToken();

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export async function fetchContacts() {
  const res = await authedFetch(`${BASE_URL}/contacts`);
  const data = await res.json();
  return data.map(toCamel);
}

export async function createContact(contact) {
  const res = await authedFetch(`${BASE_URL}/contacts`, {
    method: "POST",
    body: JSON.stringify(toSnake(contact)),
  });
  return toCamel(await res.json());
}

export async function updateContact(contact) {
  const res = await authedFetch(`${BASE_URL}/contacts/${contact.id}`, {
    method: "PUT",
    body: JSON.stringify(toSnake(contact)),
  });
  return toCamel(await res.json());
}

export async function deleteContact(id) {
  await authedFetch(`${BASE_URL}/contacts/${id}`, {
    method: "DELETE",
  });
  return true;
}
