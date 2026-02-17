import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to update user data
    const updateUser = (userData) => {
        // Jika userData punya properti "user", ambil langsung isinya
        if (userData && userData.user) {
            setUser(userData.user);
        } else {
            setUser(userData);
        }
    };

    //Function to clear user data (e.g., on logout)
    const clearUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider
        value= {{ 
            user,
            updateUser,
            clearUser
         }}
         >
            {children}
         </UserContext.Provider>
    );
}

export default UserProvider;