import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar } from 'lucide-react';
import { sessionService } from '../services/sessionService';
import SessionCard from '../components/session/SessionCard';
import Loading from '../components/ui/Loading';
import Input from '../components/ui/Input';

const OneTimeSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // all, online, in-person

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    filterSessions();
  }, [searchTerm, filterMode, sessions]);

  const fetchSessions = async () => {
    try {
      const data = await sessionService.getAllSessions();
      setSessions(data);
      setFilteredSessions(data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterSessions = () => {
    let filtered = sessions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (session) =>
          session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by mode
    if (filterMode !== 'all') {
      filtered = filtered.filter((session) => {
        const mode = session.mode?.toLowerCase() || 'in-person';
        // Handle both "in-person" and "on-premise" for in-person filter
        if (filterMode === 'in-person') {
          return mode.includes('in-person') || mode.includes('on-premise') || mode.includes('premise');
        }
        return mode.includes(filterMode.toLowerCase());
      });
    }

    setFilteredSessions(filtered);
  };

  if (isLoading) {
    return <Loading fullScreen text="Loading sessions..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-600 p-3 rounded-xl">
              <Calendar className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold text-gray-900">
                One-Time Sessions
              </h1>
              <p className="text-gray-600 mt-1">Book individual training sessions that fit your schedule</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-6 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <Input
              type="text"
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />

            {/* Mode Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterMode('all')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    filterMode === 'all'
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterMode('online')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    filterMode === 'online'
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Online
                </button>
                <button
                  onClick={() => setFilterMode('in-person')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    filterMode === 'in-person'
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  In-Person
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredSessions.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{sessions.length}</span> sessions
            </p>
          </div>
        </motion.div>

        {/* Sessions Grid */}
        {filteredSessions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SessionCard session={session} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-gray-400" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No sessions found</h3>
            <p className="text-gray-600">
              {searchTerm || filterMode !== 'all'
                ? 'Try adjusting your filters'
                : 'Check back soon for new sessions'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneTimeSessions;
