import React, { useState } from 'react';
import { Edit, Trash, Plus } from 'lucide-react';
import { useData } from '../context/DataContext';
import ConfirmDialog from '../components/ConfirmDialog';

const CourseTypes = () => {
  const { courseTypes, addCourseType, updateCourseType, deleteCourseType } = useData();
  
  const [newTypeName, setNewTypeName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  // Handle adding a new course type
  const handleAddCourseType = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newTypeName.trim()) {
      setError('Course type name cannot be empty!');
      return;
    }
    
    // Check for duplicates
    if (courseTypes.some(type => type.name.toLowerCase() === newTypeName.toLowerCase())) {
      setError('This course type already exists!');
      return;
    }
    
    // Add the new course type
    addCourseType(newTypeName);
    setNewTypeName('');
    setError('');
  };

  // Set up editing for a course type
  const handleEdit = (type) => {
    setEditingId(type.id);
    setEditingName(type.name);
    setError('');
  };

  // Save the edited course type
  const handleSaveEdit = () => {
    // Basic validation
    if (!editingName.trim()) {
      setError('Course type name cannot be empty!');
      return;
    }
    
    // Check for duplicates (excluding the current type)
    if (courseTypes.some(type => 
      type.id !== editingId && 
      type.name.toLowerCase() === editingName.toLowerCase())
    ) {
      setError('This course type already exists!');
      return;
    }
    
    updateCourseType(editingId, editingName);
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

  // Delete the course type if confirmed
  const handleConfirmDelete = () => {
    deleteCourseType(deleteId);
    setShowConfirm(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Course Types</h1>
      
      {/* Add new course type form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Add New Course Type</h2>
        
        <form onSubmit={handleAddCourseType} className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={newTypeName}
            onChange={(e) => setNewTypeName(e.target.value)}
            placeholder="Enter course type name"
            className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
          >
            <Plus size={18} className="mr-1" /> Add Type
          </button>
        </form>
        
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </div>

      {/* Course types list */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Course Types List</h2>
        </div>
        
        {courseTypes.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No course types available. Add your first course type above!
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {courseTypes.map((type) => (
              <li key={type.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  {editingId === type.id ? (
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
                      <span className="text-gray-700">{type.name}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(type)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(type.id)}
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
        title="Delete Course Type"
        message="Are you sure you want to delete this course type? This action cannot be undone."
      />
    </div>
  );
};

export default CourseTypes;