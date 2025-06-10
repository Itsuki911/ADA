import React from 'react';
import { MessageSquare, Lightbulb, Code, PenTool, Globe } from 'lucide-react';

interface WelcomeScreenProps {
  onAIResponse: (question: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onAIResponse }) => {
  const sampleQuestions = [
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Explain quantum computing",
      subtitle: "in simple terms"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Write a Python function",
      subtitle: "to sort a list"
    },
    {
      icon: <PenTool className="w-5 h-5" />,
      title: "Help me write an email",
      subtitle: "for a job application"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Plan a trip to Japan",
      subtitle: "for 2 weeks"
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl inline-block mb-6">
          <MessageSquare className="w-12 h-12 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Welcome to ChatBot
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          I'm here to help you with questions, creative tasks, analysis, and more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {sampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => onAIResponse(question.title + " " + question.subtitle)}
              className="p-4 text-left border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-blue-600 group-hover:text-blue-700">
                  {question.icon}
                </div>
                <span className="font-medium text-gray-900">{question.title}</span>
              </div>
              <p className="text-sm text-gray-600">{question.subtitle}</p>
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-500">
          <p>Start a conversation by typing a message below or click on one of the examples above.</p>
        </div>
      </div>
    </div>
  );
};