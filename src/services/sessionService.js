import api from './api';

export const sessionService = {
  // Get all one-time sessions
  getAllSessions: async () => {
    const response = await api.get('/api/oneTimeSession/viewOneTimeSessionList');
    return response.data;
  },

  // Get a specific session by ID
  getSessionById: async (id) => {
    const response = await api.get(`/api/oneTimeSession/viewOneTimeSession/${id}`);
    return response.data;
  },

  // Enroll in a session (requires authentication)
  enrollInSession: async (id) => {
    const response = await api.post(`/api/oneTimeSession/enrolSession/${id}`);
    return response.data;
  },

  // Add a new session (admin functionality)
  addSession: async (sessionData) => {
    const response = await api.post('/api/oneTimeSession/addOneTimeSession', sessionData);
    return response.data;
  },
};

export default sessionService;
