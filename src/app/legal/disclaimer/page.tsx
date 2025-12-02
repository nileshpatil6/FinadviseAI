'use client';

import { LegalPageLayout } from '@/components/LegalPageLayout';

export default function DisclaimerPage() {
    return (
        <LegalPageLayout title="Disclaimer" lastUpdated="September 15, 2025">
            <p>
                <strong>[Content from BankBuz_Legal_Content.docx - Disclaimer Section]</strong>
            </p>
            <p>
                The information provided by BankBuz ("we," "us," or "our") on our website is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
            </p>
            <h3>Financial Disclaimer</h3>
            <p>
                BankBuz is not a financial advisor. The content on this site is not intended to be a substitute for professional financial advice. Always seek the advice of your financial advisor or other qualified financial provider with any questions you may have regarding your financial situation.
            </p>
        </LegalPageLayout>
    );
}
