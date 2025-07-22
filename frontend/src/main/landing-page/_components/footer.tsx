const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h4 className="text-white font-semibold mb-2">SkillSwap</h4>
          <p>Connecting people through skill exchange and community learning.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Platform</h4>
          <ul>
            <li>How it Works</li>
            <li>Browse Skills</li>
            <li>Success Stories</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Safety Guidelines</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;