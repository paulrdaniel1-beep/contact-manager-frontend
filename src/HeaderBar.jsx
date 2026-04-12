import packageJson from "../package.json" assert { type: "json" };
import { useUser, UserButton } from "@clerk/clerk-react";

function HeaderBar({ theme, toggleTheme }) {
  const version = packageJson.version;
  const { user } = useUser();

  return (
    <div 
      className="header-bar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: "10px"
      }}
    >
      {/* LEFT SIDE: Title + Version */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <h1 style={{ margin: 0, textAlign: "left" }}>Paul's Toolbox</h1>
        <span
          style={{
            fontSize: "0.75rem",
            color: "#888",
            marginTop: "10px",
            textAlign: "left"
          }}
        >
          v{version}
        </span>
      </div>

      {/* RIGHT SIDE: Username + Logout + Theme Toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {user && (
          <span style={{ fontWeight: "bold" }}>
            {user.firstName} {user.lastName}
          </span>
        )}

        <UserButton afterSignOutUrl="/" />

        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </div>
  );
}

export default HeaderBar;
