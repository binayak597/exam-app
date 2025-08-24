import { useEffect, useState } from "react";
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  BookOpen,
  Loader
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Exam() {
 
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10 * 60); 
  const [loading, setLoading] = useState(true);

  

  // Fetch exam questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
       
        
       
        const res = await api.get("/exam/start");
        setQuestions(res.data.questions);
      } catch (err) {
        console.error(err);
        
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Timer
  useEffect(() => {
    if (!timeLeft) handleSubmit(); // auto-submit
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-yellow-500 rounded-2xl mb-4 shadow-lg">
            <Loader className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-white text-lg">Loading exam questions...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [currentQ._id]: option.text });
  };

  const handleSubmit = async () => {
    const payload = {
      answers: Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      })),
    };

    try {
     
      
      
      const res = await api.post("/exam/submit", payload);
      navigate("/results", { state: { result: res.data } });
    } catch (err) {
      console.error(err);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getOptionStyle = (option) => {
    const isSelected = answers[currentQ._id] === option.text;
    const baseStyle = "w-full p-4 border rounded-xl text-left transition-all duration-300 flex items-center justify-between group";
    
    if (isSelected) {
      return `${baseStyle} bg-yellow-500/20 border-yellow-500 text-yellow-300`;
    }
    
    return `${baseStyle} bg-gray-700 border-gray-600 text-white hover:border-gray-500 hover:bg-gray-600`;
  };

  const getOptionIcon = (option) => {
    if (showResult && selectedOption && option.text === selectedOption.text) {
      return option.isCorrect ? 
        <CheckCircle className="w-5 h-5 text-green-400" /> : 
        <XCircle className="w-5 h-5 text-red-400" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-yellow-500 rounded-xl">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Question {currentIndex + 1} / {questions.length}
              </h2>
            </div>
            
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
              timeLeft < 300 ? 'bg-red-500/20 border border-red-500/50' : 'bg-gray-700'
            }`}>
              <Clock className={`w-5 h-5 ${timeLeft < 300 ? 'text-red-400' : 'text-gray-400'}`} />
              <span className={`font-mono text-lg ${timeLeft < 300 ? 'text-red-400' : 'text-white'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 mb-6 shadow-2xl">
          <p className="text-xl text-white leading-relaxed">{currentQ.questionText}</p>
        </div>

        {/* Options */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-6 shadow-2xl">
          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={option.text}
                onClick={() => handleOptionSelect(option)}
                className={getOptionStyle(option)}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center text-sm font-medium text-white">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-medium">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-2xl">
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
              disabled={currentIndex === 0}
              className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:transform-none"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((i) => i + 1)}
                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
              >
                <Send className="w-5 h-5" />
                <span>Submit Exam</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}