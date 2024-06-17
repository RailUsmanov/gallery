import React, {Component, ErrorInfo, ReactNode} from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        //todo Можно здесь добавить логгирование ошибки
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Произошла ошибка. Пожалуйста, попробуйте позже.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
