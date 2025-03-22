import React from "react";

const PrivacyPolicy = () => {
    return (
        <main className="max-w-4xl mx-auto p-15 rounded-lg translate-y-[5rem] max-[941px]:p-6">
            <h1 className="text-3xl font-bold mb-10 text-center max-[941px]:mb-7">Privacy Policy</h1>
            <p className="mb-4">Last Updated: <b>Mar, 17, 2025.</b></p>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
                <ul className="list-disc ml-6">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, and other details when you register.</li>
                    <li><strong>Usage Data:</strong> Information about your interactions with our platform.</li>
                    <li><strong>Device Information:</strong> IP address, browser type, and operating system.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
                <ul className="list-disc ml-6">
                    <li>To provide and improve our services.</li>
                    <li>To facilitate giveaways and user communication.</li>
                    <li>To detect fraud or security breaches.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
                <p>We implement reasonable security measures to protect your data, but no system is 100% secure.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Data Sharing</h2>
                <p>We do not sell your personal data. However, we may share it with third-party services for verification, legal compliance, or fraud prevention.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Cookies and Tracking</h2>
                <p>We use cookies to enhance user experience. You can manage cookies in your browser settings.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Your Rights & Choices</h2>
                <ul className="list-disc ml-6">
                    <li>Access, update, or delete your personal data.</li>
                    <li>Opt-out of marketing communications.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
                <p>We may update this Privacy Policy periodically. Continued use of our platform means you accept the changes.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
                <address>For privacy-related inquiries, contact us at <b>awaays.info@gmail.com</b>.</address>
            </section>
        </main>
    );
};

export default PrivacyPolicy;
