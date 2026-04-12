import { useState, useEffect } from "react";
import HeaderBar from "./HeaderBar";
import Sidebar from "./Sidebar";
import ContactForm from "./ContactForm";
import ContactsList from "./ContactsList";

import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
} from "./api";

function App() {
  const [theme, setTheme] = useState("light");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Load contacts from backend
  useEffect(() => {
    fetchContacts().then(setContacts);
  }, []);

  const handleAdd = async (contact) => {
    const newContact = await createContact(contact);
    setContacts([...contacts, newContact]);
  };

  const handleUpdate = async (contact) => {
    const updated = await updateContact(contact);
    setContacts(
      contacts.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    setContacts(contacts.filter((c) => c.id !== id));
    setSelectedContact(null);
  };

  return (
    <div className={`app-container ${theme}`}>
      <HeaderBar theme={theme} toggleTheme={toggleTheme} />

      <div className="app-layout">
        <Sidebar />

        <div className="tab-content">
          <h2>{selectedContact ? "Edit Contact" : "Create New"}</h2>

          <ContactForm
            selectedContact={selectedContact}
            onAddContact={handleAdd}
            onUpdateContact={handleUpdate}
            onDeleteContact={handleDelete}
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
