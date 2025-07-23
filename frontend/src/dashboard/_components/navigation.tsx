import {
  Users,
  UserCheck,
  BarChart3,
  Settings,
  MessageSquare,
  ChevronsLeft,
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import {
  useRef,
  useState
} from 'react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const { currentUser } = useApp();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const userNavItems = [
    { id: 'browse', label: 'Browse Skills', icon: Users },
    { id: 'swaps', label: 'My Swaps', icon: UserCheck },
    { id: 'profile', label: 'My Profile', icon: Settings },
  ];

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'swaps', label: 'Monitor Swaps', icon: UserCheck },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const navItems = currentUser?.isAdmin ? adminNavItems : userNavItems;

  // --- Resize Handlers ---
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;
    if (newWidth < 200) newWidth = 200;
    if (newWidth > 500) newWidth = 500;

    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const collapseSidebar = () => {
    setIsCollapsed(true);
    setIsResetting(true);
    if (sidebarRef.current) {
      sidebarRef.current.style.width = '0';
    }
    setTimeout(() => setIsResetting(false), 300);
  };

  const resetSidebar = () => {
    setIsCollapsed(false);
    setIsResetting(true);
    if (sidebarRef.current) {
      sidebarRef.current.style.width = '250px';
    }
    setTimeout(() => setIsResetting(false), 300);
  };

  // --- JSX ---
  return (
    <div className="relative h-full">
      <nav
        ref={sidebarRef}
        className={`bg-white shadow-sm border-r border-gray-200 h-full overflow-y-auto flex-shrink-0 ${
          isResetting ? 'transition-all duration-300 ease-in-out' : ''
        }`}
        style={{ width: isCollapsed ? '0' : '250px' }}
      >
        <div className="p-4 relative">
          {/* Collapse Button */}
          {!isCollapsed && (
            <button
              onClick={collapseSidebar}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              title="Collapse"
            >
              <ChevronsLeft className="w-5 h-5" />
            </button>
          )}
          <div className="space-y-2 mt-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        {/* Resize Divider */}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetSidebar}
          className="absolute top-0 right-0 h-full w-1 cursor-ew-resize bg-blue-200 opacity-0 hover:opacity-100 transition"
        />
      </nav>
    </div>
  );
}
