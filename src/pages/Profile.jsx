import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Ruler, Weight, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Loading from '../components/ui/Loading';
import Toast from '../components/ui/Toast';
import { getInitials, formatDateForAPI } from '../utils/helpers';

const Profile = () => {
  const { user, updateProfile, isLoading: authLoading } = useAuth();
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    height: '',
    weight: '',
    dateOfBirth: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        height: user.height || '',
        weight: user.weight || '',
        dateOfBirth: user.dateOfBirth || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setIsSaving(true);

    try {
      // Format data for API
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        height: formData.height ? parseFloat(formData.height) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        dateOfBirth: formData.dateOfBirth,
      };

      const result = await updateProfile(updateData);

      if (result.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form to user data
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        height: user.height || '',
        weight: user.weight || '',
        dateOfBirth: user.dateOfBirth || '',
      });
    }
    setErrors({});
    setIsEditing(false);
  };

  if (authLoading) {
    return <Loading fullScreen text="Loading profile..." />;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Toast toasts={toast.toasts} removeToast={toast.removeToast} />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and fitness goals</p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-600 px-8 py-12">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary-600">
                    {getInitials(user.firstName, user.lastName)}
                  </span>
                </div>
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-1">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-white/80">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit2 size={18} />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button variant="ghost" onClick={handleCancel}>
                      <X size={18} />
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 spinner"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    icon={User}
                    disabled={!isEditing}
                  />

                  <Input
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    disabled={!isEditing}
                  />
                </div>

                {/* Contact */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={Mail}
                    disabled={true} // Email cannot be changed
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={errors.phoneNumber}
                    icon={Phone}
                    disabled={!isEditing}
                  />
                </div>

                {/* Birth Date */}
                <div className="grid md:grid-cols-1 gap-6">
                  <Input
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    icon={Calendar}
                    disabled={!isEditing}
                  />
                </div>

                {/* Physical Stats */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Physical Stats</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Height (ft)"
                      type="number"
                      step="0.1"
                      name="height"
                      placeholder="e.g., 5.9"
                      value={formData.height}
                      onChange={handleChange}
                      icon={Ruler}
                      disabled={!isEditing}
                    />

                    <Input
                      label="Weight (lbs)"
                      type="number"
                      step="0.1"
                      name="weight"
                      placeholder="e.g., 165"
                      value={formData.weight}
                      onChange={handleChange}
                      icon={Weight}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          {(user.height || user.weight) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6 mt-8"
            >
              {user.height && (
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary-100 p-3 rounded-xl">
                      <Ruler className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Height</p>
                      <p className="text-2xl font-bold text-gray-900">{user.height} ft</p>
                    </div>
                  </div>
                </div>
              )}

              {user.weight && (
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent-100 p-3 rounded-xl">
                      <Weight className="text-accent-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Weight</p>
                      <p className="text-2xl font-bold text-gray-900">{user.weight} lbs</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
