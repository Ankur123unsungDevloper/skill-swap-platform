import Navbar from '../navbar/navbar';
import Features from './_components/features';
import Footer from './_components/footer';
import Heading from './_components/heading';
import Hero from './_components/hero';
import Heroine from './_components/heroine';
import Services from './_components/services';

const LandingPage= () => {
  return (
    <div>
      <Navbar />
      <Heading />
      <Hero />
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
          <Features />
          <Services />
        </div>
      </section>
      <Heroine />
      <Footer />
    </div>
  );
};

export default LandingPage;
