import { FC, PropsWithChildren } from 'react';

import { Role } from '../../shared/enums/Role';
import { useAuth } from '../../hooks/UseAuth/UseAuth';

type Props = {
  allowedRole: Role;
};

const RoleProtected: FC<PropsWithChildren<Props>> = ({ children, allowedRole }) => {
  const { role } = useAuth();

  if (allowedRole !== role) {
    return <></>;
  }

  return <>{children}</>;
};

export default RoleProtected;
