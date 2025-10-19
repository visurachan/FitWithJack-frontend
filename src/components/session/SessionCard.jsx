import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import Card from '../ui/Card';
import { formatDate, formatTime, formatPrice, getAvailabilityStatus } from '../../utils/helpers';

const SessionCard = ({ session }) => {
  const navigate = useNavigate();

  const availability = getAvailabilityStatus(session.currentNumber, session.maxNumber);
  const spotsLeft = session.maxNumber - session.currentNumber;

  return (
    <Card onClick={() => navigate(`/sessions/${session.id}`)} className="p-6">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{session.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{session.shortDescription}</p>
          </div>
          <div className={`${availability.bgColor} ${availability.color} badge ml-4 flex-shrink-0`}>
            {availability.text}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4 flex-1">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={18} className="text-primary-500 flex-shrink-0" />
            <span className="text-sm font-medium">{formatDate(session.date)}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={18} className="text-primary-500 flex-shrink-0" />
            <span className="text-sm font-medium">{formatTime(session.time)}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={18} className="text-primary-500 flex-shrink-0" />
            <span className="text-sm font-medium">{session.mode || 'In-Person'}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Users size={18} className="text-primary-500 flex-shrink-0" />
            <span className="text-sm font-medium">
              {spotsLeft} of {session.maxNumber} spots available
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-gray-900">{formatPrice(session.price)}</span>
          </div>
          <button className="btn-primary text-sm py-2 px-4">
            View Details
          </button>
        </div>
      </div>
    </Card>
  );
};

export default SessionCard;
