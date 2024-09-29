const Navigation = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between items-center">
        {/* Left-aligned links */}
        <li className="mr-auto">
          <a href="/" className="text-white">Home</a>
        </li>

        {/* Right-aligned links */}
        <div className="flex space-x-4">
          <li><a href="/login" className="text-white">Login</a></li>
          <li><a href="/register" className="text-white">Register</a></li>
          <li><a href="/add" className="text-white">Add List</a></li>
          <li><a href="/all" className="text-white">View All Lists</a></li>
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;
