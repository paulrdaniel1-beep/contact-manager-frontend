import { useState } from "react";
import Sidebar from "./Sidebar";
import ContactForm from "./ContactForm";
import ContactsList from "./ContactsList";

function App() {
  const [activeTab, setActiveTab] = useState("contacts");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const addContact = (contact) => {
    setContacts([...contacts, { ...contact, id: Date.now() }]);
  };

  const updateContact = (updated) => {
    setContacts(
      contacts.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
    setSelectedContact(null);
  };

  return (
    <div className="app-container">
      <div className="app-layout">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={() => {
            setActiveTab("contacts");
            setSelectedContact(null);
          }}
        />

        <div className="tab-content">
          <h2>{selectedContact ? "Edit Contact" : "Create New"}</h2>

          <ContactForm
            selectedContact={selectedContact}
            onAddContact={addContact}
            onUpdateContact={updateContact}
            onDeleteContact={deleteContact}
            clearSelection={() => setSelectedContact(null)}
          />

          <h3>All Contacts</h3>
          <ContactsList
            contacts={contacts}
            onSelectContact={(c) => setSelectedContact(c)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

