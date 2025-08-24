import { BookOpen, Play, BarChart3, ArrowRight } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ExamDashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-yellow-500 rounded-2xl mb-6 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Exam Dashboard</h1>
          <p className="text-gray-400">Choose an option to continue</p>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
          <div className="space-y-4">
            <button
              onClick={() => navigate("/exam/start")}
              className="group w-full bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Play className="w-6 h-6" />
                </div>
                <span className="text-lg">Start Exam</span>
              </div>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            <button
              onClick={() => navigate("/view-all-results")}
              className="group w-full bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-500/20 p-2 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-yellow-400" />
                </div>
                <span className="text-lg">View All Results</span>
              </div>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
