# LearnSage

> An intelligent tutoring ecosystem with multimodal assistance, knowledge retrieval, and personalized assessment

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Project Roadmap](#project-roadmap)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Configuration](#configuration)
- [Data Pipelines](#data-pipelines)
- [Models and Training](#models-and-training)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Overview

LearnSage is a comprehensive AI-powered learning platform designed to provide students with personalized educational support through advanced language models, retrieval systems, and adaptive learning agents. The platform combines multimodal input processing, semantic search, and dynamic assessment to create a seamless learning experience.

At its core, LearnSage addresses the key challenges in digital learning:
- Providing instant, accurate responses to academic queries
- Supporting different learning modalities (text, image, etc.)
- Offering personalized learning paths based on individual performance
- Delivering high-quality, contextually relevant educational content

Our solution integrates cutting-edge technologies including Large Language Models (LLMs), vector databases, OCR systems, and personalized recommendation engines to deliver a truly adaptive learning experience.

## Features

### 1. Multimodal Query Resolution
- **Text and Image Input Support**: Submit questions via text or by uploading images of handwritten notes or textbook pages
- **OCR Processing**: Automatic extraction of text from uploaded images
- **Context-Aware Responses**: AI-generated explanations that consider the specific subject and difficulty level

### 2. AI-Generated Personalized Quizzes
- **Adaptive Difficulty**: Quizzes that adjust based on student performance
- **Subject-Specific Generation**: Tailored questions for different academic disciplines
- **Grammar and Quality Assurance**: Automatic verification of quiz content quality
- **Structured JSON Output**: Clean formatting of quiz data for consistent presentation

### 3. Knowledge Retrieval System
- **Vector Database Integration**: FAISS-powered semantic search for relevant educational content
- **Context Enhancement**: RAG (Retrieval-Augmented Generation) pipeline for accurate information retrieval
- **Efficient Indexing**: Fast content access with millisecond response times

### 4. Adaptive Learning Agents
- **Performance Tracking**: Monitoring of student progress across subjects and topics
- **Dynamic Difficulty Adjustment**: Content adaptation based on proficiency levels
- **Personalized Feedback**: Custom explanations for incorrect answers
- **Learning Path Optimization**: Suggested topics and resources based on progress

### 5. Educational Content Curation
- **YouTube Integration**: Automatic retrieval of relevant educational videos
- **Web Content Extraction**: Targeted scraping of educational resources
- **Resource Ranking**: Embedding-based similarity scoring for content relevance

### 6. Engagement Optimization
- **Smart Notification System**: Timely reminders to review explanations and complete learning activities
- **Progress Visualization**: Interactive dashboards showing learning advancement
- **Session Continuity**: Seamless resumption of learning activities across sessions

## Architecture

LearnSage follows a modern microservices architecture designed for scalability, maintainability, and performance.

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Client Layer                               │
│                                                                     │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐       │
│  │  Web Client  │      │ Mobile Client │      │  API Client  │       │
│  └──────────────┘      └──────────────┘      └──────────────┘       │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           API Gateway                                │
│                                                                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐     │
│  │   Auth     │  │   Routing  │  │   Rate     │  │   Logging  │     │
│  │  Service   │  │   Service  │  │  Limiting  │  │   Service  │     │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘     │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Application Services                          │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐              │
│  │  User        │  │  Quiz        │  │  Doubt        │              │
│  │  Service     │  │  Service     │  │  Resolver     │              │
│  └──────────────┘  └──────────────┘  └───────────────┘              │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐              │
│  │  Content     │  │  Analytics   │  │  Notification │              │
│  │  Service     │  │  Service     │  │  Service      │              │
│  └──────────────┘  └──────────────┘  └───────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        AI & ML Services                              │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐              │
│  │  LLM         │  │  OCR         │  │  Vector       │              │
│  │  Service     │  │  Service     │  │  Search       │              │
│  └──────────────┘  └──────────────┘  └───────────────┘              │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐              │
│  │  Prompt      │  │  Grammar     │  │  Agent        │              │
│  │  Engineering │  │  Check       │  │  System       │              │
│  └──────────────┘  └──────────────┘  └───────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           Data Layer                                 │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐              │
│  │  PostgreSQL  │  │  Redis       │  │  FAISS        │              │
│  │  Database    │  │  Cache       │  │  Vector DB    │              │
│  └──────────────┘  └──────────────┘  └───────────────┘              │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐                                 │
│  │  S3 / Blob   │  │  Monitoring  │                                 │
│  │  Storage     │  │  Data        │                                 │
│  └──────────────┘  └──────────────┘                                 │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Query Processing Flow**:
   - User submits a query (text or image)
   - If image, OCR Service extracts text
   - Query is processed by LLM Service with context from Vector Search
   - Response is generated and returned to the user

2. **Quiz Generation Flow**:
   - User requests a quiz for a specific subject/topic
   - Quiz Service coordinates with LLM Service to generate questions
   - Grammar Check Service ensures quality
   - Generated quiz is stored and presented to the user

3. **Learning Analytics Flow**:
   - User interactions and performance are logged
   - Analytics Service processes the data
   - Agent System uses analytics to personalize future content
   - Notification Service triggers relevant reminders

## Project Roadmap

LearnSage development follows a phased approach:

### Phase 1: Foundation (Completed)
- Basic platform architecture and infrastructure setup
- Initial user authentication and profile management
- Core database schema and API design
- Simple text-based query resolution with LLM integration

### Phase 2: Core Features (Completed)
- Multimodal input processing (text and images)
- Basic quiz generation functionality
- Initial vector search implementation
- Frontend user interface development
- Deployment pipeline establishment

### Phase 3: Advanced Features (Current)
- Enhanced RAG pipeline for improved accuracy
- Sophisticated prompt engineering techniques
- Adaptive quiz difficulty based on user performance
- Integration with YouTube API for content curation
- Notification system implementation

### Phase 4: Intelligence Layer (Upcoming)
- Advanced learning analytics dashboard
- Personalized learning paths generation
- Content recommendation engine
- Performance prediction models
- Extended subject coverage

### Phase 5: Scaling & Optimization (Planned)
- Infrastructure optimization for higher user loads
- Enhanced security features
- Mobile application development
- API marketplace for third-party integrations
- Enterprise deployment options

## Tech Stack

LearnSage utilizes a modern technology stack:

### Frontend
- **Framework**: React.js with Next.js
- **State Management**: Redux
- **Styling**: Tailwind CSS
- **API Client**: Axios
- **Testing**: Jest, React Testing Library

### Backend
- **Framework**: Django (Python)
- **API**: Django Rest Framework
- **Authentication**: JWT
- **Task Queue**: Celery with Redis
- **WebSockets**: Django Channels

### Databases
- **Primary Database**: PostgreSQL
- **Caching**: Redis
- **Vector Storage**: FAISS
- **File Storage**: AWS S3

### AI/ML Components
- **LLM Integration**: LangChain
- **Language Models**: Gemini
- **OCR Processing**: Amazon Textract
- **Grammar Checking**: Custom grammar API
- **Embeddings**: Sentence Transformers

### DevOps & Infrastructure
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus, Grafana
- **Logging**: ELK Stack

## Project Structure

The LearnSage codebase follows a modular organization:

```
learnsage/
│
├── ai_tutor/                 # Main Django app module
│   ├── migrations/           # Database migrations
│   │   ├── __init__.py
│   │   └── 0001_initial.py
│   ├── __init__.py
│   ├── admin.py              # Admin panel configuration
│   ├── apps.py               # App configuration
│   ├── models.py             # Database models
│   ├── serializers.py        # API serializers
│   ├── tests.py              # Unit tests
│   ├── urls.py               # URL routing
│   └── views.py              # View controllers
│
├── ai_tutor_bkend/           # Django project settings
│   ├── __init__.py
│   ├── asgi.py               # ASGI configuration
│   ├── settings.py           # Project settings
│   ├── urls.py               # Project URLs
│   └── wsgi.py               # WSGI configuration
│
├── frontend/                 # React frontend application
│   ├── public/               # Static assets
│   │   ├── fonts/            # Font files
│   │   ├── img/              # Image assets
│   │   ├── js/               # JavaScript files
│   │   ├── videos/           # Video files
│   │   ├── favicon.ico       # Site favicon
│   │   ├── index.html        # Main HTML file
│   │   └── vite.svg          # Vite logo
│   │
│   └── src/                  # Frontend source code
│       ├── assets/           # Frontend assets
│       ├── components/       # Reusable UI components
│       ├── constants/        # Constants and configuration
│       ├── sections/         # Page sections
│       ├── App.css           # Application styles
│       ├── App.jsx           # Main React component
│       ├── index.css         # Global styles
│       ├── main.jsx          # Entry point
│       └── color.txt         # Color palette
│
├── manage.py                 # Django management script
└── README.md                 # Project documentation
```

## Setup and Installation

### Prerequisites
- Python 3.9+
- Node.js 16+
- Docker and Docker Compose
- PostgreSQL 13+
- Redis 6+

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/learnsage.git
   cd learnsage
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Docker Setup

For a complete containerized setup:

```bash
docker-compose up -d
```

This will start all necessary services including the database, Redis, backend, and frontend.

## Configuration

LearnSage uses a centralized configuration system with environment variables for different environments:

### Core Configuration
- `DEBUG`: Toggle debug mode
- `SECRET_KEY`: Django secret key
- `ALLOWED_HOSTS`: List of allowed hosts

### Database Configuration
- `DB_NAME`: PostgreSQL database name
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_HOST`: Database host
- `DB_PORT`: Database port

### AI Service Configuration
- `LLM_API_KEY`: API key for the language model service
- `OCR_API_KEY`: API key for OCR service
- `EMBEDDING_MODEL`: Model name for embeddings
- `VECTOR_DB_PATH`: Path to the vector database

### External APIs
- `YOUTUBE_API_KEY`: YouTube API key for content curation
- `GRAMMAR_API_KEY`: Grammar checking API key

### Caching and Performance
- `REDIS_URL`: Redis connection string
- `CACHE_TIMEOUT`: Default cache timeout in seconds

## Data Pipelines

LearnSage implements several data pipelines for processing educational content:

### Content Ingestion Pipeline

1. **Source Acquisition**:
   - Educational PDFs, websites, and videos are identified
   - Content is fetched via APIs or web scraping

2. **Processing**:
   - Text extraction and cleaning
   - Section identification and structuring
   - Metadata extraction (subject, topic, difficulty)

3. **Embedding Generation**:
   - Content is divided into chunks
   - Embeddings are generated for each chunk
   - Vectors are stored in FAISS database

4. **Indexing**:
   - Content is indexed for fast retrieval
   - Metadata is stored in PostgreSQL
   - References are linked to original sources

### User Activity Pipeline

1. **Event Logging**:
   - User interactions are captured (queries, quiz attempts, etc.)
   - Performance metrics are recorded
   - Session data is aggregated

2. **Processing**:
   - Data normalization and enrichment
   - Pattern identification
   - Performance scoring

3. **Analytics Generation**:
   - Learning progress tracking
   - Knowledge gap identification
   - Personalization data preparation

## Models and Training

LearnSage leverages several AI models for different functionalities:

### Language Models

We utilize Gemini through the LangChain framework for:
- Query resolution
- Quiz generation
- Content summarization

The models are accessed via API with carefully engineered prompts to ensure educational quality and accuracy.

### Embedding Models

For vector embeddings, we use:
- **Sentence-BERT** for general text embedding
- **Domain-specific embeddings** for specialized subjects

These models are used to convert educational content and queries into vector representations for semantic search.

### OCR Model

For image processing and text extraction:
- Amazon Textract for high-quality OCR
- Custom post-processing for mathematical notation and diagrams

### Recommendation Model

For personalized content suggestions:
- Collaborative filtering for user similarity
- Content-based filtering for topic relevance
- Hybrid approach for optimal recommendations

## API Reference

LearnSage exposes a comprehensive REST API:

### Authentication Endpoints

- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login and get access token
- `POST /api/auth/refresh/` - Refresh access token
- `POST /api/auth/logout/` - Logout and invalidate token

### User Endpoints

- `GET /api/users/profile/` - Get user profile
- `PUT /api/users/profile/` - Update user profile
- `GET /api/users/progress/` - Get learning progress

### Query Resolution Endpoints

- `POST /api/doubts/text/` - Submit text query
- `POST /api/doubts/image/` - Submit image query
- `GET /api/doubts/history/` - Get query history

### Quiz Endpoints

- `POST /api/quizzes/generate/` - Generate quiz
- `GET /api/quizzes/` - List quizzes
- `GET /api/quizzes/{id}/` - Get quiz details
- `POST /api/quizzes/{id}/submit/` - Submit quiz answers

### Content Endpoints

- `GET /api/content/search/` - Search educational content
- `GET /api/content/videos/` - Get related videos
- `GET /api/content/recommended/` - Get recommended content

### Analytics Endpoints

- `GET /api/analytics/performance/` - Get performance metrics
- `GET /api/analytics/activity/` - Get activity summary
- `GET /api/analytics/insights/` - Get learning insights

## Contributing

We welcome contributions to LearnSage! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please ensure your code follows our coding standards and includes appropriate tests.

## License

LearnSage is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
