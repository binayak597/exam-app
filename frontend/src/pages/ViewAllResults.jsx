import { useEffect, useState, useContext } from "react";
import { 
  Trophy, 
  Home, 
  Calendar, 
  Target, 
  CheckCircle, 
  AlertCircle,
  BookOpen,
  LogOut
} from "lucide-react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ViewAllResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);


  const handleLogout = () => {

    logout();
    toast.success("Logout Successful");
    navigate("/login");
  }

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get("/results");
        setResults(res.data);
        toast.success("Exam results fetched successfully");
      } catch (err) {
        setError("Failed to fetch results");
        toast.error("Results loading failed");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-yellow-500 rounded-2xl mb-4 shadow-lg">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">My Exam Results</h1>
          <p className="text-gray-400">Track your exam performance and progress</p>
        </div>

        {/* Results Container */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
          {results.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No results found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-700/50 border-b border-gray-600">
                    <th className="py-4 px-6 text-left text-gray-300 font-medium">#</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-medium">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>Score</span>
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left text-gray-300 font-medium">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Attempted</span>
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left text-gray-300 font-medium">Total Questions</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-medium">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Date</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, index) => (
                    <tr 
                      key={r._id} 
                      className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors duration-200"
                    >
                      <td className="py-4 px-6 text-gray-300 font-medium">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full"></div>
                          <span className="text-white font-semibold">{r.score}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300">{r.attempted}</td>
                      <td className="py-4 px-6 text-gray-300">{r.totalQuestions}</td>
                      <td className="py-4 px-6 text-gray-400 text-sm">
                        {new Date(r.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Home Button */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAllResults;