'use client';

import { LegalPageLayout } from '@/components/LegalPageLayout';

export default function PrivacyPolicyPage() {
    return (
        <LegalPageLayout title="Privacy Policy" lastUpdated="2025">
            <h3>1. Information We Collect</h3>
            <p>
                We collect personal information, usage data, device data, and financial preferences to provide you with personalized recommendations.
            </p>

            <h3>2. How We Use Data</h3>
            <p>
                We use your data to improve recommendations, personalise results, and enhance platform performance.
            </p>

            <h3>3. Sharing of Information</h3>
            <p>
                We only share limited information with partners when you initiate an action (such as applying for a product).
            </p>

            <h3>4. Data Security</h3>
            <p>
                We use encryption and industry standards to protect your data, but we cannot guarantee absolute security.
            </p>

            <h3>5. Cookies</h3>
            <p>
                We use cookies for a better user experience and analytics.
            </p>

            <h3>6. User Rights</h3>
            <p>
                You have the right to request data deletion, correction, and access to your information.
            </p>

            <h3>7. Third-Party Links</h3>
            <p>
                External sites linked from our platform operate under their own privacy policies.
            </p>

            <h3>8. Updates</h3>
            <p>
                This policy may be updated from time to time. Please check back regularly.
            </p>

            <h3>9. Contact</h3>
            <p>
                For any privacy-related questions, please contact us at: <a href="mailto:unyfiny@gmail.com">unyfiny@gmail.com</a>
            </p>
        </LegalPageLayout>
    );
}
