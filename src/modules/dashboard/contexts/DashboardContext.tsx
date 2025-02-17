import { createContext, useContext, ReactNode, useMemo } from 'react';
import { ROLE } from '@modules/permissions/defs/types';
import useRoles from '@modules/roles/hooks/useRoles';

interface DashboardContextType {
  isAdmin: boolean;
  isOrganizer: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const { hasRole } = useRoles();

  const value = useMemo(
    () => ({
      isAdmin: hasRole(ROLE.ADMIN),
      isOrganizer: hasRole(ROLE.ORGANIZER),
    }),
    [hasRole]
  );

  return (
    <DashboardContext.Provider value={{ isAdmin: true, isOrganizer: false }}>
      {children}
    </DashboardContext.Provider>
  );
  // return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
