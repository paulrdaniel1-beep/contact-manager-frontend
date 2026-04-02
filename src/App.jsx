import { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import SearchContacts from "./SearchContacts";
import EditContact from "./EditContact";
import HeaderBar from "./HeaderBar";
import Sidebar from "./Sidebar";
import ContactsList from "./ContactsList";

const API_BASE = "https://contact-manager-backend-dhl9.onrender.com";

function App() {
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState("add");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetch(`${API_BASE}/contacts`)
      .then((res) => res.json())
      .then((data) =>
        setContacts(
          data.map((c) => ({
            id: c.id,
            firstName: c.first_name,
            familyName: c.family_name,
            email: c.email,
            phone: c.phone
          }))
        )
      )
      .catch((err) => console.error("Failed to load contacts", err));
  }, []);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  function addContact(contact) {
    fetch(`${API_BASE}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: contact.firstName,
        family_name: contact.familyName,
        email: contact.email,
        phone: contact.phone
      }),
    })
      .then((res) => res.json())
      .then((saved) =>
        setContacts((prev) => [
          ...prev,
          {
            id: saved.id,
            firstName: saved.first_name,
            familyName: saved.family_name,
            email: saved.email,
            phone: saved.phone
          }
        ])
      );
  }

  function updateContact(updated) {
    fetch(`${API_BASE}/contacts/${updated.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: updated.firstName,
        family_name: updated.familyName,
        email: updated.email,
        phone: updated.phone
      }),
    })
      .then((res) => res.json())
      .then((saved) =>
        setContacts((prev) =>
          prev.map((c) =>
            c.id === saved.id
              ? {
                  id: saved.id,
                  firstName: saved.first_name,
                  familyName: saved.family_name,
                  email: saved.email,
                  phone: saved.phone
                }
              : c
          )
        )
      );
  }

  return (
    <div className={`app-container ${theme}`}>
      <HeaderBar theme={theme} toggleTheme={toggleTheme} />

      <div className="app-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div style={{ flex: 1 }}>
          {activeTab === "add" && (
            <>
              <div className="tab-content">
                <ContactForm onAddContact={addContact} />
              </div>
              <ContactsList contacts={contacts} />
            </>
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
        </div>
      </div>
    </div>
  );
}

export default App;
