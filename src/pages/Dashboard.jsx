import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Dumbbell,
  TrendingUp,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
  Zap,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { sessionService } from '../services/sessionService';
import { classService } from '../services/classService';
import SessionCard from '../components/session/SessionCard';
import Button from '../components/ui/Button';
import Loading from '../components/ui/Loading';
import { ROUTES } from '../utils/constants';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [featuredSessions, setFeaturedSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessions = await sessionService.getAllSessions();
        // Get first 3 sessions as featured
        setFeaturedSessions(sessions.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: Dumbbell,
      title: 'Expert Training',
      description: 'Professional trainers with years of experience',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your fitness journey and achievements',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a supportive fitness community',
    },
    {
      icon: Calendar,
      title: 'Flexible Schedule',
      description: 'Book sessions that fit your lifestyle',
    },
  ];

  const benefits = [
    'Personalized workout plans',
    'Nutrition guidance',
    'Progress tracking',
    '24/7 support access',
    'Flexible cancellation',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

        <div className="container-custom relative py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {isAuthenticated && user && (
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <Zap size={16} />
                  <span className="text-sm font-medium">
                    Welcome back, {user.firstName}!
                  </span>
                </div>
              )}

              <h1 className="text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Transform Your
                <br />
                <span className="text-accent-200">Fitness Journey</span>
              </h1>

              <p className="text-xl text-white/90 mb-8">
                Professional personal training tailored to your goals. Get stronger, fitter, and
                healthier with expert guidance.
              </p>

              <div className="flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <>
                    <Link to={ROUTES.SESSIONS}>
                      <Button size="lg" className="bg-white text-primary-600 hover:bg-white/90">
                        Browse Sessions
                        <ArrowRight size={20} />
                      </Button>
                    </Link>
                    <Link to={ROUTES.CLASSES}>
                      <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                        View Classes
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={ROUTES.REGISTER}>
                      <Button size="lg" className="bg-white text-primary-600 hover:bg-white/90">
                        Get Started Free
                        <ArrowRight size={20} />
                      </Button>
                    </Link>
                    <Link to={ROUTES.LOGIN}>
                      <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent-400 to-primary-400 rounded-3xl blur-2xl opacity-30"></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 space-y-6">
                  <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="text-accent-300 flex-shrink-0" size={24} />
                      <span className="text-lg">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive fitness solutions for your wellness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-primary-500 to-secondary-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sessions */}
      {!isLoading && featuredSessions.length > 0 && (
        <section className="py-20">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-2">
                  Featured Sessions
                </h2>
                <p className="text-xl text-gray-600">
                  Book your spot in these popular training sessions
                </p>
              </div>
              <Link to={ROUTES.SESSIONS}>
                <Button variant="outline">
                  View All
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </div>
        </section>
      )}

      {isLoading && <Loading />}

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-700 text-white">
          <div className="container-custom text-center">
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to Start Your Transformation?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of satisfied clients who have achieved their fitness goals with our
              expert training programs.
            </p>
            <Link to={ROUTES.REGISTER}>
              <Button size="lg" className="bg-white text-primary-600 hover:bg-white/90">
                Start Your Free Trial
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
