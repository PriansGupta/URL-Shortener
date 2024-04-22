import React, { useState, useEffect } from "react";
import Main from "./Pages/main";
import Login from "./Pages/login";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./Auth/firebase";
import Loader from "./Components/loader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoggedIn(!!user);
      setAuthInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!authInitialized) {
    return <Loader open={true}></Loader>;
  }

  return (
    <div className="min-h-screen select-none flex flex-col justify-between items-center tracking-wider">
      <header className="bg-gray-800 text-white py-4 w-full text-center">
        <h1 className="text-4xl font-bold">URL Shortener</h1>
      </header>
      {isLoggedIn || user ? <Main /> : <Login onLogin={handleLogin} />}
      <footer className="bg-gray-800 text-white py-4 w-full text-center">
        <p className="text-xs md:text-sm w-3/4 text-center mx-auto">
          Free URL Shortener for transforming long, ugly links into nice,
          memorable and trackable short URLs. Use it to shorten links for any
          social media platforms, blogs, SMS, emails, ads, or pretty much
          anywhere else you want to share them. Twitter, Facebook, YouTube,
          Instagram, WhatsApp, emails, SMS, videos.
        </p>
      </footer>
    </div>
  );
}

export default App;
