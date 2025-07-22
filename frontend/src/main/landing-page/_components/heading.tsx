import { Link } from "react-router-dom";

const Heading = () => {
  return (
    <section className="text-center py-20 bg-gradient-to-b from-white to-blue-50 px-4">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Exchange Skills, <span className="text-violet-600">Build Community</span>
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-10 text-lg">
        Connect with talented individuals worldwide. Share your expertise, learn new skills, and grow together in our vibrant skill-sharing community.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition">
          Start Swapping Skills →
        </Link>
        <button className="border px-6 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition">
          Watch Demo
        </button>
      </div>
    </section>
  );
};

export default Heading;