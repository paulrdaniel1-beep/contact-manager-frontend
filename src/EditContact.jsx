import { useState } from "react";

function EditContact({ contacts, onUpdateContact }) {
  const [selectedId, setSelectedId] = useState(null);

  const selected = contacts.find((c) => c.id === selectedId);

  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function loadContact(c) {
    setSelectedId(c.id);
    setFirstName(c.firstName || "");
    setFamilyName(c.familyName || "");
    setEmail(c.email || "");
    setPhone(c.phone || "");
  }

  function handleSave(e) {
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
    <div>
      <h2>Edit Contact</h2>

      <ul>
        {contacts.map((c) => {
          const fullName = c.firstName
            ? `${c.firstName} ${c.familyName}`
            : c.name;

          return (
            <li
              key={c.id}
              style={{ cursor: "pointer", marginBottom: "8px" }}
              onClick={() => loadContact(c)}
            >
              {fullName} — {c.email}
            </li>
          );
        })}
      </ul>

      {selected && (
        <form onSubmit={handleSave} style={{ marginTop: "20px" }}>
          <h3>Editing: {firstName} {familyName}</h3>

          <label>First Name:</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label>Family Name:</label>
          <input
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
          />

          <label>Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Phone:</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default EditContact;
