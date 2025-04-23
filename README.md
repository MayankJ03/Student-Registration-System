# Student Registration System

A clean and responsive student registration system built with React and Tailwind CSS. This application allows educational institutions to manage course types, courses, course offerings, and student registrations in one place.

## Features

- **Course Type Management**: Create, read, update, and delete course types (e.g., Individual, Group)
- **Course Management**: Manage various courses offered (e.g., Hindi, English, Urdu)
- **Course Offerings**: Link course types with courses to create offerings
- **Student Registration**: Register students for specific course offerings
- **Data Filtering**: Filter offerings and registrations by various criteria
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Data Persistence**: All data is stored in localStorage to persist between sessions

## Technologies Used

- React (with Hooks and Context API)
- React Router for navigation
- Tailwind CSS for styling
- LocalStorage for data persistence
- Lucide React for icons

## How to Run

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to the URL shown in the terminal

## Project Structure

- `/src/components`: Reusable UI components
- `/src/pages`: Main page components for different sections
- `/src/context`: Data context for state management
- `/src/index.css`: Global styles and animations

## Deployment

The project can be deployed to services like Vercel or Netlify:

1. Build the project:
   ```
   npm run build
   ```
2. Deploy the `/dist` folder to your hosting service of choice

## Created By

Mayank Jain