import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LuTrendingUp, LuChartPie, LuShieldCheck, LuSmartphone } from 'react-icons/lu';

const LandingPage = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <div className="min-h-screen bg-white font-display text-gray-800">
            {/* Navbar */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xl">
                                F
                            </div>
                            <span className="text-xl font-bold text-gray-900">Fintrack</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {isAuthenticated ? (
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
                                >
                                    Go to Dashboard
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="hidden sm:block text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                                    >
                                        Get Started
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-3xl mx-auto relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-primary text-xs font-medium mb-6 animate-fade-in-up">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            Number #1 Expense Tracker App
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
                            Master Your Money with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Fintrack</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Effortlessly track expenses, visualize income, and take control of your financial future. The smart way to manage your personal finances.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
                                className="px-8 py-4 text-base font-semibold text-white bg-primary rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 hover:scale-105"
                            >
                                {isAuthenticated ? 'Go to Dashboard' : 'Start for Free'}
                            </button>
                            <button
                                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all hover:border-gray-300"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Decorative blobs */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-200/30 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none"></div>
                    <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-3xl -z-10 opacity-40 pointer-events-none"></div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Choose Fintrack?</h2>
                        <p className="text-gray-500">Everything you need to manage your personal finances in one beautiful, intuitive interface.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={<LuChartPie className="w-6 h-6 text-white" />}
                            title="Visual Analytics"
                            description="Visualize your spending habits with intuitive charts and graphs."
                            color="bg-purple-500"
                        />
                        <FeatureCard
                            icon={<LuTrendingUp className="w-6 h-6 text-white" />}
                            title="Expense Tracking"
                            description="Log transactions in seconds and categorize them automatically."
                            color="bg-pink-500"
                        />
                        <FeatureCard
                            icon={<LuShieldCheck className="w-6 h-6 text-white" />}
                            title="Secure Data"
                            description="Your financial data is encrypted and stored securely."
                            color="bg-blue-500"
                        />
                        <FeatureCard
                            icon={<LuSmartphone className="w-6 h-6 text-white" />}
                            title="Mobile Friendly"
                            description="Access Fintrack from any device, anywhere, anytime."
                            color="bg-orange-500"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-primary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-purple-900/20">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to take control?</h2>
                            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">Join thousands of users who are mastering their finances with Fintrack today.</p>
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-8 py-3.5 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                Create Free Account
                            </button>
                        </div>

                        {/* Background Decor */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white"></div>
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-white"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xl">
                            F
                        </div>
                        <span className="text-xl font-bold text-gray-900">Fintrack</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Fintrack. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

const FeatureCard = ({ icon, title, description, color }) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 shadow-lg shadow-gray-200`}>
                {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>
    )
}

export default LandingPage;
