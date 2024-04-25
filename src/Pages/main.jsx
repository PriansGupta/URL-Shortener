import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Components/loader";
import { FiCopy } from "react-icons/fi";
import { signOut, onAuthStateChanged } from "firebase/auth";
import auth from "../Auth/firebase";
import Avatar from "../Components/Avatar";
import CreditModal from "../Components/Modal";

function Main() {
    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isEmptyWarning, setIsEmptyWarning] = useState(false);
    const [user, setUser] = useState(null);
    const [credits, setCredit] = useState(null);
    const [modalShow, setModalShow] = useState(null);

    const GetDetailsUser = async (email) => {
        // console.log(email);
        const response = await axios.post("http://localhost:5000/get-user", {
            email
        });
        setCredit(response.data.user?.credits);
        // console.log(response.data.user);
    }

    if (credits == null) {
        GetDetailsUser(user?.email);
    }
    useEffect(() => {
        GetDetailsUser(user?.email)
    }, [user])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        // GetDetailsUser(user?.email);
        return () => unsubscribe();
    }, []);

    const handleShorten = async () => {
        if (!originalUrl.trim()) {
            setIsEmptyWarning(true);
            return;
        }
        setIsEmptyWarning(false);
        setLoading(true);
        setShortUrl("");
        try {
            const response = await axios.post("https://make-it-easyy.vercel.app/shorten", {
                originalUrl,
                email: user.email
            });
            console.log(response.data);
            if (response.data.message === "Not enough credits")
                setModalShow(true);

            setShortUrl(response.data.shortUrl);
            GetDetailsUser(user.email);
        } catch (error) {
            console.error("Error shortening URL:", error);
        } finally {
            setLoading(false);
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
        <div className="w-full flex justify-center items-center">
            <CreditModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            ></CreditModal>
            <div className="absolute top-0 right-0 mt-4 mr-4">
                <Avatar user={user} credits={credits}></Avatar>
            </div>
            <div className="w-full md:w-[70%] flex flex-col md:flex-row justify-center items-center">
                <Loader open={loading} />
                <div className="max-w-full md:max-w-[80%] bg-white p-6 md:p-10 rounded-md">
                    <h2 className="text-xl md:text-3xl font-bold text-center mb-4">
                        Welcome, {user?.displayName}
                    </h2>
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
                            className={`flex-grow border p-2 rounded mb-2 md:mb-0 md:mr-2 text-sm ${isEmptyWarning ? "border-red-500" : "border-gray-400"}`}
                        />
                        <button
                            onClick={handleShorten}
                            className="bg-blue-500 h-full font-bold text-white px-3 py-2 rounded text-sm"
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
                                <div className="fixed top-[56.7%] left-[63%] transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white font-bold px-2 py-1 rounded-md">
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
        </div>
    );
}

export default Main;
