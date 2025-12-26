"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        "What is the customer questionnaire?",
        "How can I resk questions?",
        "Questions to risk FAQ?",
        "How long AI SaaS together?"
    ];

    return (
        <section id="faqs" className="min-h-screen flex items-center scroll-mt-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-4xl mx-auto px-6 py-20 w-full">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">FAQ</h2>
                    <p className="text-lg text-gray-600">Find answers to common questions</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((question, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                aria-expanded={openFaq === index}
                            >
                                <span className="font-bold text-gray-900 text-base">{question}</span>
                                <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                            </button>
                            {openFaq === index && (
                                <div className="px-8 py-5 bg-blue-50/30 border-t border-gray-200">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
