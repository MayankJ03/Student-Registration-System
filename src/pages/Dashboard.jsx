import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Library, Layers } from 'lucide-react';
import { useData } from '../context/DataContext';

const Dashboard = () => {
  const { courseTypes, courses, offerings, registrations } = useData();

  // Dashboard cards with counts and links
  const dashboardItems = [
    {
      title: 'Course Types',
      count: courseTypes.length,
      description: 'Manage different types of courses',
      icon: <Layers className="h-10 w-10 text-blue-500" />,
      link: '/course-types',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      title: 'Courses',
      count: courses.length,
      description: 'View and manage all courses',
      icon: <BookOpen className="h-10 w-10 text-green-500" />,
      link: '/courses',
      color: 'bg-green-50 border-green-200',
    },
    {
      title: 'Course Offerings',
      count: offerings.length,
      description: 'Course and type combinations',
      icon: <Library className="h-10 w-10 text-purple-500" />,
      link: '/offerings',
      color: 'bg-purple-50 border-purple-200',
    },
    {
      title: 'Student Registrations',
      count: registrations.length,
      description: 'Student enrollment records',
      icon: <Users className="h-10 w-10 text-orange-500" />,
      link: '/registrations',
      color: 'bg-orange-50 border-orange-200',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Student Registration System
      </h1>
      
      <p className="text-gray-600 max-w-3xl">
        Welcome to the student registration dashboard. Here you can manage course types, 
        courses, offerings, and student registrations all in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {dashboardItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`p-6 rounded-lg border ${item.color} hover:shadow-md transition-all duration-200 flex flex-col items-center text-center`}
          >
            <div className="mb-4">{item.icon}</div>
            <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
            <div className="text-3xl font-bold my-2">{item.count}</div>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Quick Start Guide</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>Start by creating <Link to="/course-types" className="text-blue-600 hover:underline">Course Types</Link> (e.g., Individual, Group)</li>
          <li>Add different <Link to="/courses" className="text-blue-600 hover:underline">Courses</Link> (e.g., Hindi, English, Urdu)</li>
          <li>Create <Link to="/offerings" className="text-blue-600 hover:underline">Course Offerings</Link> by combining types and courses</li>
          <li>Register students for specific <Link to="/registrations" className="text-blue-600 hover:underline">Course Offerings</Link></li>
        </ol>
      </div>
    </div>
  );
};

export default Dashboard;