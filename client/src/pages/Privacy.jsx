import Navbar from '../layout/Navbar.jsx';
import Footer from '../layout/Footer.jsx';

export const Privacy = () => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#070c70',backgroundColor: '#f8f9fa', }}>
            <Navbar />
            <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', borderRadius: '8px', marginTop:'30px', marginBottom:'30px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ textAlign: 'center', color: '#ff1493', borderBottom: '2px solid #070c70', paddingBottom: '10px' }}>Privacy Policy</h1>
                <p>
                    Welcome to Literalouge! Your privacy is important to us. This Privacy Policy explains how we collect, use, and share
                    information about you when you use our website. By using the Service, you agree to the terms outlined in this policy.
                </p>

                <h2 style={{ color: '#ff1493' }}>1. Information We Collect</h2>
                <p>
                    We do not collect personal information unless you voluntarily provide it through contact forms or other interactions
                    on the Service. The information we may collect includes your name, email address, or any details you share with us.
                </p>

                <h2 style={{ color: '#ff1493' }}>2. How We Use Your Information</h2>
                <p>Any information we collect is used to:</p>
                <ul>
                    <li>Respond to your inquiries or provide support.</li>
                    <li>Improve the functionality and user experience of the Service.</li>
                </ul>

                <h2 style={{ color: '#ff1493' }}>3. Third-Party Services</h2>
                <p>
                    We may use third-party services to maintain and improve the Service. These third-party services may collect and
                    process data according to their own privacy policies.
                </p>

                <h2 style={{ color: '#ff1493' }}>4. Content Disclaimer</h2>
                <p>
                    Literalouge provides access to books in African languages for free download. We do not claim ownership of the books
                    available on the Service. All content is provided and is believed to be in the public domain or shared with
                    permission. If you are the rightful owner of any content on this site and believe it is being used improperly, please
                    contact us immediately at <a href="mailto:support@literalouge.com" style={{ color: '#070c70' }}>support@literalouge.com</a> to request removal or appropriate attribution.
                </p>

                <h2 style={{ color: '#ff1493' }}>5. User Responsibility</h2>
                <p>By using the Service, you agree to:</p>
                <ul>
                    <li>Use the content responsibly and in compliance with applicable laws.</li>
                    <li>Acknowledge that Literalouge is not liable for how you use the materials provided.</li>
                </ul>

                <h2 style={{ color: '#ff1493' }}>6. Security</h2>
                <p>
                    We take reasonable measures to protect the information shared with us. However, no method of transmission over the
                    Internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security.
                </p>

                <h2 style={{ color: '#ff1493' }}>7. Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. Changes will be effective upon posting the revised policy on this
                    page. Please review this page periodically for updates.
                </p>

                <h2 style={{ color: '#ff1493' }}>8. Contact Us</h2>
                <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                <p style={{ fontWeight: 'bold' }}>Email: <a href="mailto:support@literalouge.com" style={{ color: '#070c70' }}>support@literalouge.com</a></p>
                <p>By using Literalouge, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.</p>
            </div>
            <Footer />
        </div>
    );
}

export default Privacy;
