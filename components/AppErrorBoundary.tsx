"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { ReactNode } from "react";

export default function AppErrorBoundary({ children }: { children: ReactNode }) {
    return <ErrorBoundary>{children}</ErrorBoundary>;
}
