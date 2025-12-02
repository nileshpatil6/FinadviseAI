import React from 'react';
import { Footer } from '@/components/Footer';

interface LegalPageLayoutProps {
    title: string;
    lastUpdated?: string;
    children: React.ReactNode;
}

export const LegalPageLayout = ({ title, lastUpdated, children }: LegalPageLayoutProps) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h1>
                    {lastUpdated && (
                        <p className="text-slate-500 mb-8">Last Updated: {lastUpdated}</p>
                    )}
                    <div className="text-slate-900 prose prose-slate max-w-none prose-headings:!text-slate-900 prose-p:!text-slate-900 prose-strong:!text-slate-900 prose-li:!text-slate-900 prose-a:!text-blue-600 hover:prose-a:!text-blue-700">
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
