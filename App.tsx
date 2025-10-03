
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { themes } from './styles/theme';

interface ThemeContextType {
  theme: typeof themes.light;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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

// Minimal default App export for tests and consumers expecting a default
const App: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default App;