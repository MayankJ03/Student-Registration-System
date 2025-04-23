import React, { useState } from 'react';
import { Edit, Trash, Plus } from 'lucide-react';
import { useData } from '../context/DataContext';
import ConfirmDialog from '../components/ConfirmDialog';

const Courses = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useData();
  
  const [newCourseName, setNewCourseName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  // Handle adding a new course
  const handleAddCourse = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newCourseName.trim()) {
      setError('Course name cannot be empty!');
      return;
    }
    
    // Check for duplicates
    if (courses.some(course => course.name.toLowerCase() === newCourseName.toLowerCase())) {
      setError('This course already exists!');
      return;
    }
    
    // Add the new course
    addCourse(newCourseName);
    setNewCourseName('');
    setError('');
  };

  // Set up editing for a course
  const handleEdit = (course) => {
    setEditingId(course.id);
    setEditingName(course.name);
    setError('');
  };

  // Save the edited course
  const handleSaveEdit = () => {
    // Basic validation
    if (!editingName.trim()) {
      setError('Course name cannot be empty!');
      return;
    }
    
    // Check for duplicates (excluding the current course)
    if (courses.some(course => 
      course.id !== editingId && 
      course.name.toLowerCase() === editingName.toLowerCase())
    ) {
      setError('This course already exists!');
      return;
    }
    
    updateCourse(editingId, editingName);
    setEditingId(null);
    setEditingName('');
    setError('');
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
    setError('');
  };

  // Confirm delete dialog
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  // Delete the course if confirmed
  const handleConfirmDelete = () => {
    deleteCourse(deleteId);
    setShowConfirm(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
      
      {/* Add new course form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Add New Course</h2>
        
        <form onSubmit={handleAddCourse} className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
            placeholder="Enter course name (e.g., Hindi, English)"
            className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
          >
            <Plus size={18} className="mr-1" /> Add Course
          </button>
        </form>
        
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </div>

      {/* Courses list */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Courses List</h2>
        </div>
        
        {courses.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No courses available. Add your first course above!
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {courses.map((course) => (
              <li key={course.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  {editingId === course.id ? (
                    <div className="flex-grow flex items-center gap-3">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-grow px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="text-gray-700">{course.name}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
      />
    </div>
  );
};

export default Courses;