import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Dumbbell } from 'lucide-react';
import { classService } from '../services/classService';
import ClassCard from '../components/session/ClassCard';
import Loading from '../components/ui/Loading';
import Input from '../components/ui/Input';

const RegularClasses = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    filterClasses();
  }, [searchTerm, classes]);

  const fetchClasses = async () => {
    try {
      const data = await classService.getAllClasses();
      setClasses(data);
      setFilteredClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterClasses = () => {
    if (searchTerm) {
      const filtered = classes.filter(
        (classItem) =>
          classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          classItem.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClasses(filtered);
    } else {
      setFilteredClasses(classes);
    }
  };

  if (isLoading) {
    return <Loading fullScreen text="Loading classes..." />;
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
              <Dumbbell className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold text-gray-900">Regular Classes</h1>
              <p className="text-gray-600 mt-1">
                Join our recurring fitness classes for consistent training
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-6 mb-8"
        >
          <Input
            type="text"
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredClasses.length}</span>{' '}
              of <span className="font-semibold text-gray-900">{classes.length}</span> classes
            </p>
          </div>
        </motion.div>

        {/* Classes Grid */}
        {filteredClasses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ClassCard classData={classItem} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Dumbbell className="text-gray-400" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No classes found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search' : 'Check back soon for new classes'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegularClasses;
