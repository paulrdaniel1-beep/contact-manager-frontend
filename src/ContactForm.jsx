import { useState } from "react";

function ContactForm({ onAddContact }) {
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newContact = {
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

      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
