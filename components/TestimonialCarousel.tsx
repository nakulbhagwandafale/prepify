"use client";

import { useEffect, useState } from "react";
import { Star, X, Quote, ArrowRight } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Feedback = {
    id: string;
    user_id: string;
    email: string;
    message: string;
    stars: number;
    created_at: string;
};

export default function TestimonialCarousel() {
    const [testimonials, setTestimonials] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTestimonial, setSelectedTestimonial] = useState<Feedback | null>(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const { data, error } = await supabase
                    .from("feedback")
                    .select("id, user_id, email, message, stars, created_at")
                    .gte("stars", 4)
                    .order("created_at", { ascending: false })
                    .limit(10);

                if (error) {
                    console.error("Error fetching testimonials:", error);
                } else {
                    setTestimonials(data || []);
                }
            } catch (err) {
                console.error("Unexpected error fetching testimonials:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();

        const channel = supabase
            .channel("public:feedback")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "feedback",
                    filter: "stars=gte.4",
                },
                (payload) => {
                    setTestimonials((prev) => [payload.new as Feedback, ...prev].slice(0, 10));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    if (loading) {
        return (
            <div className="grid md:grid-cols-3 gap-8 animate-pulse">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="w-[320px] h-[320px] bg-gray-100 rounded-[2.5rem]" />
                ))}
            </div>
        );
    }

    if (testimonials.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                <p>No testimonials yet. Be the first to share your success story!</p>
            </div>
        );
    }

    const duplicatedTestimonials = testimonials.length < 5
        ? [...testimonials, ...testimonials, ...testimonials, ...testimonials]
        : [...testimonials, ...testimonials];

    // Strict truncation: 50 characters + 9 dots
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "....";
    };

    return (
        <>
            <div className="relative w-full overflow-hidden py-12">
                {/* Clean, minimalist gradient edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                <div className="flex overflow-hidden group">
                    <m.div
                        className="flex gap-6"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: Math.max(40, duplicatedTestimonials.length * 4),
                                ease: "linear",
                            },
                        }}
                        whileHover={{ animationPlayState: "paused" }}
                        style={{ width: "max-content" }}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <div
                                key={`${testimonial.id}-${index}`}
                                className="w-[320px] h-[320px] flex-shrink-0 cursor-pointer group/card"
                                onClick={() => setSelectedTestimonial(testimonial)}
                            >
                                {/* Fixed Square Card Container */}
                                <div className="w-full h-full bg-slate-50 rounded-[2.5rem] p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:bg-white border border-transparent hover:border-violet-100 relative overflow-hidden">

                                    {/* Top Section: Visual / Icon / Avatar */}
                                    <div className="mb-4 relative shrink-0">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-violet-600 font-bold text-xl shadow-sm border border-violet-100 group-hover/card:scale-110 transition-transform duration-300">
                                            {testimonial.email.charAt(0).toUpperCase()}
                                        </div>
                                        {/* Stars Badge absolute positioned like a tag */}
                                        <div className="absolute -top-2 right-0 bg-white/80 backdrop-blur px-2 py-1 rounded-full border border-gray-100 flex items-center gap-1 shadow-sm">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span className="text-xs font-bold text-gray-700">{testimonial.stars || 5}.0</span>
                                        </div>
                                    </div>

                                    {/* Middle Section: Title (User Name) */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 truncate shrink-0">
                                        {testimonial.email.split("@")[0]}
                                    </h3>

                                    {/* Bottom Section: Description (Feedback) */}
                                    {/* Strict overflow hidden to ensure it never breaks layout */}
                                    <div className="text-gray-600 leading-relaxed text-sm flex-grow overflow-hidden">
                                        {truncateText(testimonial.message.replace(/^\[.*?\]\s*/, ""), 100)}
                                    </div>

                                    {/* Footer / Action Indicator */}
                                    <div className="mt-4 pt-4 border-t border-gray-200/50 flex items-center justify-between group-hover/card:border-violet-100 transition-colors shrink-0">
                                        <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">Verified</span>
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover/card:text-violet-600 group-hover/card:bg-violet-50 transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </m.div>
                </div>
            </div>

            {/* Detail Modal Component */}
            <AnimatePresence>
                {selectedTestimonial && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTestimonial(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <m.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedTestimonial(null)}
                                className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8 md:p-10">
                                {/* Header */}
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-violet-200">
                                        {selectedTestimonial.email.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                            {selectedTestimonial.email.split("@")[0]}
                                        </h3>
                                        <div className="flex items-center gap-1.5">
                                            {[...Array(selectedTestimonial.stars || 5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative bg-slate-50 p-6 rounded-2xl max-h-[40vh] overflow-y-auto">
                                    <Quote className="absolute -top-3 -left-3 w-8 h-8 text-violet-500 fill-violet-500 bg-white rounded-full p-1.5 shadow-sm" />
                                    <p className="text-gray-700 text-lg leading-relaxed pt-2">
                                        {selectedTestimonial.message.replace(/^\[.*?\]\s*/, "")}
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="mt-8 flex justify-between items-center text-sm text-gray-500">
                                    <span>PrepBuddy Verified User</span>
                                    <span>{new Date(selectedTestimonial.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </m.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
