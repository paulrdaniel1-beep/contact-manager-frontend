import { useState } from "react";

function EditContact({ contacts, onUpdateContact, onDeleteContact }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const filtered = contacts.filter((c) => {
    const full = `${c.firstName} ${c.familyName}`.toLowerCase();
    return full.includes(query.toLowerCase());
  });

  function handleSelect(contact) {
    setSelectedId(contact.id);
    setQuery(`${contact.firstName} ${contact.familyName}`);

    setFirstName(contact.firstName);
    setFamilyName(contact.familyName);
    setEmail(contact.email);
    setPhone(contact.phone);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updated = {
      id: selectedId,
      firstName,
      familyName,
      email,
      phone
    };

    onUpdateContact(updated);
  }

  return (
    <div className="edit-contact">
      <label>Search for a contact to edit:</label>

      <div className="combo-container" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Type a name..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedId("");
          }}
          style={{ width: "100%", padding: "8px" }}
        />

        {query && !selectedId && (
          <ul
            className="combo-dropdown"
            style={{
              position: "absolute",
              top: "40px",
              left: 0,
              right: 0,
              maxHeight: "150px",
              overflowY: "auto",
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              zIndex: 10,
              listStyle: "none",
              padding: 0,
              margin: 0
            }}
          >
            {filtered.map((c) => (
              <li
                key={c.id}
                onClick={() => handleSelect(c)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee"
                }}
              >
                {c.firstName} {c.familyName}
              </li>
            ))}

            {filtered.length === 0 && (
              <li style={{ padding: "8px", color: "#777" }}>No matches</li>
            )}
          </ul>
        )}
      </div>

      {selectedId && (
        <form onSubmit={handleSubmit} className="contact-form">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label>Family Name</label>
          <input
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button type="submit">Save Changes</button>

            <button
              type="button"
              style={{ backgroundColor: "#c62828", color: "white" }}
              onClick={() => onDeleteContact(selectedId)}
            >
              Delete Contact
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditContact;
