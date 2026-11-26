import type { UserState } from './slice';
import type { RootState } from '@/app/store';

export const selectIsAuthChecked = (state: RootState): UserState['isAuthChecked'] =>
  state.user.isAuthChecked;

export const selectUser = (state: RootState): UserState['user'] => state.user.user;
