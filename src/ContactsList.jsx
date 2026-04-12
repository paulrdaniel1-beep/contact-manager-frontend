function ContactsList({ contacts, onSelectContact }) {
  return (
    <div className="all-contacts">
      {contacts.map((c) => (
        <div
          key={c.id}
          className="contact-item"
          onClick={() => onSelectContact(c)}
        >
          {c.firstName} {c.familyName}
        </div>
      ))}
    </div>
  );
}

export default ContactsList;

