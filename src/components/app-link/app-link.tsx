import { Link, type LinkProps } from 'react-router-dom';

import type { FC } from 'react';

import styles from './app-link.module.css';

export const AppLink: FC<LinkProps> = ({ children, ...linkProps }) => {
  return (
    <Link className={styles.link} {...linkProps}>
      {children}
    </Link>
  );
};
