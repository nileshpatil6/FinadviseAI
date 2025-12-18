'use client';

import { LegalPageLayout } from '@/components/LegalPageLayout';

export default function TermsOfServicePage() {
    return (
        <LegalPageLayout title="Terms & Conditions" lastUpdated="2025">
            <h3>1. Service Overview</h3>
            <p>
                UnyFiny provides financial information, product comparisons, and AI-generated recommendations. We do not issue cards, loans, or provide regulated advisory services.
            </p>

            <h3>2. Information Accuracy</h3>
            <p>
                We strive for accuracy but cannot guarantee real-time correctness. Users must verify details with banks before making any financial decisions.
            </p>

            <h3>3. AI Recommendations</h3>
            <p>
                AI suggestions do not assure approval and are not financial advice. They are based on available data and algorithms.
            </p>

            <h3>4. Third-Party Services</h3>
            <p>
                UnyFiny is not responsible for external websites or offers. When you click on bank links, you are subject to their terms and conditions.
            </p>

            <h3>5. User Responsibilities</h3>
            <p>
                Users must not misuse, scrape, reverse-engineer, or input false information on the platform.
            </p>

            <h3>6. Intellectual Property</h3>
            <p>
                All website content, branding, and algorithms belong to UnyFiny and are protected by intellectual property laws.
            </p>

            <h3>7. Limitation of Liability</h3>
            <p>
                UnyFiny is not liable for any financial losses or decision outcomes resulting from the use of our platform.
            </p>

            <h3>8. Updates</h3>
            <p>
                These terms may be updated at any time. Continued use of the platform constitutes acceptance of updated terms.
            </p>

            <h3>9. Contact</h3>
            <p>
                For questions about these terms, contact us at: <a href="mailto:unyfiny@gmail.com">unyfiny@gmail.com</a>
            </p>
        </LegalPageLayout>
    );
}
