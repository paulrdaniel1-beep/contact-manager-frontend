import packageJson from "../package.json" assert { type: "json" };

function HeaderBar({ theme, toggleTheme }) {
  const version = packageJson.version;

  return (
    <div 
      className="header-bar" 
      style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-start" 
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ margin: 0, lineHeight: "1.2" }}>Contact Manager</h1>
        <span 
          style={{ 
            fontSize: "0.75rem", 
            color: "#888", 
            marginTop: "2px",
            lineHeight: "1"
          }}
        >
          v{version}
        </span>
      </div>

      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );
}

export default HeaderBar;


