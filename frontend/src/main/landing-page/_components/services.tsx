const Services = () => {
  return (
    <div className="bg-white shadow p-6 rounded-lg w-full md:w-[300px]">
      <h4 className="font-semibold text-lg mb-1">Sarah Johnson</h4>
      <p className="text-sm text-gray-500 mb-2">UI/UX Designer</p>
      <p className="font-medium text-sm mb-1">Skills Offered:</p>
      <div className="flex gap-2 flex-wrap text-sm">
        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">Photoshop</span>
        <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded">UI Design</span>
      </div>
      <div className="text-yellow-500 mt-3 text-sm">⭐ 4.9 (24 reviews)</div>
    </div>
  );
};

export default Services;