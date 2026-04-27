import { useState, useEffect } from "react";
import { fetchUserStats } from "./api";

function UserStats() {
  const [userStats, setUserStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats().then((data) => {
      setUserStats(data);
      setLoading(false);
    }).catch((error) => {
      console.error("Failed to fetch user stats:", error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading user stats...</div>;
  }

  return (
    <div>
      <h2>User Login Statistics</h2>
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