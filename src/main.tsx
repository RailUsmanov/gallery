import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import {store} from "./store/store";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
                <ErrorBoundary>
                <App />
                </ErrorBoundary>
        </Provider>
    </React.StrictMode>
);