import React, {useEffect, useState} from "react";
import styles from "../styles/ThemeToggler.module.scss";
import iconToggleLightTheme from "../img/icon/iconThemeBlack.svg";
import iconToggleDarkTheme from "../img/icon/iconsThemWhiteSun.svg";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store";
import {toggleThemeDark} from "../store/themeSlice";

const ThemeToggler: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
        document.body.className = theme === "light" ? "dark" : "light";
        if (document.body.className === 'dark') {
            dispatch(toggleThemeDark())
        } else {
            dispatch(toggleThemeDark())
        }

    };

    return (
        <div className={styles.themeToggler} onClick={toggleTheme}>
            <img alt={`Toggle Theme ${theme === "light" ? "dark" : "light"}`}
                 src={theme === "light" ? iconToggleLightTheme : iconToggleDarkTheme}/>
        </div>
    );
};

export default ThemeToggler;