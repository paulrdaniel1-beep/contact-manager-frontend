import { useState, useEffect } from "react";

function ContactForm({ onAddContact, prefill }) {
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Update form when prefill changes
  useEffect(() => {
    if (prefill) {
      setFirstName(prefill.firstName || "");
      setFamilyName(prefill.familyName || "");
      setEmail(prefill.email || "");
      setPhone(prefill.phone || "");
    }
  }, [prefill]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddContact({
      firstName,
      familyName,
      email,
      phone
    });

    setFirstName("");
    setFamilyName("");
    setEmail("");
    setPhone("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Contact</h2>

      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Family Name"
        value={familyName}
        onChange={(e) => setFamilyName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;

