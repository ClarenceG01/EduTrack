import React, { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [userCount, setUserCount] = useState(null);
  async function getUsers() {
    const users = await axios.get("http://localhost:2000/totalusers");
    setUserCount(users.data.users);
  }
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <section>
        <span>Total Users</span>
        <span>{userCount}</span>
      </section>
    </div>
  );
};

export default Home;
