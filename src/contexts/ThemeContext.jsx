import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({children}){
    
    const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('isDarkMode');
    return stored ? JSON.parse(stored) : false;
    });

    useEffect(() => {
    document.body.classList.toggle("dark", isDark);
    }, [isDark]);

    return <ThemeContext.Provider value={[isDark, setIsDark]}>{children}</ThemeContext.Provider>
}

export { ThemeContext, ThemeProvider };
