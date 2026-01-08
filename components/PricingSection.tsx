"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useSubscription } from "@/app/context/SubscriptionContext";
import { useRazorpayPayment } from "@/hooks/useRazorpayPayment";
import { paymentConfig, BillingCycle } from "@/lib/config/payments";

interface PricingSectionProps {
    showHeader?: boolean;
    className?: string;
}

export default function PricingSection({
    showHeader = true,
    className = "",
}: PricingSectionProps) {
    const router = useRouter();
    const { user } = useAuth();
    const {
        isPro,
        loading: subLoading,
        refreshSubscription,
        subscription,
    } = useSubscription();

    const [selectedCycle, setSelectedCycle] = useState<BillingCycle>(
        BillingCycle.MONTHLY
    );

    const { buyPro, isLoading: isPaymentLoading } = useRazorpayPayment({
        userId: user?.id || "",
        email: user?.email || "",
        onSuccess: () => {
            refreshSubscription();
            router.push("/dashboard?payment=success");
        },
        onError: (msg) => {
            console.error("Payment failed:", msg);
        },
    });

    const handleFreePlan = () => {
        router.push("/interview-setup");
    };

    /**
     * Determines the text to display on the Pro plan button.
     */
    const getButtonText = () => {
        if (isPaymentLoading) return null;

        if (!isPro) return "Upgrade to Pro";

        const currentCycle = subscription?.billingCycle;

        if (currentCycle === BillingCycle.YEARLY) {
            return "Start Interview";
        }

        if (
            currentCycle === BillingCycle.MONTHLY &&
            selectedCycle === BillingCycle.YEARLY
        ) {
            return "Upgrade Plan";
        }

        return "Current Plan";
    };

    /**
     * Handles the logic when the Pro plan button is clicked.
     */
    const handleProPlan = async () => {
        if (!user) {
            router.push("/login?redirect=/pricing");
            return;
        }

        if (!isPro) {
            await buyPro(selectedCycle === BillingCycle.YEARLY);
            return;
        }

        const currentCycle = subscription?.billingCycle;

        if (currentCycle === BillingCycle.YEARLY) {
            router.push("/interview-setup");
            return;
        }

        if (
            currentCycle === BillingCycle.MONTHLY &&
            selectedCycle === BillingCycle.YEARLY
        ) {
            await buyPro(true);
            return;
        }

        router.push("/dashboard");
    };

    const isButtonDisabled = () => {
        if (isPaymentLoading) return true;
        if (!isPro) return false;

        const currentCycle = subscription?.billingCycle;

        if (
            currentCycle === BillingCycle.MONTHLY &&
            selectedCycle === BillingCycle.MONTHLY
        )
            return true;

        return false;
    };

    const currentPlanConfig = paymentConfig.plans[selectedCycle];

    return (
        <section id="pricing" className={`py-16 ${className}`}>
            <div className="max-w-7xl mx-auto px-6">
                {showHeader && (
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full text-violet-700 text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            Choose Your Plan
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Invest in Your Career
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Practice unlimited interviews, track your progress, and land your
                            dream job.
                        </p>
                    </div>
                )}

                {/* Monthly/Yearly Toggle */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <span
                        className={`text-sm font-medium transition-colors ${selectedCycle === BillingCycle.MONTHLY
                                ? "text-gray-900"
                                : "text-gray-400"
                            }`}
                    >
                        Monthly
                    </span>
                    <button
                        onClick={() =>
                            setSelectedCycle((prev) =>
                                prev === BillingCycle.MONTHLY
                                    ? BillingCycle.YEARLY
                                    : BillingCycle.MONTHLY
                            )
                        }
                        className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${selectedCycle === BillingCycle.YEARLY
                                ? "bg-violet-600"
                                : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${selectedCycle === BillingCycle.YEARLY
                                    ? "translate-x-7"
                                    : "translate-x-0"
                                }`}
                        />
                    </button>
                    <span
                        className={`text-sm font-medium transition-colors ${selectedCycle === BillingCycle.YEARLY
                                ? "text-gray-900"
                                : "text-gray-400"
                            }`}
                    >
                        Yearly
                    </span>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Plan Card */}
                    <div className="relative bg-white rounded-3xl border-2 border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>

                        {/* Price */}
                        <div className="mb-2">
                            <span className="text-5xl font-bold text-gray-900">₹0</span>
                            <span className="text-gray-500 ml-1">forever</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-8">
                            Everything you need to get started
                        </p>

                        {/* Features */}
                        <ul className="space-y-4 mb-8">
                            {paymentConfig.freeFeatures.map((feature, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-violet-600" />
                                    </div>
                                    <span className="text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <button
                            onClick={handleFreePlan}
                            className="w-full py-4 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                        >
                            Start Free
                        </button>
                    </div>

                    {/* Pro Plan Card */}
                    <div className="relative bg-white rounded-3xl border-2 border-violet-500 p-8 shadow-lg shadow-violet-100">
                        {/* Most Popular Badge */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg">
                                <Sparkles className="w-4 h-4" />
                                Most Popular
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-2">Pro</h3>

                        {/* Price */}
                        <div className="mb-2">
                            <span className="text-5xl font-bold text-violet-600">
                                ₹{currentPlanConfig.displayAmount}
                            </span>
                            <span className="text-gray-500 ml-1">
                                /{selectedCycle === BillingCycle.YEARLY ? "year" : "month"}
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm mb-8">
                            For serious growth-seekers
                        </p>

                        {/* Features */}
                        <ul className="space-y-4 mb-8">
                            {currentPlanConfig.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-violet-600" />
                                    </div>
                                    <span className="text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <button
                            onClick={handleProPlan}
                            disabled={isButtonDisabled()}
                            className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isPaymentLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                getButtonText()
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
