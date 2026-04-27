import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { fetchUserStats, createUser } from "./api";

function UserStats() {
  const { user } = useUser();
  const [userStats, setUserStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const refreshStats = async () => {
    setLoading(true);
    try {
      const data = await fetchUserStats();
      setUserStats(data);
    } catch (fetchError) {
      console.error("Failed to fetch user stats:", fetchError);
      setError("Failed to load user stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshStats();
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 4000);
  };

  const handleCreateFromClerk = async () => {
    if (!user) {
      showError("No signed-in user available from Clerk.");
      return;
    }

    try {
      await createUser({
        userId: user.id,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
      showMessage("User created from Clerk login.");
      refreshStats();
    } catch (createError) {
      console.error("Failed to create user:", createError);
      showError("Unable to create user. See console for details.");
    }
  };

  const handleCreateManual = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      showError("First name and last name are required.");
      return;
    }

    try {
      await createUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      showMessage("User created.");
      refreshStats();
      setFirstName(user?.firstName || "");
      setLastName(user?.lastName || "");
    } catch (createError) {
      console.error("Failed to create user:", createError);
      showError("Unable to create user. See console for details.");
    }
  };

  if (loading) {
    return <div>Loading user stats...</div>;
  }

  return (
    <div>
      <h2>User Login Statistics</h2>

      {(message || error) && (
        <div
          style={{
            marginBottom: "14px",
            padding: "10px 14px",
            borderRadius: "6px",
            border: `1px solid ${error ? "var(--danger)" : "var(--accent-border)"}`,
            background: error ? "rgba(255, 220, 220, 0.9)" : "var(--accent-bg)",
            color: error ? "var(--danger)" : "var(--accent)",
          }}
        >
          {error || message}
        </div>
      )}

      <div className="contact-card" style={{ marginBottom: "20px" }}>
        <h3>Create New User</h3>
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </form>

        <div style={{ marginTop: "12px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button type="button" onClick={handleCreateManual}>
            ➕ Create User
          </button>
          <button type="button" onClick={handleCreateFromClerk} title="Create from the current Clerk login profile">
            🔒 Create from Clerk
          </button>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid var(--border)", padding: "8px" }}>User</th>
            <th style={{ border: "1px solid var(--border)", padding: "8px" }}>Login Count</th>
            <th style={{ border: "1px solid var(--border)", padding: "8px" }}>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {userStats.map((user) => (
            <tr key={user.userId}>
              <td style={{ border: "1px solid var(--border)", padding: "8px" }}>{user.firstName} {user.lastName}</td>
              <td style={{ border: "1px solid var(--border)", padding: "8px" }}>{user.loginCount}</td>
              <td style={{ border: "1px solid var(--border)", padding: "8px" }}>{new Date(user.lastLogin).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserStats;