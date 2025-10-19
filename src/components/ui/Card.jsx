import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  onClick,
  glass = false,
  ...props
}) => {
  const baseClasses = glass ? 'card-glass' : 'card';
  const hoverClasses = hover ? 'cursor-pointer' : '';
  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  const MotionDiv = onClick || hover ? motion.div : 'div';

  const motionProps = onClick || hover
    ? {
        whileHover: { scale: 1.02, y: -4 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2 },
      }
    : {};

  return (
    <MotionDiv className={classes} onClick={onClick} {...motionProps} {...props}>
      {children}
    </MotionDiv>
  );
};

export default Card;
