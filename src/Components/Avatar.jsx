import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import auth from '../Auth/firebase';
import { GiCreditsCurrency } from "react-icons/gi";

const Avatar = ({ user, credits }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        signOut(auth);
        setIsOpen(false);
    };

    // console.log(user?.photoURL);

    return (
        <div className="relative" onMouseEnter={handleToggleDropdown} onMouseLeave={handleToggleDropdown}>
            <img
                src={user?.photoURL}
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
            />
            {isOpen && (
                <div className="absolute w-[160px] top-full right-0 bg-white border border-gray-300 rounded-md shadow-md py-2">
                    <div className='cursor-pointer flex flex-col-reverse w-full'>
                        <div className="py-2 px-2 w-full flex items-center hover:bg-gray-100" onClick={handleLogout}>
                            <FiLogOut className="mr-2" /> Logout
                        </div>
                        <div className="py-2 px-2 w-full flex items-center hover:bg-gray-100">
                            <div className="flex items-baseline text-center">
                                <GiCreditsCurrency className="mr-2" />
                                Credits : {credits}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Avatar;
