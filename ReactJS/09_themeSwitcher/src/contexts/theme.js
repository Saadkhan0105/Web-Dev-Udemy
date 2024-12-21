import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    themMode: "light",
    darkTheme: () => {},
    lightTheme: () => {},
})

export const ThemeProvider = ThemeContext.Provider

export default function usetheme(){
    return useContext(ThemeContext)
}