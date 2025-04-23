import React, { useState } from 'react';
import { Edit, Trash, Plus, Filter } from 'lucide-react';
import { useData } from '../context/DataContext';
import ConfirmDialog from '../components/ConfirmDialog';

const Offerings = () => {
  const { 
    offerings, courseTypes, courses, 
    addOffering, updateOffering, deleteOffering,
    getCourseTypeName, getCourseName
  } = useData();
  
  const [selectedCourseTypeId, setSelectedCourseTypeId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingCourseTypeId, setEditingCourseTypeId] = useState('');
  const [editingCourseId, setEditingCourseId] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');
  const [filterCourseTypeId, setFilterCourseTypeId] = useState('');

  // Get filtered offerings
  const filteredOfferings = filterCourseTypeId 
    ? offerings.filter(offering => offering.courseTypeId.toString() === filterCourseTypeId)
    : offerings;

  // Handle adding a new offering
  const handleAddOffering = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!selectedCourseTypeId) {
      setError('Please select a course type!');
      return;
    }
    
    if (!selectedCourseId) {
      setError('Please select a course!');
      return;
    }
    
    // Check for duplicates
    if (offerings.some(
      offering => 
        offering.courseTypeId.toString() === selectedCourseTypeId &&
        offering.courseId.toString() === selectedCourseId
    )) {
      setError('This course offering already exists!');
      return;
    }
    
    // Add the new offering
    addOffering(parseInt(selectedCourseTypeId), parseInt(selectedCourseId));
    setSelectedCourseTypeId('');
    setSelectedCourseId('');
    setError('');
  };

  // Set up editing for an offering
  const handleEdit = (offering) => {
    setEditingId(offering.id);
    setEditingCourseTypeId(offering.courseTypeId.toString());
    setEditingCourseId(offering.courseId.toString());
    setError('');
  };

  // Save the edited offering
  const handleSaveEdit = () => {
    // Basic validation
    if (!editingCourseTypeId) {
      setError('Please select a course type!');
      return;
    }
    
    if (!editingCourseId) {
      setError('Please select a course!');
      return;
    }
    
    // Check for duplicates (excluding the current offering)
    if (offerings.some(
      offering => 
        offering.id !== editingId &&
        offering.courseTypeId.toString() === editingCourseTypeId &&
        offering.courseId.toString() === editingCourseId
    )) {
      setError('This course offering already exists!');
      return;
    }
    
    updateOffering(editingId, parseInt(editingCourseTypeId), parseInt(editingCourseId));
    setEditingId(null);
    setEditingCourseTypeId('');
    setEditingCourseId('');
    setError('');
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingCourseTypeId('');
    setEditingCourseId('');
    setError('');
  };

  // Confirm delete dialog
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  // Delete the offering if confirmed
  const handleConfirmDelete = () => {
    deleteOffering(deleteId);
    setShowConfirm(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Course Offerings</h1>
      
      {/* Add new offering form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Add New Course Offering</h2>
        
        <form onSubmit={handleAddOffering} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Type
              </label>
              <select
                value={selectedCourseTypeId}
                onChange={(e) => setSelectedCourseTypeId(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Course Type</option>
                {courseTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200 flex items-center"
            >
              <Plus size={18} className="mr-1" /> Add Offering
            </button>
          </div>
        </form>
        
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </div>

      {/* Filter */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center">
            <Filter size={18} className="text-gray-500 mr-2" />
            <span className="font-medium">Filter by Course Type:</span>
          </div>
          
          <select
            value={filterCourseTypeId}
            onChange={(e) => setFilterCourseTypeId(e.target.value)}
            className="flex-grow md:flex-grow-0 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Course Types</option>
            {courseTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          
          {filterCourseTypeId && (
            <button
              onClick={() => setFilterCourseTypeId('')}
              className="text-blue-600 hover:text-blue-800"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Offerings list */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Course Offerings List</h2>
        </div>
        
        {filteredOfferings.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {filterCourseTypeId ? 'No offerings match the selected filter.' : 'No course offerings available. Add your first offering above!'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOfferings.map((offering) => (
                  <tr key={offering.id} className="hover:bg-gray-50">
                    {editingId === offering.id ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={editingCourseTypeId}
                            onChange={(e) => setEditingCourseTypeId(e.target.value)}
                            className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select a Course Type</option>
                            {courseTypes.map(type => (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={editingCourseId}
                            onChange={(e) => setEditingCourseId(e.target.value)}
                            className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select a Course</option>
                            {courses.map(course => (
                              <option key={course.id} value={course.id}>
                                {course.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getCourseTypeName(offering.courseTypeId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getCourseName(offering.courseId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2 justify-end">
                            <button
                              onClick={() => handleEdit(offering)}
                              className="text-blue-600 hover:text-blue-800 p-1"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(offering.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Delete"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Course Offering"
        message="Are you sure you want to delete this course offering? This action cannot be undone."
      />
    </div>
  );
};

export default Offerings;