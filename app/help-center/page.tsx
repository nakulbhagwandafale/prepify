"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, ChevronDown, Copy, Check, Sparkles, MessageSquare, ArrowRight, X } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface SearchResult extends FAQ {
  category: string;
  relevanceScore: number;
  matchedKeywords: string[];
}

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          id: "gs-1",
          question: "How do I create an account?",
          answer:
            "Creating an account is simple. Click the Sign Up button in the header, fill in your details including your email and password, and verify your email address. You'll be ready to start practicing interviews in minutes. We also support social login with Google for faster access.",
        },
        {
          id: "gs-2",
          question: "What are the system requirements?",
          answer:
            "Preply is a cloud-based platform that works on any modern web browser. We recommend using the latest version of Chrome, Firefox, Safari, or Edge for the best experience. For voice-based interviews, you'll need a working microphone. A stable internet connection is recommended for seamless AI interactions.",
        },
        {
          id: "gs-3",
          question: "How do I start my first interview?",
          answer:
            "After logging in, click the 'New Interview' button on your dashboard. Select your interview category (HR, Technical, etc.), choose the difficulty level, upload your resume (optional), and set the number of questions. Click 'Start Interview' and our AI interviewer will begin asking questions!",
        },
        {
          id: "gs-4",
          question: "What interview categories are available?",
          answer:
            "We offer multiple interview categories including: HR/Behavioral interviews for soft skills assessment, Technical interviews for programming and system design, Case Study interviews for consulting practice, Leadership interviews for management positions, and Industry-specific interviews for specialized roles.",
        },
      ],
    },
    {
      category: "Interview Features",
      questions: [
        {
          id: "if-1",
          question: "How does the AI interviewer work?",
          answer:
            "Our AI interviewer uses advanced language models to conduct realistic interview simulations. It asks contextual questions based on your resume and selected category, listens to your spoken or typed responses, and provides detailed feedback on your performance including strengths and areas for improvement.",
        },
        {
          id: "if-2",
          question: "Can I practice with voice or text?",
          answer:
            "Yes! Preply supports both voice and text-based interviews. Voice mode uses your microphone to capture spoken responses for a realistic interview experience. Text mode lets you type your answers if you prefer. You can switch between modes based on your preference.",
        },
        {
          id: "if-3",
          question: "How is my interview scored?",
          answer:
            "Your interview is scored on a 0-100 scale based on multiple factors: content relevance, communication clarity, structure of responses, use of specific examples (STAR method), and overall confidence. Each question receives individual feedback, and you get an aggregate score at the end.",
        },
        {
          id: "if-4",
          question: "What feedback do I receive after an interview?",
          answer:
            "After each interview, you receive a comprehensive performance report including: overall score, breakdown of strengths and weaknesses, question-by-question feedback with ratings, specific suggestions for improvement, and actionable tips for your next interview. You can download this report as a PDF.",
        },
      ],
    },
    {
      category: "Account & Billing",
      questions: [
        {
          id: "ab-1",
          question: "Is Preply free to use?",
          answer:
            "Preply offers a free tier with limited interviews per month. For unlimited access, advanced features, and detailed analytics, you can upgrade to our Pro or Business plans. Check our Pricing page for current plans and features.",
        },
        {
          id: "ab-2",
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express) and support payment via bank transfer for annual plans. All payments are processed securely through our payment partner. We also support PayPal and UPI for select regions.",
        },
        {
          id: "ab-3",
          question: "Can I change my plan later?",
          answer:
            "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and we'll prorate any charges or credits. No long-term contracts required.",
        },
        {
          id: "ab-4",
          question: "Do you offer refunds?",
          answer:
            "We offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied, contact our support team within 30 days of your initial purchase for a full refund. No questions asked.",
        },
      ],
    },
    {
      category: "Dashboard & Analytics",
      questions: [
        {
          id: "da-1",
          question: "What can I see on my dashboard?",
          answer:
            "Your dashboard shows: total interviews taken, average score across all interviews, your best performance score, recent score improvement, practice streak, category-wise performance breakdown, aggregated strengths and weaknesses, and a table of all past interviews with quick access to reports.",
        },
        {
          id: "da-2",
          question: "How do I track my improvement over time?",
          answer:
            "The Performance Growth chart on your dashboard shows your scores plotted over time, helping you visualize improvement trends. After 2+ interviews, you'll see a line graph of your progress. The 'Last Change' metric shows how your latest interview compared to the previous one.",
        },
        {
          id: "da-3",
          question: "Can I download my interview reports?",
          answer:
            "Yes! Each interview report can be downloaded as a PDF. Click 'View Report' on any interview in your dashboard, then click 'Download PDF'. The PDF includes your score, strengths, weaknesses, overall feedback, and question-by-question analysis.",
        },
      ],
    },
    {
      category: "Technical Issues",
      questions: [
        {
          id: "ti-1",
          question: "My microphone isn't working. What should I do?",
          answer:
            "First, ensure your browser has permission to access your microphone (check the lock icon in the address bar). Try refreshing the page, or use a different browser. Make sure no other app is using your microphone. If issues persist, switch to text-based interview mode.",
        },
        {
          id: "ti-2",
          question: "The interview is stuck or not loading. How do I fix it?",
          answer:
            "Try refreshing the page first. Clear your browser cache and cookies if the issue persists. Check your internet connection stability. Disable browser extensions that might interfere. If the problem continues, contact our support team with details about your browser and device.",
        },
        {
          id: "ti-3",
          question: "Is my data secure?",
          answer:
            "Yes. We use bank-level encryption (AES-256) for all data at rest and in transit. Your interview recordings and personal data are stored securely. We never share your data with third parties without consent. You can delete your data anytime from account settings.",
        },
        {
          id: "ti-4",
          question: "How do I report a bug or issue?",
          answer:
            "You can report bugs by clicking 'Contact Support' at the bottom of this page, or email us at support@preply.com. Please include: a description of the issue, steps to reproduce it, your browser and device info, and screenshots if possible. We typically respond within 24 hours.",
        },
      ],
    },
  ];

  // Flatten all FAQs for search
  const allFaqs = useMemo(() => {
    return faqCategories.flatMap((cat) =>
      cat.questions.map((q) => ({
        ...q,
        category: cat.category,
      }))
    );
  }, []);

  // Search function with relevance scoring
  const searchResults = useMemo((): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const queryWords = query.split(/\s+/).filter((w) => w.length > 2);

    return allFaqs
      .map((faq) => {
        const questionLower = faq.question.toLowerCase();
        const answerLower = faq.answer.toLowerCase();
        const matchedKeywords: string[] = [];
        let relevanceScore = 0;

        // Exact phrase match in question (highest priority)
        if (questionLower.includes(query)) {
          relevanceScore += 100;
          matchedKeywords.push(query);
        }

        // Exact phrase match in answer
        if (answerLower.includes(query)) {
          relevanceScore += 50;
          if (!matchedKeywords.includes(query)) matchedKeywords.push(query);
        }

        // Individual word matches
        queryWords.forEach((word) => {
          if (questionLower.includes(word)) {
            relevanceScore += 20;
            if (!matchedKeywords.includes(word)) matchedKeywords.push(word);
          }
          if (answerLower.includes(word)) {
            relevanceScore += 10;
            if (!matchedKeywords.includes(word)) matchedKeywords.push(word);
          }
        });

        return {
          ...faq,
          relevanceScore,
          matchedKeywords,
        };
      })
      .filter((r) => r.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5); // Top 5 results
  }, [searchQuery, allFaqs]);

  // Copy to clipboard
  const copyToClipboard = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  // Highlight matched text
  const highlightText = (text: string, keywords: string[]) => {
    if (!keywords.length) return text;

    let result = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, "gi");
      result = result.replace(
        regex,
        '<mark class="bg-violet-200 text-violet-900 px-0.5 rounded">$1</mark>'
      );
    });
    return result;
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchFocused(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-b from-violet-50/50 via-white to-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Find answers to common questions
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Ask a question or search for help..."
                  className="w-full pl-12 pr-12 py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all shadow-sm hover:border-violet-300"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>

              {/* Search Results - ChatGPT Style */}
              <AnimatePresence>
                {searchQuery.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 text-left"
                  >
                    {searchResults.length > 0 ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                          <Sparkles className="w-4 h-4 text-violet-500" />
                          <span>Found {searchResults.length} relevant answers</span>
                        </div>

                        {searchResults.map((result, index) => (
                          <motion.div
                            key={result.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-200"
                          >
                            {/* Category Badge */}
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-medium bg-violet-100 text-violet-700 px-3 py-1 rounded-full">
                                {result.category}
                              </span>
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    `Q: ${result.question}\n\nA: ${result.answer}`,
                                    result.id
                                  )
                                }
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all"
                                title="Copy answer"
                              >
                                {copiedId === result.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-green-500" />
                                    <span className="text-green-600">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>

                            {/* Question */}
                            <h3
                              className="font-bold text-gray-900 mb-3 text-lg"
                              dangerouslySetInnerHTML={{
                                __html: highlightText(
                                  result.question,
                                  result.matchedKeywords
                                ),
                              }}
                            />

                            {/* Answer */}
                            <p
                              className="text-gray-600 leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: highlightText(
                                  result.answer,
                                  result.matchedKeywords
                                ),
                              }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-50 border-2 border-gray-100 rounded-2xl p-8 text-center"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MessageSquare className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-bold text-gray-700 mb-2">
                          No results found
                        </h3>
                        <p className="text-gray-500 text-sm mb-4">
                          We couldn&apos;t find anything matching &quot;{searchQuery}&quot;
                        </p>
                        <button
                          onClick={clearSearch}
                          className="text-violet-600 hover:text-violet-700 text-sm font-medium flex items-center gap-1 mx-auto"
                        >
                          Browse all topics <ArrowRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* FAQ Categories - Shown when not searching */}
          {!searchQuery.trim() && (
            <div className="space-y-12">
              {faqCategories.map((category) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {category.category}
                  </h2>

                  <div className="space-y-4">
                    {category.questions.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-200"
                      >
                        <button
                          onClick={() => toggleFaq(item.id)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-bold text-gray-900 text-base pr-4">
                            {item.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-violet-600 flex-shrink-0 transition-transform duration-300 ${openFaq === item.id ? "rotate-180" : ""
                              }`}
                          />
                        </button>

                        <AnimatePresence>
                          {openFaq === item.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 py-5 bg-violet-50/30 border-t border-gray-100">
                                <div className="flex justify-between items-start gap-4">
                                  <p className="text-gray-700 leading-relaxed flex-1">
                                    {item.answer}
                                  </p>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      copyToClipboard(
                                        `Q: ${item.question}\n\nA: ${item.answer}`,
                                        item.id
                                      );
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-violet-600 hover:bg-violet-100 rounded-lg transition-all shrink-0"
                                    title="Copy answer"
                                  >
                                    {copiedId === item.id ? (
                                      <>
                                        <Check className="w-3.5 h-3.5 text-green-500" />
                                        <span className="text-green-600">Copied!</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3.5 h-3.5" />
                                        <span>Copy</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Contact Support */}
          <div className="mt-16 bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">
              Still have questions?
            </h3>
            <p className="text-white/80 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our support
              team is here to help.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 text-base font-semibold text-violet-600 bg-white rounded-xl hover:bg-violet-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-violet-600"
              aria-label="Contact our support team"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
