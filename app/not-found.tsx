import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center py-20 px-6">
                <div className="text-center max-w-2xl mx-auto">
                    <div className="text-9xl font-bold text-violet-100 mb-8">404</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Page Not Found
                    </h1>
                    <p className="text-xl text-gray-600 mb-10">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-violet-600 rounded-xl hover:bg-violet-700 transition-all shadow-lg shadow-violet-200"
                        >
                            Go Home
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-violet-600 bg-violet-50 rounded-xl hover:bg-violet-100 transition-all border-2 border-transparent hover:border-violet-200"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
