import { useState } from "react";
import ContactForm from "./ContactForm";
import SearchContacts from "./SearchContacts";
import EditContact from "./EditContact";
import HeaderBar from "./HeaderBar";
import Sidebar from "./Sidebar";

function App() {
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState("add");
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  function addContact(contact) {
    setContacts([...contacts, contact]);
  }

  function updateContact(updated) {
    setContacts((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  }

  return (
    <div className={`app-container ${theme}`}>
      <HeaderBar theme={theme} toggleTheme={toggleTheme} />

      <div className="app-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div style={{ flex: 1 }}>
          {activeTab === "add" && (
            <div className="tab-content">
              <ContactForm onAddContact={addContact} />
            </div>
          )}

          {activeTab === "edit" && (
            <div className="tab-content">
              <EditContact contacts={contacts} onUpdateContact={updateContact} />
            </div>
          )}

          {activeTab === "search" && (
            <div className="tab-content">
              <SearchContacts contacts={contacts} />
            </div>
          )}

          {activeTab !== "edit" && (
            <div className="all-contacts">
              <h2>All Contacts</h2>
              <ul>
                {contacts.map((c) => {
                  const fullName = c.firstName
                    ? `${c.firstName} ${c.familyName}`
                    : c.name;

                  return (
                    <li key={c.id} className="contact-item">
                      <span>{fullName} — {c.email} — {c.phone}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
