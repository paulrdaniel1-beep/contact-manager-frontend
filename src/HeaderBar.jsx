import packageJson from "../package.json" assert { type: "json" };

function HeaderBar({ theme, toggleTheme }) {
  const version = packageJson.version;

  console.log("VERSION:", version);   // ← Add it right here

  return (
    <div className="header-bar">
      <div>
        <h1>Contact Manager</h1>
        <p style={{ fontSize: "0.75rem", color: "#888", marginTop: "-6px" }}>
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
