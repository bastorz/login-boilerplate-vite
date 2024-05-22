import React, { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../../utils/supabase/entities/supabaseClient";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [user, setUser] = useState(null); // Declarar user como null
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      navigate("/login");
    } else {
      setUser(data.user);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut().then((res) => {
      if (res.error) {
        console.error("Error during sign out:", res.error.message);
      }
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      sessionStorage.clear();
    });
    navigate("/login");
  };

  return (
    <main className="flex min-h-screen flex-col p-4">
      {user ? (
        <div className="flex justify-between">
          <p className="flex">Welcome, {user.email}</p>
          <button
            className="bg-emerald-500 px-4 p-2 rounded-md"
            type="button"
            onClick={() => {
              handleLogout();
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
};

export default HomePage;
