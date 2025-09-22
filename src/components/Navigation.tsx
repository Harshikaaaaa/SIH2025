import React from 'react';
import { GraduationCap, Home, Calendar, BarChart3, LogOut, User } from 'lucide-react';
import type { User as UserType } from '../App';

interface NavigationProps {
  user: UserType | null;
  currentPage: string;
  onNavigate: (page: 'dashboard' | 'generate' | 'timetable' | 'resources') => void;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, currentPage, onNavigate, onLogout }) => {
  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'generate', name: 'Generate', icon: Calendar },
    { id: 'timetable', name: 'Timetable', icon: Calendar },
    { id: 'resources', name: 'Resources', icon: BarChart3 }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center mr-3">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SmartSchedule</h1>
                <p className="text-xs text-blue-600">NEP 2020 Compliant</p>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id as any)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-2">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-1" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;