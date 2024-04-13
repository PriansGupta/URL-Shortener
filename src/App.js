import React, { useState } from "react";
import axios from "axios";
import Loader from "./Components/loader";
import { FiCopy } from "react-icons/fi";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("https://www.My_URL_Shortener/");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEmptyWarning, setIsEmptyWarning] = useState(false);

  const handleShorten = async () => {
    if (!originalUrl.trim()) {
      setIsEmptyWarning(true);
      return;
    }
    setIsEmptyWarning(false);
    setLoading(true);
    try {
      const response = await axios.post("/shorten", { originalUrl });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <div className="min-h-screen select-none flex flex-col justify-between items-center tracking-wider">
      <header className="bg-gray-800 text-white py-4 w-full text-center">
        <h1 className="text-4xl font-bold">URL Shortener</h1>
      </header>
      <div className="flex justify-center items-center w-full md:w-[70%]">
        <Loader open={loading} />
        <div className="max-w-full md:max-w-[60%] flex-col w-full bg-white p-10 rounded">
          <div className="mb-4">
            <h2 className="text-xl md:text-3xl font-bold text-center">
              Make it easy to share !!
            </h2>
          </div>
          <div className="flex flex-col md:flex-row">
            <input
              type="text"
              placeholder="Enter your URL"
              value={originalUrl}
              onChange={(e) => {
                setOriginalUrl(e.target.value);
                if (e.target.value.trim()) {
                  setIsEmptyWarning(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleShorten();
                }
              }}
              className={`flex-grow border p-2 rounded mb-2 md:mb-0 md:mr-2 text-sm ${
                isEmptyWarning ? "border-red-500" : "border-gray-400"
              }`}
            />
            <button
              onClick={handleShorten}
              className="bg-blue-500 font-bold text-white px-4 py-2 rounded text-sm"
              disabled={loading}
            >
              {loading ? "Loading. . . ." : "Shorten URL"}
            </button>
          </div>
          {isEmptyWarning && (
            <p className="text-red-500 text-sm mt-2">Please enter a URL</p>
          )}
          {shortUrl && (
            <div className="mt-4 text-sm flex items-center">
              <span className="flex-grow">
                Shortened URL:{" "}
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline select-text"
                >
                  {shortUrl}
                </a>
              </span>
              {copied && (
                <div className="bg-green-500 font-bold text-white px-2 py-1 rounded-md">
                  Copied!
                </div>
              )}
              <button
                className="ml-2 bg-gray-300 hover:bg-gray-400 px-2 py-2 rounded-md"
                onClick={copyToClipboard}
              >
                <FiCopy />
              </button>
            </div>
          )}
        </div>
      </div>
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
