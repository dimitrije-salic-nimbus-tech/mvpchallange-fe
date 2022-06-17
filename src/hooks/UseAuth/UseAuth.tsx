import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { StoreState } from '../../store';
import { UserState } from '../../store/slices/auth/types';

export const useAuth = () => {
  const { user, accesstoken } = useSelector<StoreState, UserState>((state) => state.user);

  const isAuthenticated = useMemo((): boolean => !!user && !!accesstoken, [user, accesstoken]);

  const role = useMemo(() => user?.role, [user]);

  return {
    user,
    isAuthenticated,
    role,
  };
};
