import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutContent from "./AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - Preply",
    description: "Learn about Preply and our mission to make interview preparation accessible to everyone.",
};

// Server Component - fast initial render
export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <AboutContent />
            <Footer />
        </div>
    );
}
