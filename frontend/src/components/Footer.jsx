function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <h2>🌌 ExoDetect AI</h2>

        <p>
          AI-powered Exoplanet Detection using Machine Learning,
          FastAPI and React.
        </p>

        <p className="footer-copy">
          © {new Date().getFullYear()} ExoDetect AI. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;