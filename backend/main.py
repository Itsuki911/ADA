import os
from dotenv import load_dotenv

from services.GroqAPI import ask_groq
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

groq_api_key = os.getenv('GROQ_API_KEY')

app = FastAPI()

origins = [
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

@app.post("/chat")
async def chat(request: ChatRequest):
    if groq_api_key is None:
        return {"error": "GROQ_API_KEY is not set in the environment variables."}
    
    result = ask_groq(request.message, apikey=groq_api_key)
    return {"result": result}