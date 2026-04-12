import packageJson from "../package.json" assert { type: "json" };

function HeaderBar({ theme, toggleTheme }) {
  const version = packageJson.version;

  return (
    <div className="header-bar">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ margin: 0 }}>Contact Manager</h1>
        <p style={{ 
          fontSize: "0.75rem", 
          color: "#888", 
          margin: 0, 
          marginTop: "-4px" 
        }}>
          v{version}
        </p>
      </div>

      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );
}

export default HeaderBar;

