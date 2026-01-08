"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <div className="min-h-[400px] flex items-center justify-center p-8">
                    <div className="text-center max-w-md">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
                        <p className="text-gray-600 mb-6">We encountered an unexpected error. Please try refreshing.</p>
                        <button
                            onClick={this.handleReset}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
