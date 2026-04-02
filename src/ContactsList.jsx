function ContactsList({ contacts }) {
  return (
    <div className="all-contacts">
      <h2>All Contacts</h2>
      <ul>
        {contacts.map((c) => (
          <li key={c.id} className="contact-item">
            {c.firstName} {c.familyName} — {c.email} — {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactsList;
