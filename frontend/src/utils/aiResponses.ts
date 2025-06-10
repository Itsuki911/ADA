export const generateAIResponse = (userMessage: string): string => {
  const responses = [
    "I understand you're asking about that. Let me help you with a comprehensive answer. This is a complex topic that requires careful consideration of multiple factors.",
    
    "That's a great question! Based on my knowledge, I can provide you with several perspectives on this matter. Here's what I think would be most helpful:",
    
    "I'd be happy to help you with that. This is an interesting topic that touches on several important concepts. Let me break it down for you:",
    
    "Thank you for your question. This is something I can definitely assist with. Here's my analysis and recommendations:",
    
    "That's a thoughtful inquiry. I can provide you with detailed information about this topic, including some practical examples and considerations:",
  ];

  // Simple keyword-based responses for demonstration
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('code') || lowerMessage.includes('program') || lowerMessage.includes('function')) {
    return `I'd be happy to help you with coding! Here's a simple example:

\`\`\`python
def example_function():
    return "Hello, World!"
\`\`\`

This is just a basic example. Could you provide more details about what specific programming task you'd like help with? I can assist with various programming languages and concepts.`;
  }
  
  if (lowerMessage.includes('explain') || lowerMessage.includes('what is')) {
    return `Great question! I'd be happy to explain this concept to you.

This topic involves several key components:
• First, let me provide some background context
• Then I'll explain the main principles
• Finally, I'll give you some practical examples

Would you like me to dive deeper into any particular aspect of this explanation?`;
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('how to')) {
    return `I'm here to help! For this type of task, I recommend following these steps:

1. **Start with the basics** - Make sure you understand the fundamentals
2. **Plan your approach** - Think through the process step by step  
3. **Take action** - Begin implementing your plan
4. **Review and refine** - Make adjustments as needed

Is there a specific part of this process you'd like me to elaborate on?`;
  }

  // Random response for other messages
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return `${randomResponse}

I notice you mentioned "${userMessage}". This is definitely something I can help you explore further. Would you like me to provide more specific information or examples related to your question?`;
};