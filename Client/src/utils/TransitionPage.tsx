// utils/TransitionPage.tsx

import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface TransitionPageProps {
  children: ReactNode;
}

const TransitionPage: React.FC<TransitionPageProps> = ({ children }) => {
  const location = useLocation();
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    setKey(location.pathname);
  }, [location]);

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionPage;
