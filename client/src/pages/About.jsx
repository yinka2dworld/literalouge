import Navbar from '../layout/Navbar.jsx';
import Footer from '../layout/Footer.jsx';

export const About = () => {
    return (
        <div style={{ fontFamily: 'Roboto, sans-serif', color: '#070c70', backgroundColor: '#f8f9fa', padding: '20px' }}>
            <Navbar />
            <header style={{ textAlign: 'center', padding: '40px 0', backgroundColor: '#070c70', color: '#fff' }}>
                <h1>About Literalouge</h1>
            </header>
            <main style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
                <section style={{ marginBottom: '30px' }}>
                    <p>
                        Welcome to <strong style={{ color: '#ff1493' }}>Literalouge</strong>! We are a platform dedicated to preserving and promoting African languages through literature. Our mission is to make books written in African languages accessible to everyone, free of charge, fostering a deeper appreciation for the diverse linguistic heritage of the continent.
                    </p>
                </section>
                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#ff1493' }}>Our Vision</h2>
                    <p>
                        At Literalouge, we believe that language is the foundation of culture and identity. Our vision is to ensure that future generations can connect with their roots and appreciate the beauty of African languages by providing access to written works in these languages.
                    </p>
                </section>
                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#ff1493' }}>What We Offer</h2>
                    <p>
                        Literalouge offers a curated collection of books in various African languages. These books are available for free download to support education, cultural preservation, and linguistic diversity.
                    </p>
                    <ul style={{ paddingLeft: '20px' }}>
                        <li>Books across multiple genres, including fiction, non-fiction, poetry, and folklore.</li>
                        <li>Content in languages such as Swahili, Yoruba, Zulu, Hausa, and many more.</li>
                        <li>An easy-to-use platform for discovering and downloading books.</li>
                    </ul>
                </section>
                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#ff1493' }}>Our Commitment</h2>
                    <p>
                        We are committed to ensuring that all the books shared on our platform are either in the public domain or made available with permission. If you are an author or rights holder and wish to collaborate or have concerns about any content, please reach out to us at <a href="mailto:support@literalouge.com" style={{ color: '#ff1493' }}>support@literalouge.com</a>.
                    </p>
                </section>
                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#ff1493' }}>Get Involved</h2>
                    <p>Join us in our mission to celebrate and preserve African languages:</p>
                    <ul style={{ paddingLeft: '20px' }}>
                        <li>Contribute books or resources to expand our library.</li>
                        <li>Share Literalouge with your community to help spread the word.</li>
                        <li>Support us by providing feedback or suggestions to improve the platform.</li>
                    </ul>
                </section>
                <section>
                    <h2 style={{ color: '#ff1493' }}>Contact Us</h2>
                    <p>Have questions or ideas? We’d love to hear from you. Reach out to us at:</p>
                    <p style={{ fontWeight: 'bold', color: '#070c70' }}>Email: <a href="mailto:support@literalouge.com" style={{ color: '#ff1493' }}>support@literalouge.com</a></p>
                    <p>Thank you for visiting Literalouge and supporting our mission to celebrate the richness of African languages through literature.</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
