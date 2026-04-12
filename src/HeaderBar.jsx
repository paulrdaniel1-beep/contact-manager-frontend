import packageJson from "../package.json" assert { type: "json" };

function HeaderBar({ theme, toggleTheme }) {
  const version = packageJson.version;

  return (
    <div className="header-bar">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h1 style={{ margin: 0, textAlign: "left" }}>Contact Manager</h1>
        <span
          style={{
            fontSize: "0.75rem",
            color: "#888",
            marginTop: "10px",
            textAlign: "left",
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



