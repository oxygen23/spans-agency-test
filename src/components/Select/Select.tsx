import { Variants, motion } from 'framer-motion';
import { FC, MouseEventHandler, useState } from 'react';

import styles from './Select.module.sass';

const itemVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.2 }, y: 20 },
  open: {
    opacity: 1,
    transition: { damping: 24, stiffness: 300, type: 'spring' },
    y: 0,
  },
};

const Select: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<string>('All');

  const handleCurrentFilter = (filterProp: string): MouseEventHandler<HTMLLIElement> => () => {
    setCurrentFilter(filterProp);
  };

  return (
    <motion.nav
      animate={isOpen ? 'open' : 'closed'}
      className={`${styles.main_left__select}`}
      initial={false}
    >
      <motion.button
        className={`${styles.main_left__select_button}`}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.97 }}
      >
        {currentFilter}
        <motion.div
          style={{ originY: 0.55 }}
          transition={{ duration: 0.2 }}
          variants={{
            closed: { rotate: 0 },
            open: { rotate: 180 },
          }}
        >
          <svg height="15" viewBox="0 0 20 20" width="15">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.div>
      </motion.button>
      <motion.ul
        className={`${styles.main_left__select_list}`}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        variants={{
          closed: {
            clipPath: 'inset(10% 50% 90% 50% round 10px)',
            transition: {
              bounce: 0,
              duration: 0.6,
              type: 'spring',
            },
          },
          open: {
            clipPath: 'inset(0% 0% 0% 0% round 10px)',
            transition: {
              bounce: 0,
              delayChildren: 0.3,
              duration: 0.4,
              staggerChildren: 0.05,
              type: 'spring',
            },
          },
        }}
      >
        <motion.li
          className={currentFilter === 'All'
            ? `${styles.main_left__select_list_item} ${styles.active}`
            : `${styles.main_left__select_list_item}`}
          onClick={handleCurrentFilter('All')}
          variants={itemVariants}
        >
          All
        </motion.li>
        <motion.li
          className={currentFilter === 'Favorite'
            ? `${styles.main_left__select_list_item} ${styles.active}`
            : `${styles.main_left__select_list_item}`}
          onClick={handleCurrentFilter('Favorite')}
          variants={itemVariants}
        >
          Favorite
        </motion.li>
        <motion.li
          className={currentFilter === 'Old'
            ? `${styles.main_left__select_list_item} ${styles.active}`
            : `${styles.main_left__select_list_item}`}
          onClick={handleCurrentFilter('Old')}
          variants={itemVariants}
        >
          Old
        </motion.li>
        <motion.li
          className={currentFilter === 'New'
            ? `${styles.main_left__select_list_item} ${styles.active}`
            : `${styles.main_left__select_list_item}`}
          onClick={handleCurrentFilter('New')}
          variants={itemVariants}
        >
          New
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};
export default Select;
