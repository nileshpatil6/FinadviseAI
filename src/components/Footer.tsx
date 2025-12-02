import Link from 'next/link';
import Image from 'next/image';
import { Globe, Users } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <Image
                                src="/images/logo.png"
                                alt="BankBuz Logo"
                                width={150}
                                height={40}
                                className="h-8 w-auto object-contain"
                            />
                        </div>
                        <p className="text-slate-500 mb-6 max-w-sm leading-relaxed">
                            The next generation of financial aggregation. We use AI to match you with the perfect financial products, saving you time and money.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors">
                                <Globe className="w-5 h-5 text-slate-600" />
                            </div>
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors">
                                <Users className="w-5 h-5 text-slate-600" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Products</h4>
                        <ul className="space-y-4 text-slate-600">
                            <li><Link href="/platform?product=credit-cards" className="hover:text-blue-600 transition-colors">Credit Cards</Link></li>
                            <li><Link href="/platform?product=personal-loans" className="hover:text-blue-600 transition-colors">Personal Loans</Link></li>
                            <li><Link href="/platform?product=home-loans" className="hover:text-blue-600 transition-colors">Home Loans</Link></li>
                            <li><Link href="/platform?product=mutual-funds" className="hover:text-blue-600 transition-colors">Mutual Funds</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                        <ul className="space-y-4 text-slate-600">
                            <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-blue-600 transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
                        <ul className="space-y-4 text-slate-600">
                            <li><Link href="/legal/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/legal/terms-of-service" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/legal/disclaimer" className="hover:text-blue-600 transition-colors">Disclaimer</Link></li>
                            <li><Link href="/legal/cookie-policy" className="hover:text-blue-600 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        © {new Date().getFullYear()} BankBuz. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-400">
                        <Link href="/legal/privacy-policy" className="hover:text-slate-600 transition-colors">Privacy</Link>
                        <Link href="/legal/terms-of-service" className="hover:text-slate-600 transition-colors">Terms</Link>
                        <Link href="/sitemap" className="hover:text-slate-600 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
