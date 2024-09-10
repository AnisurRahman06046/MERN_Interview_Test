
# MERN-Interview-Test

Welcome to the MERN Full Stack Developer Technical Interview Test repository. This repository contains a complete MERN (MongoDB, Express.js, React.js, Node.js) stack application for a Whiteboard App. The application allows users to create, view, update, and delete drawings that consist of lines, shapes, and text annotations.

## Livesite : https://66e06981f92014587f69ffb1--luminous-kitsune-5bb799.netlify.app

## Project Overview
This project is divided into four main sections:


- MongoDB Schema: Defines the data structures for storing whiteboard drawings.
- Express.js API: Provides a RESTful API for interacting with the whiteboard data.
- React.js Frontend: A web interface for displaying and interacting with drawings.
- Node.js Server: Serves the React frontend and handles API communication.

### Technologies:
- **Frontend**: ReactJs, JavaScript, TailwindCSS, Fabric.js
- **Backend** : Node, Express, Typescript, Mongodb, Mongoose.

### Rest Apis:
- POST `/api/v1/drawings/create`: Create a new drawing.
- GET `/api/v1/drawings`: Retrieve all drawings.
- GET `/api/v1/drawings/drawing/:id`: Retrieve a specific drawing by ID.
- PATCH `/api/v1/drawings/drawing/:id`: Update a drawing by ID.
- DELETE `/api/v1/drawings/delete/:id`: Delete a drawing by ID

### Setup and Run:
Clone the repository:
```bash
https://github.com/AnisurRahman06046/MERN_Interview_Test.git
```
Navigate to the project directory

Install dependencies:
```bash
npm install
```
Start the backend and frontend

### Deployment:
- **Frontend** : Netlify 
- **Backend**: Vercel


