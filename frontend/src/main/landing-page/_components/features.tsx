const Features = () => {
  return (
    <div className="flex-1">
      <h3 className="text-3xl font-bold mb-6">Why Choose SkillSwap?</h3>
      <ul className="space-y-4">
        {[
          {
            title: 'Fast & Efficient',
            desc: 'Quick matching algorithm finds the perfect skill partners for you.',
          },
          {
            title: 'Safe & Secure',
            desc: 'Verified profiles and rating system ensure trustworthy exchanges.',
          },
          {
            title: 'Global Community',
            desc: 'Connect with skilled individuals from around the world.',
          },
          {
            title: 'Quality Assured',
            desc: 'Rating and feedback system maintains high-quality interactions.',
          },
        ].map((item, i) => (
          <li key={i}>
            <h4 className="font-semibold text-lg">{item.title}</h4>
            <p className="text-gray-500">{item.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Features;