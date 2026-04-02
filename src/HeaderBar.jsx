function HeaderBar({ theme, toggleTheme }) {
  return (
    <div className="header-bar">
      <h1>Contact Manager</h1>

      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );
}

export default HeaderBar;