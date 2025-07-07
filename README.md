# MediEase Website

## Overview
MediEase Website is a web application built with Next.js to manage doctor and admin functionalities within the MediEase healthcare system. It offers core features like user authentication, doctor profile management, and administrative tasks. The application connects to a MongoDB database for data storage and integrates with a Python-based backend for health recommendations. Developed as a Final Year Project (FYP), this prototype has limited polish and model accuracy due to constrained datasets.

## Features
- Admin panel for managing doctors and system settings
- Doctor management (create, update, delete doctor profiles)
- User authentication with role-based access
- MongoDB integration for data persistence
- API endpoints for communication with the Python model for health recommendations
> **Note**: The recommendation model has limited accuracy due to small and incomplete datasets.

## Tech Stack
- **Framework**: Next.js
- **Database**: MongoDB
- **Backend**: Node.js (Next.js API routes)
- **Frontend**: React (with Next.js)
- **Styling**: CSS (or specify if Tailwind CSS, etc., was used)
- **Deployment**: Not deployed (update if deployed, e.g., Vercel)

## Related Repositories
- [MediEase Mobile App](https://github.com/Jooker302/MediEaseUserApp): React Native App
- [MediEase Python Model](https://github.com/Jooker302/MediEaseAIModel): Python Backend

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- npm or yarn
- Python server (refer to MediEase Python Model repository for backend setup)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Jooker302/MediEaseWebsite
   cd mediease-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory and add:
     ```env
     MONGODB_URI=<your-mongodb-connection-string>
     NEXT_PUBLIC_API_URL=<python-backend-api-url>
     ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Access the admin panel at `/admin` to manage doctors.
- Use the doctor management interface to add or update doctor details.
- Ensure the Python backend is running to fetch health recommendations.

## Limitations
- Not optimized for production (prototype for FYP).
- Limited error handling and UI polish.
- Recommendation model accuracy is low due to limited and incomplete datasets.
- Requires a running Python server for full functionality.

## Contributing
This project was created for educational purposes. Feel free to fork and experiment, but it is not actively maintained.

## License
[MIT License](LICENSE)
