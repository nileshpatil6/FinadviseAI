'use client';

import { LegalPageLayout } from '@/components/LegalPageLayout';

export default function PrivacyPolicyPage() {
    return (
        <LegalPageLayout title="Privacy Policy" lastUpdated="September 15, 2025">
            <p>
                <strong>[Content from BankBuz_Legal_Content.docx - Privacy Policy Section]</strong>
            </p>
            <p>
                At BankBuz, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
            {/* Placeholder content - User needs to fill this in */}
            <h3>1. Information We Collect</h3>
            <p>
                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul>
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            </ul>
        </LegalPageLayout>
    );
}
