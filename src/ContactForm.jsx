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

  const handleSave = () => {
    const contact = { firstName, familyName, email, phone };

    if (selectedContact) {
      onUpdateContact({ ...contact, id: selectedContact.id });
    } else {
      onAddContact(contact);
    }

    clearSelection();
  };

  return (
    <div>
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

      {/* BUTTONS BELOW THE FORM */}
      <div style={{ marginTop: "12px" }}>
        <button onClick={clearSelection}>Create New</button>

        <button onClick={handleSave}>
          {selectedContact ? "Save Changes" : "Save New"}
        </button>

        <button
          disabled={!selectedContact}
          onClick={() => onDeleteContact(selectedContact?.id)}
        >
          Delete Contact
        </button>
      </div>
    </div>
  );
}

export default ContactForm;
