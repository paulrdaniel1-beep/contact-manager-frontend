function ContactsList({ contacts, onSelectContact }) {
  return (
    <div className="all-contacts">
      {contacts.length === 0 && (
        <div style={{ color: "#888", fontStyle: "italic" }}>
          No contacts yet.
        </div>
      )}

      {contacts.map((c) => (
        <div
          key={c.id}
          className="contact-item"
          onClick={() => onSelectContact(c)}
          style={{ cursor: "pointer" }}
        >
          {c.firstName} {c.familyName}
        </div>
      ))}
    </div>
  );
}

export default ContactsList;
