"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useSubscription } from "@/app/context/SubscriptionContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X, Crown, Loader2 } from "lucide-react";
import PricingSection from "@/components/PricingSection";

export default function PricingPage() {
    const { loading: authLoading } = useAuth();
    const { isPro, loading: subLoading, interviewsTaken } = useSubscription();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (!subLoading && !isPro && interviewsTaken > 0) {
            setShowPopup(true);
        }
    }, [subLoading, isPro, interviewsTaken]);

    if (authLoading || subLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50/30 via-white to-white">
            {/* Pop-up for Free users who have completed an interview */}
            {showPopup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="relative bg-white px-8 py-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300 border-2 border-violet-100 max-w-sm w-full mx-4">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                            <Crown className="w-6 h-6 text-violet-600" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Get the Paid Version</h3>
                            <p className="text-gray-500 text-sm mb-4">Unlock unlimited potential</p>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="text-sm text-violet-600 font-medium hover:text-violet-700 hover:underline"
                            >
                                Maybe Later
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Header />

            <main className="min-h-screen">
                <PricingSection className="py-16" />

                {/* Trust Badges */}
                <div className="text-center mt-8 mb-20">
                    <p className="text-gray-500 mb-4">Trusted payment powered by</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                        <div className="flex items-center gap-2 text-gray-400">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span className="text-sm">Secure Checkout</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                            </svg>
                            <span className="text-sm">256-bit SSL</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <img
                                src="https://razorpay.com/favicon.png"
                                alt="Razorpay"
                                className="w-5 h-5"
                            />
                            <span className="text-sm">Razorpay</span>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="max-w-3xl mx-auto px-6 mb-24">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Can I cancel anytime?
                            </h3>
                            <p className="text-gray-600">
                                Yes! Your Pro subscription is a one-time payment. It expires after the selected duration with no auto-renewal.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                What happens after my Free interview?
                            </h3>
                            <p className="text-gray-600">
                                After using your free interview, you&apos;ll need to upgrade to Pro to continue practicing. Your free report can be downloaded once.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Is my payment secure?
                            </h3>
                            <p className="text-gray-600">
                                Absolutely! We use Razorpay, India&apos;s most trusted payment gateway with bank-grade security.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
