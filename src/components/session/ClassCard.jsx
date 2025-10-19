import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Clock } from 'lucide-react';
import Card from '../ui/Card';
import { formatPrice, getAvailabilityStatus } from '../../utils/helpers';

const ClassCard = ({ classData }) => {
  const navigate = useNavigate();
  const availability = getAvailabilityStatus(classData.currentNumber, classData.maxNumber);
  const spotsLeft = classData.maxNumber - classData.currentNumber;

  return (
    <Card onClick={() => navigate(`/classes/${classData.id}`)} className="p-6">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{classData.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{classData.shortDescription}</p>
          </div>
          <div className={`${availability.bgColor} ${availability.color} badge ml-4 flex-shrink-0`}>
            {availability.text}
          </div>
        </div>

        {/* Description */}
        {classData.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{classData.description}</p>
        )}

        {/* Details */}
        <div className="space-y-3 mb-4 flex-1">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={18} className="text-primary-500 flex-shrink-0" />
            <span className="text-sm font-medium">{classData.dateAndTime}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Users size={18} className="text-primary-500 flex-shrink-0" />
            <span className="text-sm font-medium">
              {spotsLeft} of {classData.maxNumber} spots available
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            
            <span className="text-2xl font-bold text-gray-900">{formatPrice(classData.price)}</span>
          </div>
          <button className="btn-primary text-sm py-2 px-4">
            View Details
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ClassCard;
