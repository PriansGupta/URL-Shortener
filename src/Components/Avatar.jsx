import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import auth from '../Auth/firebase';

const Avatar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        signOut(auth);
        setIsOpen(false);
    };

    return (
        <div className="relative" onMouseEnter={handleToggleDropdown} onMouseLeave={handleToggleDropdown}>
            <img
                src={user?.photoURL}
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
            />
            {isOpen && (
                <div className="absolute top-full right-0 bg-white border border-gray-300 rounded-md shadow-md py-2">
                    <ul className='cursor-pointer'>
                        <li className="px-4 py-2 flex items-center hover:bg-gray-100" onClick={handleLogout}>
                            <FiLogOut className="mr-2" /> Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Avatar;
