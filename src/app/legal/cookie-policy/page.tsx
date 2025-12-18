'use client';

import { LegalPageLayout } from '@/components/LegalPageLayout';

export default function CookiePolicyPage() {
    return (
        <LegalPageLayout title="Cookie Policy" lastUpdated="2025">
            <p>
                This Cookie Policy explains how UnyFiny uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <h3>What are cookies?</h3>
            <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work more efficiently and to provide reporting information.
            </p>

            <h3>Why do we use cookies?</h3>
            <p>
                We use cookies for several reasons:
            </p>
            <ul>
                <li>To remember your preferences and settings</li>
                <li>To understand how you use our platform and improve user experience</li>
                <li>To analyze traffic and usage patterns</li>
                <li>To provide personalized recommendations</li>
                <li>To ensure security and prevent fraud</li>
            </ul>

            <h3>Types of cookies we use</h3>
            <p>
                <strong>Essential Cookies:</strong> These are necessary for the website to function properly.
            </p>
            <p>
                <strong>Analytics Cookies:</strong> These help us understand how visitors interact with our website.
            </p>
            <p>
                <strong>Functionality Cookies:</strong> These enable enhanced functionality and personalization.
            </p>

            <h3>How to control cookies</h3>
            <p>
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit our site.
            </p>

            <h3>Contact</h3>
            <p>
                If you have any questions about our use of cookies, please contact us at: <a href="mailto:unyfiny@gmail.com">unyfiny@gmail.com</a>
            </p>
        </LegalPageLayout>
    );
}
