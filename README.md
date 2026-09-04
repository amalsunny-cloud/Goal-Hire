# Goal-Hire

> A full-stack job application tracking platform built with Next.js and TypeScript to help job seekers organize applications, manage interviews, analyze their job search, and stay on top of follow-ups.

## Overview

**Goal-Hire** is a personal job-search management platform designed to replace scattered spreadsheets, notes, and reminders with one centralized workspace.

It provides an authenticated dashboard where users can:

- Manage job applications
- Track application stages
- Manage interviews
- View job-search analytics
- Organize follow-ups and goals
- Visualize application progress

The application is built using the **Next.js App Router** with **MongoDB and Mongoose** for data persistence. Backend functionality is implemented using **Next.js Route Handlers**, with JWT-based authentication for protected user data.

The project is also containerized with **Docker** and uses **GitHub Actions** to automatically build and publish the Docker image to **Docker Hub** when changes are pushed to the `main` branch.

---

## Features

### Authentication & Security

- JWT-based user authentication
- Protected dashboard routes
- User-specific application and interview data
- Password hashing with `bcryptjs`
- Environment-based secret configuration

### Job Application Management

- Create, view, update, and delete job applications
- Track application status and progress
- Store company and job-role information
- Record application sources and relevant details
- Search, filter, and organize applications

### Kanban Workflow

- Drag-and-drop application workflow
- Visualize applications by their current stage
- Move applications between workflow stages
- Powered by `@hello-pangea/dnd`

### Interview Management

- Create and manage interviews
- Track upcoming interviews
- View interview history
- Interview analytics
- Calendar-based interview visualization

### Dashboard & Analytics

- Application statistics
- Application funnel visualization
- Application trends
- Company and source insights
- Interview analytics
- Upcoming interviews
- Recent applications
- Goal and progress tracking

### Productivity

- Follow-up and reminder support
- Goal tracking
- Calendar view
- Centralized job-search activity

### User Interface

- Responsive dashboard
- Reusable React components
- Toast notifications
- Loading and empty states
- Interactive charts
- Tailwind CSS styling

### Integrations & Additional Capabilities

- **Cloudinary** for cloud-based media/file handling
- **Resend** for email functionality
- **jsPDF** and **jspdf-autotable** for PDF generation

---

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 16 |
| Language | TypeScript |
| Frontend | React 19 |
| Styling | Tailwind CSS 4 |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT, `jose`, `jsonwebtoken`, `bcryptjs` |
| API | Next.js Route Handlers |
| Charts | Recharts |
| Drag & Drop | `@hello-pangea/dnd` |
| Calendar | React Calendar, React Big Calendar |
| Notifications | React Hot Toast |
| Icons | Lucide React |
| Email | Resend |
| Cloud Storage | Cloudinary |
| PDF | jsPDF, jspdf-autotable |
| Date Handling | Moment.js |
| Containerization | Docker |
| Container Registry | Docker Hub |
| CI/CD | GitHub Actions |
| Version Control | Git & GitHub |

---

## Architecture

Goal-Hire follows a **full-stack Next.js architecture**, keeping the frontend and backend functionality within the same application.

```text
                         ┌──────────────────────┐
                         │       Browser        │
                         │   React / Next.js    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Next.js App       │
                         │    Router / UI       │
                         └──────────┬───────────┘
                                    │
                     ┌──────────────┴──────────────┐
                     │                             │
                     ▼                             ▼
           ┌──────────────────┐          ┌──────────────────┐
           │ React Components │          │ Route Handlers   │
           │ Dashboard / UI   │          │     /api/...     │
           └──────────────────┘          └────────┬─────────┘
                                                  │
                                    ┌─────────────┴─────────────┐
                                    │                           │
                                    ▼                           ▼
                           ┌─────────────────┐        ┌──────────────────┐
                           │ Authentication  │        │ Mongoose Models  │
                           │ JWT / bcryptjs  │        │ & DB Operations  │
                           └─────────────────┘        └────────┬─────────┘
                                                               │
                                                               ▼
                                                       ┌─────────────────┐
                                                       │     MongoDB     │
                                                       │     Database    │
                                                       └─────────────────┘

                         External Services
                         ├── Cloudinary → Media/file storage
                         └── Resend     → Email delivery
```

