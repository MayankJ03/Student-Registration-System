import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for our data
const DataContext = createContext();

// Custom hook to use our data context
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // States for our different data types
  const [courseTypes, setCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadedCourseTypes = JSON.parse(localStorage.getItem('courseTypes')) || [];
    const loadedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    const loadedOfferings = JSON.parse(localStorage.getItem('offerings')) || [];
    const loadedRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];
    
    setCourseTypes(loadedCourseTypes);
    setCourses(loadedCourses);
    setOfferings(loadedOfferings);
    setRegistrations(loadedRegistrations);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('courseTypes', JSON.stringify(courseTypes));
  }, [courseTypes]);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('offerings', JSON.stringify(offerings));
  }, [offerings]);

  useEffect(() => {
    localStorage.setItem('registrations', JSON.stringify(registrations));
  }, [registrations]);

  // Function to show notifications
  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    // Auto remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 3000);
  };

  // CRUD operations for course types
  const addCourseType = (name) => {
    const newCourseType = { id: Date.now(), name };
    setCourseTypes(prev => [...prev, newCourseType]);
    showNotification(`Course type "${name}" added successfully!`);
    return newCourseType;
  };

  const updateCourseType = (id, name) => {
    setCourseTypes(prev => 
      prev.map(type => type.id === id ? { ...type, name } : type)
    );
    showNotification(`Course type updated successfully!`);
  };

  const deleteCourseType = (id) => {
    // Check if this course type is used in any offerings
    const isUsed = offerings.some(offering => offering.courseTypeId === id);
    
    if (isUsed) {
      showNotification('Cannot delete: This course type is used in one or more offerings!', 'error');
      return false;
    }
    
    setCourseTypes(prev => prev.filter(type => type.id !== id));
    showNotification('Course type deleted successfully!');
    return true;
  };

  // CRUD operations for courses
  const addCourse = (name) => {
    const newCourse = { id: Date.now(), name };
    setCourses(prev => [...prev, newCourse]);
    showNotification(`Course "${name}" added successfully!`);
    return newCourse;
  };

  const updateCourse = (id, name) => {
    setCourses(prev => 
      prev.map(course => course.id === id ? { ...course, name } : course)
    );
    showNotification(`Course updated successfully!`);
  };

  const deleteCourse = (id) => {
    // Check if this course is used in any offerings
    const isUsed = offerings.some(offering => offering.courseId === id);
    
    if (isUsed) {
      showNotification('Cannot delete: This course is used in one or more offerings!', 'error');
      return false;
    }
    
    setCourses(prev => prev.filter(course => course.id !== id));
    showNotification('Course deleted successfully!');
    return true;
  };

  // CRUD operations for offerings
  const addOffering = (courseTypeId, courseId) => {
    const newOffering = { 
      id: Date.now(), 
      courseTypeId, 
      courseId 
    };
    setOfferings(prev => [...prev, newOffering]);
    showNotification('Course offering added successfully!');
    return newOffering;
  };

  const updateOffering = (id, courseTypeId, courseId) => {
    setOfferings(prev => 
      prev.map(offering => offering.id === id 
        ? { ...offering, courseTypeId, courseId } 
        : offering
      )
    );
    showNotification('Course offering updated successfully!');
  };

  const deleteOffering = (id) => {
    // Check if this offering is used in any registrations
    const isUsed = registrations.some(registration => registration.offeringId === id);
    
    if (isUsed) {
      showNotification('Cannot delete: This offering has student registrations!', 'error');
      return false;
    }
    
    setOfferings(prev => prev.filter(offering => offering.id !== id));
    showNotification('Course offering deleted successfully!');
    return true;
  };

  // CRUD operations for registrations
  const addRegistration = (name, email, offeringId) => {
    const newRegistration = { 
      id: Date.now(), 
      name, 
      email, 
      offeringId,
      registrationDate: new Date().toISOString()
    };
    setRegistrations(prev => [...prev, newRegistration]);
    showNotification(`Registration for ${name} added successfully!`);
    return newRegistration;
  };

  const updateRegistration = (id, name, email, offeringId) => {
    setRegistrations(prev => 
      prev.map(registration => registration.id === id 
        ? { ...registration, name, email, offeringId } 
        : registration
      )
    );
    showNotification('Registration updated successfully!');
  };

  const deleteRegistration = (id) => {
    setRegistrations(prev => prev.filter(registration => registration.id !== id));
    showNotification('Registration deleted successfully!');
    return true;
  };

  // Helper function to get course type name by id
  const getCourseTypeName = (id) => {
    const courseType = courseTypes.find(type => type.id === id);
    return courseType ? courseType.name : 'Unknown Type';
  };

  // Helper function to get course name by id
  const getCourseName = (id) => {
    const course = courses.find(course => course.id === id);
    return course ? course.name : 'Unknown Course';
  };

  // Helper function to get offering details by id
  const getOfferingDetails = (id) => {
    const offering = offerings.find(offering => offering.id === id);
    if (!offering) return 'Unknown Offering';
    
    const courseType = getCourseTypeName(offering.courseTypeId);
    const course = getCourseName(offering.courseId);
    
    return `${courseType} - ${course}`;
  };

  const contextValue = {
    // Data
    courseTypes,
    courses,
    offerings,
    registrations,
    notifications,
    
    // CRUD operations
    addCourseType,
    updateCourseType,
    deleteCourseType,
    
    addCourse,
    updateCourse,
    deleteCourse,
    
    addOffering,
    updateOffering,
    deleteOffering,
    
    addRegistration,
    updateRegistration,
    deleteRegistration,
    
    // Helper functions
    getCourseTypeName,
    getCourseName,
    getOfferingDetails,
    showNotification
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
      
      {/* Notification container */}
      {notifications.length > 0 && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2">
          {notifications.map(notification => (
            <div 
              key={notification.id}
              className={`px-4 py-3 rounded-lg shadow-lg text-white 
                ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} 
                animate-fade-in-out`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}
    </DataContext.Provider>
  );
};