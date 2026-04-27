// api.js

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

// Basic fetch wrapper (no Clerk token)
async function apiFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
}

export async function fetchContacts() {
  const res = await apiFetch(`${BASE_URL}/contacts`);
  const data = await res.json();
  return data.map(toCamel);
}

export async function fetchContact(id) {
  const res = await apiFetch(`${BASE_URL}/contacts/${id}`);
  return toCamel(await res.json());
}

function toCamelUser(row) {
  return {
    userId: row.user_id,
    firstName: row.first_name,
    lastName: row.last_name,
    loginCount: row.login_count,
    lastLogin: row.last_login,
  };
}

function toSnakeUser(user) {
  const payload = {
    first_name: user.firstName,
    last_name: user.lastName,
  };

  if (user.userId) {
    payload.user_id = user.userId;
  }

  if (user.loginCount != null) {
    payload.login_count = user.loginCount;
  }

  if (user.lastLogin) {
    payload.last_login = user.lastLogin;
  }

  return payload;
}

export async function fetchUserStats() {
  const res = await apiFetch(`${BASE_URL}/user-stats`);
  const data = await res.json();
  return data.map((user) => ({
    userId: user.user_id,
    firstName: user.first_name,
    lastName: user.last_name,
    loginCount: user.login_count,
    lastLogin: user.last_login,
  }));
}

export async function createUser(user) {
  const res = await apiFetch(`${BASE_URL}/user-logins`, {
    method: "POST",
    body: JSON.stringify(toSnakeUser(user)),
  });
  return toCamelUser(await res.json());
}

export async function createContact(contact) {
  const res = await apiFetch(`${BASE_URL}/contacts`, {
    method: "POST",
    body: JSON.stringify(toSnake(contact)),
  });
  return toCamel(await res.json());
}

export async function updateContact(contact) {
  const res = await apiFetch(`${BASE_URL}/contacts/${contact.id}`, {
    method: "PUT",
    body: JSON.stringify(toSnake(contact)),
  });
  return toCamel(await res.json());
}

export async function deleteContact(id) {
  await apiFetch(`${BASE_URL}/contacts/${id}`, {
    method: "DELETE",
  });
  return true;
}

