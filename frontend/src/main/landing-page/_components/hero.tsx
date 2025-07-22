const Hero = () => {
  return (
    <section className="text-center py-16 px-4">
      <h3 className="text-3xl font-bold mb-4">How SkillSwap Works</h3>
      <p className="text-gray-500 mb-10">Simple, secure, and effective skill exchange in three easy steps</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: 'Create Your Profile',
            desc: 'List your skills, set availability, and tell the community what you want to learn.',
            icon: '👤',
          },
          {
            title: 'Find Perfect Matches',
            desc: 'Search for people with skills you want to learn, filtered by location and availability.',
            icon: '🔍',
          },
          {
            title: 'Start Swapping',
            desc: 'Send swap requests, connect, and begin your skill exchange journey.',
            icon: '💬',
          },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-4">{item.icon}</div>
            <h4 className="font-semibold text-xl mb-2">{item.title}</h4>
            <p className="text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;