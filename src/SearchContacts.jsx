import { useState } from "react";

function SearchContacts({ contacts }) {
  const [query, setQuery] = useState("");

  const filtered = contacts.filter((c) => {
    const fullName = `${c.firstName} ${c.familyName}`.toLowerCase();
    const q = query.toLowerCase();

    return (
      fullName.includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q)
    );
  });

  return (
    <div className="search-contacts">
      <input
        type="text"
        placeholder="Search by name, email, or phone..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul className="search-results">
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
