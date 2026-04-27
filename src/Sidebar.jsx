function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="sidebar">
      <ul>
        <li
          className={activeTab === "contacts" ? "active" : ""}
          onClick={() => setActiveTab("contacts")}
        >
          Contacts
        </li>
        <li
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          User Stats
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

