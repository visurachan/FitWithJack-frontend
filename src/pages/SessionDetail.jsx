import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  MapPin,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { sessionService } from '../services/sessionService';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Loading from '../components/ui/Loading';
import Toast from '../components/ui/Toast';
import { formatDate, formatTime, formatPrice, getAvailabilityStatus } from '../utils/helpers';
import { ROUTES } from '../utils/constants';

const SessionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    fetchSession();
  }, [id]);

  const fetchSession = async () => {
    try {
      const data = await sessionService.getSessionById(id);
      setSession(data);
    } catch (error) {
      console.error('Error fetching session:', error);
      toast.error('Failed to load session details');
      navigate(ROUTES.SESSIONS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to enroll in sessions');
      navigate(ROUTES.LOGIN);
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmEnrollment = async () => {
    setIsEnrolling(true);

    try {
      await sessionService.enrollInSession(id);
      toast.success('Successfully enrolled! Check your email for confirmation.');
      setShowConfirmModal(false);

      // Refresh session data
      await fetchSession();
    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error(error.response?.data || 'Enrollment failed. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  if (isLoading) {
    return <Loading fullScreen text="Loading session details..." />;
  }

  if (!session) {
    return null;
  }

  const availability = getAvailabilityStatus(session.currentNumber, session.maxNumber);
  const spotsLeft = session.maxNumber - session.currentNumber;
  const isFull = spotsLeft === 0;

  return (
    <>
      <Toast toasts={toast.toasts} removeToast={toast.removeToast} />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          {/* Back Button */}
          <button
            onClick={() => navigate(ROUTES.SESSIONS)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Sessions</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-md p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-3">
                      {session.name}
                    </h1>
                    <p className="text-xl text-gray-600">{session.shortDescription}</p>
                  </div>
                  <div className={`${availability.bgColor} ${availability.color} badge text-base`}>
                    {availability.text}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Session</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {session.description}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <Calendar className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold text-gray-900">{formatDate(session.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <Clock className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-semibold text-gray-900">{formatTime(session.time)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <MapPin className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Mode</p>
                      <p className="font-semibold text-gray-900">{session.mode || 'In-Person'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <Users className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Availability</p>
                      <p className="font-semibold text-gray-900">
                        {spotsLeft} of {session.maxNumber} spots
                      </p>
                    </div>
                  </div>
                </div>

                {/* What You'll Learn */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Get</h2>
                  <div className="space-y-3">
                    {[
                      'Expert one-on-one training',
                      'Personalized workout plan',
                      'Form and technique coaching',
                      'Nutrition tips and guidance',
                      'Progress tracking',
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="text-accent-500 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Session Price</p>
                  <div className="flex items-center gap-2">
                    <span className="text-accent-600 text-4xl font-bold">£</span>
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(session.price).replace('£', '')}
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full mb-4"
                  onClick={handleEnroll}
                  disabled={isFull}
                >
                  {isFull ? 'Session Full' : 'Enroll Now'}
                </Button>

                {!isAuthenticated && (
                  <p className="text-sm text-center text-gray-600">
                    You must be logged in to enroll
                  </p>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="text-accent-500" size={18} />
                    <span className="text-gray-700">Instant confirmation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="text-accent-500" size={18} />
                    <span className="text-gray-700">Email notification</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="text-accent-500" size={18} />
                    <span className="text-gray-700">Flexible cancellation</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Enrollment"
      >
        <div className="space-y-6">
          <p className="text-gray-700">
            Are you sure you want to enroll in <strong>{session.name}</strong>?
          </p>

          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold">{formatDate(session.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-semibold">{formatTime(session.time)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="font-semibold text-accent-600">{formatPrice(session.price)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowConfirmModal(false)}
              disabled={isEnrolling}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={confirmEnrollment}
              disabled={isEnrolling}
            >
              {isEnrolling ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 spinner"></div>
                  <span>Enrolling...</span>
                </div>
              ) : (
                'Confirm Enrollment'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SessionDetail;
