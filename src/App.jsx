import { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import SearchContacts from "./SearchContacts";
import EditContact from "./EditContact";
import HeaderBar from "./HeaderBar";
import Sidebar from "./Sidebar";

const API_BASE = "https://contact-manager-backend-dhl9.onrender.com";

function App() {
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState("add");
  const [theme, setTheme] = useState("light");

  // Load contacts from backend on startup
  useEffect(() => {
    fetch(`${API_BASE}/contacts`)
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error("Failed to load contacts", err));
  }, []);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  // Add a contact (POST)
  function addContact(contact) {
    fetch(`${API_BASE}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((saved) => setContacts((prev) => [...prev, saved]))
      .catch((err) => console.error("Failed to add contact", err));
  }

  // Update a contact (PUT)
  function updateContact(updated) {
    fetch(`${API_BASE}/contacts/${updated.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((saved) =>
        setContacts((prev) =>
          prev.map((c) => (c.id === saved.id ? saved : c))
        )
      )
      .catch((err) => console.error("Failed to update contact", err));
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
                  const fullName = c.first_name
                    ? `${c.first_name} ${c.family_name}`
                    : c.firstName
                    ? `${c.firstName} ${c.familyName}`
                    : c.name;

                  return (
                    <li key={c.id} className="contact-item">
                      <span>
                        {fullName} — {c.email} — {c.phone}
                      </span>
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
