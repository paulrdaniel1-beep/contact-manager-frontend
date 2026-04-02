function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="sidebar">
      <ul>
        <li
          className={activeTab === "add" ? "active" : ""}
          onClick={() => setActiveTab("add")}
        >
          Add Contact
        </li>

        <li
          className={activeTab === "edit" ? "active" : ""}
          onClick={() => setActiveTab("edit")}
        >
          Search / Edit Contact
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
