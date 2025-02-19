import { createContext, useContext, useState, useMemo } from 'react';

export type View = 'grid' | 'list';

interface DashboardContextProps {
  open: boolean;
  view: View;
  onToggle: VoidFunction;
  onView: (view: View) => void;
}

const DashboardContext = createContext({} as DashboardContextProps);

interface DashboardProviderProps {
  children: React.ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [open, setOpen] = useState(true);
  const [view, setView] = useState<View>('grid');

  const contextValue = useMemo(
    () => ({
      open,
      view,
      onToggle: () => setOpen(!open),
      onView: (newView: View) => setView(newView),
    }),
    [open, view]
  );

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }

  return context;
};
