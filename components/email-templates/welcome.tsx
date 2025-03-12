type Params = {
    name: string;
  };
  
  function Welcome({ name }: Params) {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", color: "#333", textAlign: "center", padding: "20px" }}>
        {/* Company Logo */}
        <img
          src="https://copper-urgent-loon-814.mypinata.cloud/ipfs/bafkreiag2zhjruc22bm2zw5ome3htierrzwxwverz4eacfr3ysjliehuwi" // Replace with your actual image URL
          alt="Crypto Platform Logo"
          width="150"
          style={{ marginBottom: "20px" }}
        />
  
        {/* Welcome Message */}
        <h1>Welcome, {name}! 👋</h1>
        <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
          We’re excited to have you on board! 🚀 Start exploring copy trading, buying stocks, and making smart investments today.
        </p>
  
        {/* Hero Image */}
        <img
          src="https://copper-urgent-loon-814.mypinata.cloud/ipfs/bafkreifk74sk4medn3mglmhzstrohkfwx67dephu63irvqo5hcjumsob2i" // Replace with a relevant image
          alt="Crypto Trading"
          width="100%"
          style={{ maxWidth: "600px", margin: "20px auto", display: "block", borderRadius: "10px" }}
        />
  
        {/* Call to Action */}
        <a
          href="https://copytradingmarkets.com/dashboard"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          Get Started
        </a>
  
        {/* Footer */}
        <p style={{ marginTop: "20px", fontSize: "12px", color: "#777" }}>
          Need help? Contact our support team at <a href="mailto:support@yourcryptoplatform.com">support@yourcryptoplatform.com</a>
        </p>
      </div>
    );
  }
  
  export default Welcome;
  