import React from "react";
import styles from "./styles/App.module.scss";
import Header from "./components/Header";
import Gallery from "./components/Gallery";

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <Header/>
            <Gallery/>
        </div>
    );
};

export default App;