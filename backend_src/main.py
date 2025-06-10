import os
from dotenv import load_dotenv

from services.GroqAPI import ask_groq

load_dotenv()

groq_api_key = os.getenv('GROQ_API_KEY')

if __name__ == "__main__":
    if groq_api_key is None:
        raise ValueError(
            "GROQ_API_KEY is not set in the environment variables."
        )
    
    result = ask_groq(
        "Explain the importance of fast language models", 
        apikey=groq_api_key
    )
    print("result: ", result)