function ContactsList({ contacts, selectedId, onSelectContact }) {
  return (
    <div className="all-contacts">
      {contacts.length === 0 && (
        <div style={{ color: "#888", fontStyle: "italic" }}>
          No contacts found.
        </div>
      )}

      {contacts.map((c) => (
        <div
          key={c.id}
          className={`contact-item ${selectedId === c.id ? "selected" : ""}`}
          onClick={() => onSelectContact(c)}
        >
          {c.firstName} {c.familyName}
        </div>
      ))}
    </div>
  );
}

export default ContactsList;
