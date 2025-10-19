
# SOS Venezuela Den Frontend

This is a React project using Vite and npm. Follow the steps below to set up and run the project locally.

## Prerequisites

- [Node.js](https://nodejs.org/) 22.19.0
- [npm](https://www.npmjs.com/) 11.6.0

## Getting Started

1. **Clone the repository:**
	```bash
	git clone https://github.com/Gus-GP/sos-vzl-den-frontend.git
	cd sos-vzl-den-frontend
	```

2. **Install dependencies:**
	```bash
	npm install
	```

3. **Run the development server:**
	```bash
	npm run dev
	```
	The app will be available at `http://localhost:5173` by default.

## Build for Production

To create a production build:
```bash
npm run build
```
The output will be in the `dist/` folder.

## Preview Production Build

To preview the production build locally:
```bash
npm run preview
```

## Docker Support

To run the production build in Docker:
1. Build the project:
	```bash
	npm run build
	```
2. Build the Docker image:
	```bash
	docker build -t sosvzl-app .
	```
3. Run the Docker container:
	```bash
	docker run -p 8080:80 sosvzl-app
	```
	The app will be available at `http://localhost:8080`.

## Linting

To check code style and lint errors:
```bash
npm run lint
```

## Environment Variables

You can create a `.env` file in the project root to set environment variables for local development.

## Project Structure

- `src/` - Source code
- `public/` - Static assets
- `dist/` - Production build output

---
For any issues, please open an issue on GitHub.
