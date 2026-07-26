const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="container" style={{ maxWidth: '800px', padding: '10rem 0 5rem' }}>
        <h1 style={{ marginBottom: '2rem' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--color-text)', marginBottom: '3rem' }}>Last Updated: August 20, 2026</p>

        <div className="legal-content" style={{ lineHeight: '1.8', color: 'var(--color-text)' }}>
          <p>The Growth Project ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by The Growth Project.</p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h3>
          <p>We collect information you provide directly to us when you create an account, subscribe to our newsletter, apply for a programme, or otherwise communicate with us. This may include your name, email address, professional title, company, and payment information.</p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Your Information</h3>
          <p>We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you related information, and to personalize your experience. We do not sell your personal data to third parties.</p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Data Security</h3>
          <p>We implement reasonable security measures to protect the confidentiality and security of your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@thegrowthproject.com" style={{ color: 'var(--color-secondary)' }}>privacy@thegrowthproject.com</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
