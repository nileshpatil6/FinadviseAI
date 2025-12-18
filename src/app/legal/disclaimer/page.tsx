'use client';

import { LegalPageLayout } from '@/components/LegalPageLayout';

export default function DisclaimerPage() {
    return (
        <LegalPageLayout title="Disclaimer" lastUpdated="2025">
            <p>
                UnyFiny is an AI-driven financial comparison platform. We do not guarantee approvals, accuracy of bank data, or investment outcomes.
            </p>

            <p>
                <strong>Important Notice:</strong> We are not a bank, NBFC, or SEBI/RBI registered advisor. The information and recommendations provided on this platform are for informational purposes only and should not be considered as financial advice.
            </p>

            <h3>No Guarantee of Approval</h3>
            <p>
                While our AI algorithms analyze your profile and suggest suitable products, we cannot guarantee that you will be approved for any financial product. Final approval decisions rest with the respective banks and financial institutions.
            </p>

            <h3>Data Accuracy</h3>
            <p>
                We make every effort to ensure that the information displayed is accurate and up-to-date. However, interest rates, fees, terms, and conditions are subject to change by the financial institutions. Users should verify all details independently before applying.
            </p>

            <h3>Investment Outcomes</h3>
            <p>
                Past performance of mutual funds or other investment products is not indicative of future results. All investments carry risk, and users should conduct their own research or consult with a certified financial advisor before making investment decisions.
            </p>

            <h3>User Responsibility</h3>
            <p>
                By using UnyFiny, you acknowledge that you are responsible for verifying all information and making your own informed financial decisions. We recommend consulting with qualified financial professionals for personalized advice.
            </p>

            <h3>Contact</h3>
            <p>
                For any questions or concerns, please contact us at: <a href="mailto:unyfiny@gmail.com">unyfiny@gmail.com</a>
            </p>
        </LegalPageLayout>
    );
}
