import { useState } from "react";

function ContactForm({ onAddContact }) {
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newContact = {
      id: crypto.randomUUID(),
      firstName,
      familyName,
      email,
      phone
    };

    onAddContact(newContact);

    setFirstName("");
    setFamilyName("");
    setEmail("");
    setPhone("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Add Contact</h2>

      <div>
        <label>First Name:</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label>Family Name:</label>
        <input
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
      </div>

      <div>
        <label>Phone:</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;

