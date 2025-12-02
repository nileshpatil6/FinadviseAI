import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Products */}
                <div>
                    <h4 className="text-lg font-semibold mb-6">Products</h4>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/platform?product=credit-cards" className="hover:text-emerald-400 transition-colors text-slate-300">
                                Credit Cards
                            </Link>
                            <p className="text-xs text-slate-500 mt-1">AI-powered card recommendations</p>
                        </li>
                        <li>
                            <Link href="/platform?product=personal-loans" className="hover:text-emerald-400 transition-colors text-slate-300">
                                Personal Loans
                            </Link>
                            <p className="text-xs text-slate-500 mt-1">Instant matched loan offers</p>
                        </li>
                        <li>
                            <Link href="/platform?product=home-loans" className="hover:text-emerald-400 transition-colors text-slate-300">
                                Home Loans
                            </Link>
                            <p className="text-xs text-slate-500 mt-1">Compare rates and eligibility</p>
                        </li>
                        <li>
                            <Link href="/platform?product=mutual-funds" className="hover:text-emerald-400 transition-colors text-slate-300">
                                Mutual Funds
                            </Link>
                            <p className="text-xs text-slate-500 mt-1">Goal-based fund recommendations</p>
                        </li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h4 className="text-lg font-semibold mb-6">Company</h4>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/about" className="hover:text-emerald-400 transition-colors text-slate-300">
                                About Us
                            </Link>
                            <p className="text-xs text-slate-500 mt-1">AI-driven financial platform</p>
                        </li>
                        <li>
                            <Link href="/careers" className="hover:text-emerald-400 transition-colors text-slate-300">
                                Careers
                            </Link>
                            <p className="text-xs text-slate-500 mt-1">Join our team</p>
                        </li>
                        <li>
                            <Link href="/press" className="hover:text-emerald-400 transition-colors text-slate-300">
                                Press
                            </Link>
                            <p className="text-xs text-slate-500 mt-1">Latest announcements</p>
                        </li>
                        <li>
                            <a href="mailto:bankbuz@gmail.com" className="hover:text-emerald-400 transition-colors text-slate-300">
                                Contact
                            </a>
                            <p className="text-xs text-slate-500 mt-1">bankbuz@gmail.com</p>
                        </li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h4 className="text-lg font-semibold mb-6">Resources</h4>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/platform" className="hover:text-emerald-400 transition-colors text-slate-300">
                                Platform
                            </Link>
                        </li>
                        <li>
                            <Link href="/platform?product=emi-calculator" className="hover:text-emerald-400 transition-colors text-slate-300">
                                Calculators
                            </Link>
                        </li>
                        <li>
                            <a href="#how-it-works" className="hover:text-emerald-400 transition-colors text-slate-300">
                                How It Works
                            </a>
                        </li>
                        <li>
                            <a href="#features" className="hover:text-emerald-400 transition-colors text-slate-300">
                                Features
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="text-lg font-semibold mb-6">Legal</h4>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/legal/privacy-policy" className="hover:text-emerald-400 transition-colors text-slate-300">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/legal/terms-of-service" className="hover:text-emerald-400 transition-colors text-slate-300">
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link href="/legal/disclaimer" className="hover:text-emerald-400 transition-colors text-slate-300">
                                Disclaimer
                            </Link>
                        </li>
                        <li>
                            <Link href="/legal/cookie-policy" className="hover:text-emerald-400 transition-colors text-slate-300">
                                Cookie Policy
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-slate-800 mt-12 pt-8 text-center">
                <p className="text-slate-400 text-sm mb-2">
                    BankBuz is an AI-driven financial comparison platform. We are not a bank, NBFC, or SEBI/RBI registered advisor.
                </p>
                <p className="text-slate-500 text-sm">
                    © 2025 BankBuz. All rights reserved. Made with ❤️ for India 🇮🇳
                </p>
            </div>
        </footer>
    );
};
