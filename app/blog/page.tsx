import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Preply",
  description: "Insights, updates, and best practices for interview preparation.",
};

const blogPosts = [
  {
    id: 1,
    category: "Product Updates",
    title: "Introducing Smart Automation 2.0",
    excerpt:
      "Discover how our latest automation features can help you streamline your workflow and boost productivity by 10x.",
    date: "Dec 20, 2024",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    category: "Best Practices",
    title: "10 Tips for Effective Workflow Automation",
    excerpt:
      "Learn the best practices from industry experts on how to maximize the benefits of automation in your daily tasks.",
    date: "Dec 18, 2024",
    readTime: "7 min read",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    category: "Case Study",
    title: "How Tech Startup Increased Efficiency by 300%",
    excerpt:
      "Read how a fast-growing startup leveraged Preply to scale their operations and reduce manual work significantly.",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    category: "Tutorial",
    title: "Getting Started with AI-Powered Automation",
    excerpt:
      "A comprehensive guide to help you set up your first automated workflow using AI technology.",
    date: "Dec 12, 2024",
    readTime: "8 min read",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    category: "Industry Insights",
    title: "The Future of Workflow Automation in 2025",
    excerpt:
      "Explore the emerging trends and predictions for automation technology in the coming year.",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 6,
    category: "Customer Stories",
    title: "Enterprise Success: Scaling with Automation",
    excerpt:
      "Discover how Fortune 500 companies are using Preply to transform their business operations.",
    date: "Dec 8, 2024",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

// Server Component for faster initial render
export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-b from-blue-50/50 via-white to-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights, updates, and best practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <button className="flex items-center space-x-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group-hover:translate-x-1 duration-200">
                      <span>Read</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
