import { Link } from "react-router-dom"

const Heroine = () => {
  return (
    <section className="bg-gray-900 text-white py-16 text-center px-4">
      <h3 className="text-3xl font-bold mb-4">Ready to Start Your Skill Journey?</h3>
      <p className="text-gray-400 mb-6">Join our growing community of learners and experts. Your next skill is just a swap away.</p>
      <Link
        to="/signup"
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md text-white font-medium"
      >
        Get Started Today →
      </Link>
    </section>
  );
};

export default Heroine;