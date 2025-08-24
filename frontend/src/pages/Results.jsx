import { Trophy, Home, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  
  const location = useLocation();
  const result = location.state?.result;
  
  const navigate = useNavigate();

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-white text-lg">No results available. Please take an exam first.</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'from-green-500/20 to-green-500/10 border-green-500/30';
    if (score >= 60) return 'from-yellow-500/20 to-yellow-500/10 border-yellow-500/30';
    return 'from-red-500/20 to-red-500/10 border-red-500/30';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-yellow-500 rounded-2xl mb-6 shadow-lg">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Exam Results</h1>
        </div>

        {/* Results Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 mb-6 transition-all duration-300">
          {/* Score Display */}
          <div className={`bg-gradient-to-br ${getScoreBgColor(result.score)} border rounded-2xl p-6 mb-6 text-center`}>
            <p className="text-gray-300 text-sm font-medium mb-2">Your Score</p>
            <p className={`text-5xl font-bold ${getScoreColor(result.score)} mb-2`}>
              {result.score}
            </p>
            <p className="text-gray-400 text-sm">out of 100</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 border border-gray-600 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm font-medium mb-1">Attempted Questions</p>
              <p className="text-2xl font-bold text-white">{result.attempted}</p>
            </div>

            <div className="bg-gray-700 border border-gray-600 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm font-medium mb-1">Total Questions</p>
              <p className="text-2xl font-bold text-white">{result.totalQuestions}</p>
            </div>
          </div>
        </div>

        {/* Home Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="group bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-3 mx-auto"
          >
            <Home className="w-6 h-6" />
            <span className="text-lg">Home</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
}