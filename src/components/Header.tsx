import React from "react";
import styles from "../styles/Header.module.scss";
import ThemeToggler from "./ThemeToggler";
import logo from "../img/logo.svg";
import logoWhite from "../img/logo-white.svg"
import {useSelector} from "react-redux";
import {RootStateType} from "../store/store";

const Header: React.FC = () => {
    const themeDark = useSelector((state: RootStateType) => state.theme.themeDark)
    return (
        <header className={styles.header}>
            <div className={styles.logo}><img src={themeDark ? logoWhite : logo}/></div>
            <ThemeToggler/>
        </header>
    );
};

export default Header;