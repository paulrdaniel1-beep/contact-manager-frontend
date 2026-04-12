function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="sidebar">
      <ul>
        <li
          className={activeTab === "contacts" ? "active" : ""}
          onClick={setActiveTab}
        >
          Contacts
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

