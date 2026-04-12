function ContactsList({ contacts, onSelectContact }) {
  return (
    <div className="all-contacts">
      <h2>All Contacts</h2>

      <ul>
        {contacts.map((c) => (
          <li
            key={c.id}
            className="contact-item"
            onClick={() => onSelectContact(c)}
            style={{ cursor: "pointer" }}
          >
            {c.firstName} {c.familyName} — {c.email} — {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactsList;
