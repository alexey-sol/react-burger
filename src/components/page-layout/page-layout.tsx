import { clsx } from 'clsx';

import type { FC, PropsWithChildren } from 'react';

import styles from './page-layout.module.css';

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return <main className={clsx(styles.main, 'p-30')}>{children}</main>;
};
