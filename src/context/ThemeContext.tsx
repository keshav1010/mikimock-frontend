import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

type ThemeType = "light" | "dark";

interface ThemeContextType {

    theme: ThemeType;

    toggleTheme: () => void;
}

const ThemeContext =
    createContext<ThemeContextType | null>(
        null
    );

export const ThemeProvider = ({
    children
}: any) => {

    const [theme, setTheme] =
        useState<ThemeType>("dark");

    useEffect(() => {

        const savedTheme =
            localStorage.getItem(
                "theme"
            ) as ThemeType;

        if (savedTheme) {

            setTheme(savedTheme);

            document.documentElement.classList.toggle(
                "dark",
                savedTheme === "dark"
            );

        } else {

            document.documentElement.classList.add(
                "dark"
            );
        }

    }, []);

    const toggleTheme = () => {

        const newTheme =
            theme === "dark"
                ? "light"
                : "dark";

        setTheme(newTheme);

        localStorage.setItem(
            "theme",
            newTheme
        );

        document.documentElement.classList.toggle(
            "dark",
            newTheme === "dark"
        );
    };

    return (

        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme
            }}
        >

            {children}

        </ThemeContext.Provider>
    );
};

export const useTheme = () => {

    const context =
        useContext(ThemeContext);

    if (!context) {

        throw new Error(
            "useTheme must be used inside ThemeProvider"
        );
    }

    return context;
};