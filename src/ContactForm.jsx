import { useState, useEffect } from "react";

function ContactForm({
  selectedContact,
  onAddContact,
  onUpdateContact,
  onDeleteContact,
  clearSelection,
}) {
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [toast, setToast] = useState("");

  useEffect(() => {
    if (selectedContact) {
      setFirstName(selectedContact.firstName);
      setFamilyName(selectedContact.familyName);
      setEmail(selectedContact.email);
      setPhone(selectedContact.phone);
    } else {
      setFirstName("");
      setFamilyName("");
      setEmail("");
      setPhone("");
    }
  }, [selectedContact]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleSave = () => {
    const contact = { firstName, familyName, email, phone };

    if (selectedContact) {
      onUpdateContact({ ...contact, id: selectedContact.id });
      showToast("Contact updated");
    } else {
      onAddContact(contact);
      showToast("Contact added");
    }

    clearSelection();
  };

  const handleDelete = () => {
    if (!selectedContact) return;
    onDeleteContact(selectedContact.id);
    showToast("Contact deleted");
  };

  return (
    <div className="contact-card">
      {/* Toast message */}
      {toast && (
        <div
          style={{
            background: "var(--accent-bg)",
            border: "1px solid var(--accent-border)",
            padding: "10px 14px",
            borderRadius: "6px",
            marginBottom: "12px",
            color: "var(--accent)",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          {toast}
        </div>
      )}

      <form>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          placeholder="Family Name"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
        />

        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </form>

      <div style={{ marginTop: "12px" }}>
        <button
          type="button"
          onClick={clearSelection}
          title="Clear the form and start a new contact"
        >
          ➕ Create
        </button>

        <button
          type="button"
          onClick={handleSave}
          title="Save this contact to your database"
        >
          💾 {selectedContact ? "Save" : "Save"}
        </button>

        <button
          type="button"
          disabled={!selectedContact}
          onClick={handleDelete}
          title="Delete the selected contact"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default ContactForm;