### Request Flow

A typical authenticated request follows this flow:

```text
User interaction
      ↓
React / Next.js UI
      ↓
Next.js Route Handler
      ↓
Authentication / Authorization
      ↓
Mongoose
      ↓
MongoDB
      ↓
JSON Response
      ↓
UI Update
```

### Main Application Areas

- Dashboard
- Applications
- Interviews
- Analytics
- Calendar
- Goals
- Authentication
- User/Profile functionality

### API Layer

The application uses **Next.js Route Handlers** for server-side API functionality.

Examples include:

```text
/api/applications
/api/interviews/upcoming
/api/interviews/all
```

---

## Screenshots

Screenshots will be added as the project interface is finalized.

Recommended structure:

```text
docs/
└── screenshots/
    ├── dashboard.png
    ├── applications.png
    ├── interviews.png
    ├── analytics.png
    └── login.png
```

Once the screenshots are added, they can be displayed here using Markdown:

```markdown
![Dashboard](docs/screenshots/dashboard.png)

![Applications](docs/screenshots/applications.png)

![Interviews](docs/screenshots/interviews.png)

![Analytics](docs/screenshots/analytics.png)

![Login](docs/screenshots/login.png)
```

---

## Prerequisites

Before running Goal-Hire locally, install:

- [Node.js](https://nodejs.org/) 24+
- npm
- MongoDB database
- Git

Optional:

- Docker Desktop — required only if you want to run the containerized application locally

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/amalsunny-cloud/Goal-Hire.git
cd Goal-Hire
```

### 2. Install dependencies

```bash
npm ci
```

If the lockfile needs to be regenerated or dependencies need to be updated:

```bash
npm install
```

### 3. Configure environment variables

Create:

```text
.env.local
```

Add the required variables described in the **Environment Variables** section.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 5. Create a production build

```bash
npm run build
```

### 6. Start the production build

```bash
npm start
```

---

## Environment Variables

Goal-Hire uses environment variables for database credentials, authentication secrets, external services, and application configuration.

### Local Development

Create:

```text
.env.local
```

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL="your_verified_sender@example.com"

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Security

**Never commit real secrets to GitHub.**

Keep the following files private:

```text
.env
.env.local
.env.*.local
.docker.env
```

For Docker, the application can use a local `.docker.env` file containing the required runtime environment variables.

Never place secret values directly inside:

- Source code
- `Dockerfile`
- GitHub repository files
- Public documentation

---

# Docker

Goal-Hire uses a **multi-stage Docker build** with Next.js standalone output.

### Docker Build Architecture

```text
Dockerfile
    ↓
Dependencies Stage
    ↓
Build Stage
    ↓
Next.js Standalone Output
    ↓
Production Runner
```

The Docker image uses:

- Node.js 24
- Debian Bookworm Slim
- Next.js standalone output
- Multi-stage builds
- Production-oriented runtime structure

---

## Build the Docker Image

From the project root:

```bash
docker build -t goal-hire .
```

For a completely fresh build:

```bash
docker build --no-cache -t goal-hire .
```

---

## Run the Docker Container

Using the local environment file:

```bash
docker run -d -p 3000:3000 --name goal-hire-app --env-file .docker.env goal-hire
```

Open:

```text
http://localhost:3000
```

### Check Running Containers

```bash
docker ps
```

### View Container Logs

```bash
docker logs goal-hire-app
```

### Stop the Container

```bash
docker stop goal-hire-app
```

### Remove the Container

```bash
docker rm goal-hire-app
```

---

# Docker Hub

The production Docker image is published to Docker Hub.

**Docker Hub Repository:**

```text
amalsunnytech/goal-hire
```

The `latest` tag represents the most recently published image produced by the GitHub Actions workflow.

### Pull the Image

```bash
docker pull amalsunnytech/goal-hire:latest
```

### Run the Docker Hub Image

```bash
docker run -d -p 3000:3000 --name goal-hire-app --env-file .docker.env amalsunnytech/goal-hire:latest
```

The image is publicly available on Docker Hub.

---

# CI/CD

Goal-Hire uses **GitHub Actions** to automate Docker image building and publishing.

### What is CI/CD?

**CI (Continuous Integration)** is the practice of automatically building or checking software when changes are integrated into a repository.

**CD (Continuous Delivery/Deployment)** automates the process of preparing or delivering software changes.

For Goal-Hire, the current GitHub Actions workflow automatically:

1. Checks out the repository
2. Sets up Docker Buildx
3. Authenticates with Docker Hub
4. Builds the Docker image
5. Pushes the image to Docker Hub

### Workflow

```text
Developer
    │
    │ git push origin main
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ├── Checkout repository
    │
    ├── Set up Docker Buildx
    │
    ├── Authenticate with Docker Hub
    │
    ├── Build Docker image
    │
    └── Push image to Docker Hub
    │
    ▼
amalsunnytech/goal-hire:latest
```

### Workflow Trigger

The workflow runs when changes are pushed to:

```text
main
```

### GitHub Secrets

Docker Hub authentication is handled using GitHub repository secrets:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

Secrets are referenced through GitHub Actions and are not hard-coded in the workflow.

---

## Normal Development Workflow

Once CI/CD is configured, normal development does not require manually building and pushing the Docker image after every code change.

```text
Edit code
    ↓
npm run dev
    ↓
Test locally
    ↓
git add .
    ↓
git commit
    ↓
git push origin main
    ↓
GitHub Actions
    ↓
Docker build
    ↓
Docker Hub
```

Docker commands are mainly needed when you want to:

- Test the production container locally
- Build a new image manually
- Pull and run the published Docker image

---

# Project Structure

A simplified high-level structure of the project:

```text
Goal-Hire/
├── app/
│   ├── api/
│   │   ├── applications/
│   │   └── interviews/
│   ├── dashboard/
│   └── ...
│
├── components/
│   ├── Dashboard/
│   ├── Application/
│   ├── Interview/
│   ├── Analytics/
│   └── ...
│
├── lib/
│   ├── database utilities
│   ├── authentication utilities
│   └── service integrations
│
├── public/
│
├── .github/
│   └── workflows/
│       └── docker.yml
│
├── Dockerfile
├── .dockerignore
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

> This is a simplified representation of the project structure. Exact directories may evolve as development continues.

---

# Production Configuration

The project uses Next.js standalone output in `next.config.ts`:

```ts
output: "standalone"
```

This allows Next.js to generate a self-contained production server output that works well with Docker.

The Docker production container runs:

```bash
node server.js
```

The application listens on:

```text
3000
```

---

# Development Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |
| `docker build -t goal-hire .` | Build the Docker image |
| `docker ps` | List running containers |
| `docker logs goal-hire-app` | View container logs |
| `docker stop goal-hire-app` | Stop the container |
| `docker rm goal-hire-app` | Remove the container |

---

# Learning Outcomes

Building Goal-Hire provided practical experience with:

- Next.js App Router
- React and TypeScript
- Full-stack application development
- Next.js Route Handlers
- REST-style API design
- MongoDB and Mongoose
- JWT authentication
- Protected routes
- CRUD operations
- Drag-and-drop interfaces
- Data visualization
- Calendar interfaces
- External service integration
- Environment variable management
- Docker containerization
- Multi-stage Docker builds
- Docker Hub
- GitHub Actions
- CI/CD automation
- Git and GitHub workflows

---

# Future Improvements

Potential future improvements include:

- Versioned Docker image tags
- Automated unit and integration tests
- Automated linting and testing in CI
- Docker build caching
- Advanced application analytics
- Job description tracking
- Follow-up automation
- Improved email reminders
- Advanced filtering and search
- Application deadline notifications
- Import/export functionality
- Resume management
- AI-assisted job-search insights
- Improved accessibility
- Performance optimization
- Production monitoring and logging

---

# Project Status

**Status: 🚧 Active Development**

Goal-Hire's core backend functionality, authentication, application tracking, interview management, analytics, Dockerization, Docker Hub publishing, and GitHub Actions CI/CD workflow are implemented.

The user interface and additional productivity features continue to be refined.

---

# Author

**Amal Sunny**

- GitHub: https://github.com/amalsunny-cloud
- Portfolio: https://amal-sunny-portfolio.vercel.app/

---

# License

This project is currently intended as a personal portfolio and learning project.
