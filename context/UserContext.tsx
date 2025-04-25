import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the user
interface User {
  type?: 'student' | 'teacher';  // Example user type (you can adjust based on your actual data)
  gender?: string;
  ID?: string;
  department?: string;
  course?: string;
}

// Define the context's value type
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the UserContext with an initial value
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// Optional: Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
