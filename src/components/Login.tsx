import React, { useState } from 'react';
import { User, BookOpen, GraduationCap } from 'lucide-react';
import type { User as UserType } from '../App';

interface LoginProps {
  onLogin: (user: UserType) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'faculty' | 'student'>('admin');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      const user: UserType = {
        id: '1',
        name: selectedRole === 'admin' ? 'Dr. Admin User' : 
              selectedRole === 'faculty' ? 'Prof. Faculty User' : 'Student User',
        role: selectedRole,
        email: email || `${selectedRole}@college.edu`
      };
      onLogin(user);
      setIsLoading(false);
    }, 1000);
  };

  const roles = [
    { id: 'admin', name: 'Administrator', icon: User, color: 'bg-blue-500' },
    { id: 'faculty', name: 'Faculty', icon: GraduationCap, color: 'bg-green-500' },
    { id: 'student', name: 'Student', icon: BookOpen, color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SmartSchedule</h1>
          <p className="text-gray-600">AI-Powered Timetable Generation</p>
          <p className="text-sm text-blue-600 mt-1">Aligned with NEP 2020</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Role
              </label>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id as any)}
                      className={`flex items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedRole === role.id
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg ${role.color} flex items-center justify-center mr-3`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{role.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder={`${selectedRole}@college.edu`}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              Demo System - Choose any role to explore the platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;