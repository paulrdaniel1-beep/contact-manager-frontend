import { useState } from "react";

function SearchContacts({ contacts }) {
  const [query, setQuery] = useState("");

  const filtered = contacts.filter((c) => {
    const fullName = `${c.firstName} ${c.familyName}`.toLowerCase();
    return fullName.includes(query.toLowerCase());
  });

  return (
    <div>
      <h2>Search Contacts</h2>

      <form>
        <input
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <ul>
        {filtered.map((c) => (
          <li key={c.id}>
            {c.firstName} {c.familyName} — {c.email} — {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchContacts;
