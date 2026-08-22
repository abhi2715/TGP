const TermsOfService = () => {
  return (
    <div className="legal-page">
      <div className="container" style={{ maxWidth: '800px', padding: '11rem 0 5rem' }}>
        <h1 style={{ marginBottom: '2rem' }}>Terms of Service</h1>
        <p style={{ color: 'var(--color-text)', marginBottom: '3rem' }}>Last Updated: August 20, 2026</p>

        <div className="legal-content" style={{ lineHeight: '1.8', color: 'var(--color-text)' }}>
          <p>Please read these Terms of Service ("Terms") carefully before using the website operated by The Growth Project.</p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h3>
          <p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. Programmes and Coaching</h3>
          <p>Our programmes are designed for professional development. While we provide frameworks and guidance, the application and resulting success depend on the individual. We do not guarantee specific financial or career outcomes.</p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Intellectual Property</h3>
          <p>All content provided, including frameworks, worksheets, videos, and methodologies, is the exclusive property of The Growth Project and protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express permission.</p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. Termination</h3>
          <p>We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
