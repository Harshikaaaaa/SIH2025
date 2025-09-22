import React, { useState } from 'react';
import { Upload, Calendar, Users, MapPin, Zap, FileText, Download } from 'lucide-react';
import type { Course, TimetableSlot } from '../App';

interface TimetableGenerationProps {
  onGenerate: (timetable: TimetableSlot[]) => void;
  onNavigate: (page: 'timetable') => void;
}

const TimetableGeneration: React.FC<TimetableGenerationProps> = ({ onGenerate, onNavigate }) => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const programs = [
    'Computer Science Engineering',
    'Electronics and Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Technology'
  ];

  const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];

  const mockCourses: Course[] = [
    { id: '1', name: 'Data Structures', code: 'CS301', credits: 4, faculty: 'Dr. Smith', type: 'theory', color: 'bg-blue-500' },
    { id: '2', name: 'Database Systems Lab', code: 'CS302L', credits: 2, faculty: 'Prof. Johnson', type: 'lab', color: 'bg-green-500' },
    { id: '3', name: 'Operating Systems', code: 'CS303', credits: 4, faculty: 'Dr. Brown', type: 'theory', color: 'bg-purple-500' },
    { id: '4', name: 'Computer Networks', code: 'CS304', credits: 3, faculty: 'Prof. Davis', type: 'theory', color: 'bg-orange-500' },
    { id: '5', name: 'Software Engineering Lab', code: 'CS305L', credits: 2, faculty: 'Dr. Wilson', type: 'lab', color: 'bg-red-500' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const generateMockTimetable = (): TimetableSlot[] => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['9:00-10:00', '10:00-11:00', '11:00-12:00', '2:00-3:00', '3:00-4:00'];
    const rooms = ['A101', 'A102', 'B201', 'Lab1', 'Lab2'];
    
    const timetable: TimetableSlot[] = [];
    
    days.forEach((day, dayIndex) => {
      timeSlots.forEach((time, timeIndex) => {
        if (Math.random() > 0.3) { // 70% chance of having a class
          const course = mockCourses[Math.floor(Math.random() * mockCourses.length)];
          const room = rooms[Math.floor(Math.random() * rooms.length)];
          
          timetable.push({
            id: `${day}-${timeIndex}`,
            day,
            time,
            course,
            room,
            hasConflict: Math.random() < 0.05 // 5% chance of conflict
          });
        }
      });
    });
    
    return timetable;
  };

  const handleGenerate = async () => {
    if (!selectedSemester || !selectedProgram) {
      alert('Please select semester and program');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate AI processing
    const intervals = [20, 40, 60, 80, 100];
    for (const progress of intervals) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setGenerationProgress(progress);
    }

    const timetable = generateMockTimetable();
    onGenerate(timetable);
    setIsGenerating(false);
    setGenerationProgress(0);
    
    // Navigate to timetable view
    setTimeout(() => onNavigate('timetable'), 500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate AI-Optimized Timetable</h1>
        <p className="text-gray-600">Upload student preferences and generate conflict-free schedules automatically</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Configuration */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Basic Configuration</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Program</option>
                  {programs.map((program) => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Semester</option>
                  {semesters.map((semester) => (
                    <option key={semester} value={semester}>{semester}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Upload className="w-5 h-5 text-green-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Course Data Import</h2>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="mb-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Click to upload
                    </span>
                    <span className="text-sm text-gray-500"> or drag and drop</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500">CSV, Excel files up to 10MB</p>
                {uploadedFile && (
                  <div className="mt-3 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">{uploadedFile.name}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                <Download className="w-4 h-4 mr-1" />
                Download Template
              </button>
            </div>
          </div>

          {/* AI Configuration */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Zap className="w-5 h-5 text-purple-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">AI Optimization Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">Conflict Resolution</label>
                  <p className="text-xs text-gray-500">Automatically resolve scheduling conflicts</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">Load Balancing</label>
                  <p className="text-xs text-gray-500">Distribute faculty workload evenly</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">Resource Optimization</label>
                  <p className="text-xs text-gray-500">Maximize classroom and lab utilization</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Status Panel */}
        <div className="space-y-6">
          {/* Generation Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Generation Status</h2>
            
            {isGenerating ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Processing...</span>
                  <span>{generationProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>• Analyzing course requirements</div>
                  <div>• Checking faculty availability</div>
                  <div>• Optimizing resource allocation</div>
                  <div>• Resolving conflicts</div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">Ready to generate optimized timetable</p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Stats</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-700">Faculty Available</span>
                </div>
                <span className="text-sm font-medium text-gray-900">86</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700">Classrooms</span>
                </div>
                <span className="text-sm font-medium text-gray-900">42</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm text-gray-700">Time Slots</span>
                </div>
                <span className="text-sm font-medium text-gray-900">45</span>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !selectedSemester || !selectedProgram}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center"
          >
            <Zap className="w-5 h-5 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Timetable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimetableGeneration;