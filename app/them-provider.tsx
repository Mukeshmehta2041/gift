// components/theme-provider.tsx

'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({
    children,
    attribute = 'class',
    defaultTheme = 'light',
    enableSystem = false,
    disableTransitionOnChange = false,
}: {
    children: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
}) => {
    const [theme, setTheme] = useState<string>(defaultTheme);
    const [systemTheme, setSystemTheme] = useState<string>('light');

    // On mount, check system theme preference
    useEffect(() => {
        if (enableSystem) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const onChange = () => setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
            mediaQuery.addEventListener('change', onChange);
            onChange(); // Set the initial theme based on the system preference
            return () => mediaQuery.removeEventListener('change', onChange);
        }
    }, [enableSystem]);

    // Sync the theme with localStorage or system preference
    useEffect(() => {
        if (enableSystem && systemTheme) {
            setTheme(systemTheme);
        } else {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                setTheme(savedTheme);
            }
        }
    }, [enableSystem, systemTheme]);

    // Update theme on change
    useEffect(() => {
        const root = document.documentElement;
        if (attribute === 'class') {
            root.classList.remove('light', 'dark');
            root.classList.add(theme);
        } else {
            root.setAttribute('data-theme', theme);
        }
        if (!disableTransitionOnChange) {
            document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        }
    }, [theme, attribute, disableTransitionOnChange]);

    const toggleTheme = (newTheme: string) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
