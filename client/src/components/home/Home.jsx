import React, { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [userCount, setUserCount] = useState(null);
  async function getUsers() {
    await axios
      .get("http://localhost:2000/totalusers")
      .then((users) => {
        setUserCount(users.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
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
