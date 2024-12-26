# RAG API

A basic Retrieval-Augmented Generation (RAG) API built with Node.js that enhances Large Language Model responses using document context. This API allows you to upload PDF documents and ask questions about their content, leveraging the power of LangChain, Ollama, and ChromaDB for efficient document processing and retrieval.

## 🌟 Features

- PDF document processing and chunking
- Vector-based semantic search using ChromaDB
- Integration with Ollama for embeddings and chat
- Express.js REST API endpoints
- Efficient document chunking with RecursiveCharacterTextSplitter
- Automatic file cleanup after processing

## 🚀 Getting Started

### Prerequisites

- Node.js
- Docker (for ChromaDB)
- [Ollama](https://ollama.com/) installed locally

### Installation

1. Clone the repository:
```bash
git clone https://github.com/julianofirme/rag-api.git
cd rag-api
```

2. Install dependencies:
```bash
npm install
```

3. Start ChromaDB using Docker:
```bash
docker-compose up -d
```

## 🔧 Project Structure

```
rag-api/
├── api.js          # Main Express.js server
├── rag.js          # RAG implementation logic
├── data/           # Temporary storage for uploaded files
└── docker-compose.yml
```

## 📚 Usage

1. Start the API server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### API Endpoints

#### Upload Document and Ask Question
```http
POST /upload
Content-Type: multipart/form-data

file: your-document.pdf
question: "Your question about the document"
```

The API will:
1. Process the uploaded PDF
2. Split it into manageable chunks
3. Store embeddings in ChromaDB
4. Generate a response based on the relevant context
5. Automatically clean up the uploaded file

## 🛠 Technical Details

- Uses LangChain.js for document processing and RAG implementation
- Implements ChromaDB as the vector store
- Utilizes Ollama for embeddings and chat completion
- Chunks documents into 500-character segments for optimal processing
