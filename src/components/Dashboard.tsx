import React from 'react';
import { Calendar, Users, BookOpen, BarChart3, Clock, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import type { User } from '../App';

interface DashboardProps {
  onNavigate: (page: 'generate' | 'timetable' | 'resources') => void;
  user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, user }) => {
  const quickActions = [
    {
      id: 'generate',
      title: 'Generate Timetable',
      description: 'Create AI-optimized timetables with conflict resolution',
      icon: Calendar,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      id: 'timetable',
      title: 'View Timetables',
      description: 'Browse and manage existing timetable schedules',
      icon: BookOpen,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      id: 'resources',
      title: 'Resource Analytics',
      description: 'Monitor classroom utilization and faculty workload',
      icon: BarChart3,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    }
  ];

  const stats = [
    { label: 'Active Courses', value: '248', icon: BookOpen, change: '+12%', color: 'text-blue-600' },
    { label: 'Faculty Members', value: '86', icon: Users, change: '+3%', color: 'text-green-600' },
    { label: 'Classrooms', value: '42', icon: Clock, change: '0%', color: 'text-purple-600' },
    { label: 'Success Rate', value: '98.7%', icon: CheckCircle, change: '+0.3%', color: 'text-emerald-600' }
  ];

  const recentActivity = [
    { action: 'Timetable generated for CSE Semester 5', time: '2 hours ago', status: 'success' },
    { action: 'Resource conflict resolved in Block A', time: '4 hours ago', status: 'warning' },
    { action: 'Faculty availability updated', time: '6 hours ago', status: 'info' },
    { action: 'New course added: Machine Learning Lab', time: '1 day ago', status: 'success' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-600">
          Manage your timetable generation and resource optimization with AI-powered insights
        </p>
      </div>

      {/* NEP 2020 Compliance Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">NEP 2020 Compliant System</h2>
            <p className="opacity-90">
              Multidisciplinary approach • Credit-based framework • Flexible curriculum design
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => onNavigate(action.id as any)}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-left group"
                >
                  <div className={`w-12 h-12 ${action.color} ${action.hoverColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 mb-1">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">AI Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-700">Optimal resource utilization achieved</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                <span className="text-sm text-gray-700">Lab Block B at 85% capacity</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
                <span className="text-sm text-gray-700">Faculty workload well-balanced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;