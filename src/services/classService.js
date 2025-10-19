import api from './api';

export const classService = {
  // Get all regular classes
  getAllClasses: async () => {
    const response = await api.get('/api/regularClass/viewRegularClassList');
    return response.data;
  },

  // Get a specific class by ID
  getClassById: async (id) => {
    const response = await api.get(`/api/regularClass/viewRegularClass/${id}`);
    return response.data;
  },

  // Enroll in a class (requires authentication)
  enrollInClass: async (id) => {
    const response = await api.post(`/api/regularClass/enrolRegularClass/${id}`);
    return response.data;
  },

  // Add a new regular class (admin functionality)
  addClass: async (classData) => {
    const response = await api.post('/api/regularClass/addRegularClass', classData);
    return response.data;
  },
};

export default classService;
