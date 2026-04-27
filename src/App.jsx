import { useState, useEffect } from "react";
import "./App.css";
import HeaderBar from "./HeaderBar";
import Sidebar from "./Sidebar";
import ContactForm from "./ContactForm";
import ContactsList from "./ContactsList";

import {
  fetchContacts,
  fetchContact,
  createContact,
  updateContact,
  deleteContact,
} from "./api";

import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

function App() {
  const [theme, setTheme] = useState("light");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [search, setSearch] = useState("");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    fetchContacts().then(setContacts);
  }, []);

  // Refresh contacts when window gains focus (for multi-device updates)
  useEffect(() => {
    const handleFocus = () => {
      fetchContacts().then(setContacts);
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const filteredContacts = contacts
    .filter((c) => {
      const full = `${c.firstName} ${c.familyName}`.toLowerCase();
      return full.includes(search.toLowerCase());
    })
    .sort((a, b) => {
      const last = a.familyName.localeCompare(b.familyName);
      return last !== 0 ? last : a.firstName.localeCompare(b.firstName);
    });

  const handleAdd = async (contact) => {
    const newContact = await createContact(contact);
    setContacts([...contacts, newContact]);
  };

  const handleUpdate = async (contact) => {
    const updated = await updateContact(contact);
    setContacts(
      contacts.map((c) => (c.id === updated.id ? updated : c))
    );
    if (selectedContact && selectedContact.id === updated.id) {
      setSelectedContact(updated);
    }
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    setContacts(contacts.filter((c) => c.id !== id));
    setSelectedContact(null);
  };

  return (
    <>
      {/* Only show the app when signed in */}
      <SignedIn>
        <div className={`app-container ${theme}`}>
          <HeaderBar theme={theme} toggleTheme={toggleTheme} />

          <div className="app-layout">
            <Sidebar />

            <div className="tab-content">
              <h2>{selectedContact ? "Contact" : "Create New"}</h2>

              <ContactForm
                selectedContact={selectedContact}
                onAddContact={handleAdd}
                onUpdateContact={handleUpdate}
                onDeleteContact={handleDelete}
                clearSelection={() => setSelectedContact(null)}
              />

              {/* SEARCH + TITLE */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <h3 style={{ margin: 0 }}>All Contacts</h3>

                <div style={{ position: "relative", width: "100%", maxWidth: "270px", marginTop: "10px" }}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      padding: "6px 32px 6px 10px",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />

                  {search && (
                    <span
                      onClick={() => setSearch("")}
                      title="Clear search"
                      style={{
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "16px",
                        color: "var(--text)",
                      }}
                    >
                      ×
                    </span>
                  )}
                </div>
              </div>

              <ContactsList
                contacts={filteredContacts}
                selectedId={selectedContact?.id}
                onSelectContact={async (c) => {
                  try {
                    const [latest, allContacts] = await Promise.all([
                      fetchContact(c.id),
                      fetchContacts()
                    ]);
                    setContacts(allContacts);
                    setSelectedContact(latest);
                  } catch (error) {
                    console.error("Failed to fetch contact:", error);
                    // Fallback to local data
                    setSelectedContact(c);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </SignedIn>

      {/* Show Clerk sign-in screen when logged out */}
      <SignedOut>
        <SignIn />
      </SignedOut>
    </>
  );
}

export default App;
