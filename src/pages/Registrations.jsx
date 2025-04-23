import React, { useState } from 'react';
import { Edit, Trash, Plus, Filter, UserPlus } from 'lucide-react';
import { useData } from '../context/DataContext';
import ConfirmDialog from '../components/ConfirmDialog';

const Registrations = () => {
  const { 
    registrations, offerings, 
    addRegistration, updateRegistration, deleteRegistration,
    getOfferingDetails
  } = useData();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedOfferingId, setSelectedOfferingId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingEmail, setEditingEmail] = useState('');
  const [editingOfferingId, setEditingOfferingId] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');
  const [filterOfferingId, setFilterOfferingId] = useState('');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Get filtered registrations
  const filteredRegistrations = filterOfferingId 
    ? registrations.filter(reg => reg.offeringId.toString() === filterOfferingId)
    : registrations;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle adding a new registration
  const handleAddRegistration = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim()) {
      setError('Name cannot be empty!');
      return;
    }
    
    if (!email.trim()) {
      setError('Email cannot be empty!');
      return;
    }
    
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address!');
      return;
    }
    
    if (!selectedOfferingId) {
      setError('Please select a course offering!');
      return;
    }
    
    // Add the new registration
    addRegistration(name, email, parseInt(selectedOfferingId));
    setName('');
    setEmail('');
    setSelectedOfferingId('');
    setError('');
  };

  // Set up editing for a registration
  const handleEdit = (registration) => {
    setEditingId(registration.id);
    setEditingName(registration.name);
    setEditingEmail(registration.email);
    setEditingOfferingId(registration.offeringId.toString());
    setError('');
  };

  // Save the edited registration
  const handleSaveEdit = () => {
    // Basic validation
    if (!editingName.trim()) {
      setError('Name cannot be empty!');
      return;
    }
    
    if (!editingEmail.trim()) {
      setError('Email cannot be empty!');
      return;
    }
    
    if (!emailRegex.test(editingEmail)) {
      setError('Please enter a valid email address!');
      return;
    }
    
    if (!editingOfferingId) {
      setError('Please select a course offering!');
      return;
    }
    
    updateRegistration(editingId, editingName, editingEmail, parseInt(editingOfferingId));
    setEditingId(null);
    setEditingName('');
    setEditingEmail('');
    setEditingOfferingId('');
    setError('');
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
    setEditingEmail('');
    setEditingOfferingId('');
    setError('');
  };

  // Confirm delete dialog
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  // Delete the registration if confirmed
  const handleConfirmDelete = () => {
    deleteRegistration(deleteId);
    setShowConfirm(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Student Registrations</h1>
      
      {/* Add new registration form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Add New Student Registration</h2>
        
        <form onSubmit={handleAddRegistration} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student name"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Offering
              </label>
              <select
                value={selectedOfferingId}
                onChange={(e) => setSelectedOfferingId(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Course Offering</option>
                {offerings.map(offering => (
                  <option key={offering.id} value={offering.id}>
                    {getOfferingDetails(offering.id)}
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
              <UserPlus size={18} className="mr-1" /> Register Student
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
            <span className="font-medium">Filter by Course Offering:</span>
          </div>
          
          <select
            value={filterOfferingId}
            onChange={(e) => setFilterOfferingId(e.target.value)}
            className="flex-grow md:flex-grow-0 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Course Offerings</option>
            {offerings.map(offering => (
              <option key={offering.id} value={offering.id}>
                {getOfferingDetails(offering.id)}
              </option>
            ))}
          </select>
          
          {filterOfferingId && (
            <button
              onClick={() => setFilterOfferingId('')}
              className="text-blue-600 hover:text-blue-800"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Registrations list */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Student Registrations List</h2>
        </div>
        
        {filteredRegistrations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {filterOfferingId ? 'No registrations match the selected filter.' : 'No registrations available. Register your first student above!'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Offering
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id} className="hover:bg-gray-50">
                    {editingId === registration.id ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="email"
                            value={editingEmail}
                            onChange={(e) => setEditingEmail(e.target.value)}
                            className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={editingOfferingId}
                            onChange={(e) => setEditingOfferingId(e.target.value)}
                            className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select a Course Offering</option>
                            {offerings.map(offering => (
                              <option key={offering.id} value={offering.id}>
                                {getOfferingDetails(offering.id)}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatDate(registration.registrationDate)}
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
                          {registration.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {registration.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getOfferingDetails(registration.offeringId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatDate(registration.registrationDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2 justify-end">
                            <button
                              onClick={() => handleEdit(registration)}
                              className="text-blue-600 hover:text-blue-800 p-1"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(registration.id)}
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
        title="Delete Registration"
        message="Are you sure you want to delete this student registration? This action cannot be undone."
      />
    </div>
  );
};

export default Registrations;