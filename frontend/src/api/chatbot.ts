const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8001';

export const sendMessageToChatbot = async (message: string): Promise<{ result: string }> => {
    const response = await fetch(`${backendUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
  
    const data = await response.json();
    return data;
  };