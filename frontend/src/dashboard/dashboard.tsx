import Navbar from "../main/navbar/navbar";

const DashBoard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)]"></div>
    </div>
  );
};

export default DashBoard;