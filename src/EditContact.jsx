import { useState } from "react";

function EditContact({ contacts, onUpdateContact }) {
  const [selectedId, setSelectedId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSelect(e) {
    const id = e.target.value;
    setSelectedId(id);

    const contact = contacts.find((c) => String(c.id) === String(id));

    if (contact) {
      setFirstName(contact.firstName);
      setFamilyName(contact.familyName);
      setEmail(contact.email);
      setPhone(contact.phone);
    }
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
      <label>Select a contact to edit:</label>

      {/* Scrollable combo-box style list */}
      <select
        value={selectedId}
        onChange={handleSelect}
        size="6"
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        <option value="">-- Choose a contact --</option>
        {contacts.map((c) => (
          <option key={c.id} value={c.id}>
            {c.firstName} {c.familyName}
          </option>
        ))}
      </select>

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

          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default EditContact;
