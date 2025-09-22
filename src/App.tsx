import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import TimetableGeneration from './components/TimetableGeneration';
import GeneratedTimetable from './components/GeneratedTimetable';
import ResourceOptimization from './components/ResourceOptimization';
import Login from './components/Login';
import Navigation from './components/Navigation';

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'faculty' | 'student';
  email: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  faculty: string;
  type: 'theory' | 'lab' | 'practical';
  color: string;
}

export interface TimetableSlot {
  id: string;
  day: string;
  time: string;
  course: Course;
  room: string;
  hasConflict?: boolean;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'generate' | 'timetable' | 'resources'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [generatedTimetable, setGeneratedTimetable] = useState<TimetableSlot[]>([]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} user={user} />;
      case 'generate':
        return (
          <TimetableGeneration 
            onGenerate={setGeneratedTimetable}
            onNavigate={setCurrentPage}
          />
        );
      case 'timetable':
        return (
          <GeneratedTimetable 
            timetable={generatedTimetable}
            onRegenerate={() => setCurrentPage('generate')}
          />
        );
      case 'resources':
        return <ResourceOptimization />;
      default:
        return <Dashboard onNavigate={setCurrentPage} user={user} />;
    }
  };

  if (currentPage === 'login') {
    return renderCurrentPage();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        user={user}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />
      <main className="pt-16">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;