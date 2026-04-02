function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="sidebar">
      <h2>Contacts</h2>

      <button
        className={activeTab === "add" ? "active" : ""}
        onClick={() => setActiveTab("add")}
      >
        Add Contact
      </button>

      <button
        className={activeTab === "edit" ? "active" : ""}
        onClick={() => setActiveTab("edit")}
      >
        Edit Contact
      </button>

      <button
        className={activeTab === "search" ? "active" : ""}
        onClick={() => setActiveTab("search")}
      >
        Search Contacts
      </button>
    </div>
  );
}

export default Sidebar;
