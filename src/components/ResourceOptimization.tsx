import React, { useState } from 'react';
import { BarChart3, Users, MapPin, Clock, TrendingUp, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

const ResourceOptimization: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'utilization' | 'workload' | 'conflicts'>('utilization');

  const classroomData = [
    { name: 'A101', utilization: 85, capacity: 60, type: 'Lecture Hall' },
    { name: 'A102', utilization: 92, capacity: 60, type: 'Lecture Hall' },
    { name: 'B201', utilization: 78, capacity: 40, type: 'Classroom' },
    { name: 'B202', utilization: 65, capacity: 40, type: 'Classroom' },
    { name: 'Lab1', utilization: 95, capacity: 30, type: 'Computer Lab' },
    { name: 'Lab2', utilization: 88, capacity: 30, type: 'Computer Lab' },
    { name: 'Lab3', utilization: 72, capacity: 25, type: 'Electronics Lab' }
  ];

  const facultyWorkload = [
    { name: 'Dr. Smith', hours: 18, maxHours: 20, courses: 4, efficiency: 95 },
    { name: 'Prof. Johnson', hours: 16, maxHours: 20, courses: 3, efficiency: 88 },
    { name: 'Dr. Brown', hours: 20, maxHours: 20, courses: 5, efficiency: 92 },
    { name: 'Prof. Davis', hours: 14, maxHours: 20, courses: 3, efficiency: 85 },
    { name: 'Dr. Wilson', hours: 17, maxHours: 20, courses: 4, efficiency: 90 }
  ];

  const aiSuggestions = [
    { type: 'optimization', message: 'Lab1 is at 95% capacity. Consider redistributing some sessions to Lab2.' },
    { type: 'efficiency', message: 'Room B202 has low utilization (65%). Can accommodate 2 more sessions.' },
    { type: 'balance', message: 'Prof. Davis has lighter workload. Can take on additional courses.' },
    { type: 'conflict', message: 'Peak hours (10-11 AM) show highest resource contention.' }
  ];

  const UtilizationChart = () => (
    <div className="space-y-4">
      {classroomData.map((room) => (
        <div key={room.name} className="flex items-center">
          <div className="w-16 text-sm font-medium text-gray-900">{room.name}</div>
          <div className="flex-1 mx-4">
            <div className="bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  room.utilization >= 90 ? 'bg-red-500' :
                  room.utilization >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${room.utilization}%` }}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">{room.utilization}%</span>
            <span className="text-xs text-gray-500">({room.type})</span>
          </div>
        </div>
      ))}
    </div>
  );

  const WorkloadChart = () => (
    <div className="space-y-4">
      {facultyWorkload.map((faculty) => (
        <div key={faculty.name} className="flex items-center">
          <div className="w-24 text-sm font-medium text-gray-900">{faculty.name}</div>
          <div className="flex-1 mx-4">
            <div className="bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(faculty.hours / faculty.maxHours) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">{faculty.hours}/{faculty.maxHours}h</span>
            <span className="text-xs text-gray-500">({faculty.courses} courses)</span>
          </div>
        </div>
      ))}
    </div>
  );

  const ConflictAnalysis = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2 text-xs text-gray-500">
        <div></div>
        <div className="text-center">9-10</div>
        <div className="text-center">10-11</div>
        <div className="text-center">11-12</div>
        <div className="text-center">2-3</div>
      </div>
      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
        <div key={day} className="grid grid-cols-5 gap-2 items-center">
          <div className="text-sm font-medium text-gray-900">{day}</div>
          {[65, 85, 78, 45, 52].map((conflict, index) => (
            <div key={index} className="h-8 rounded flex items-center justify-center text-xs text-white font-medium"
                 style={{ 
                   backgroundColor: conflict >= 80 ? '#ef4444' : 
                                   conflict >= 60 ? '#f59e0b' : '#10b981' 
                 }}>
              {conflict}%
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resource Optimization</h1>
        <p className="text-gray-600">AI-powered analytics for classroom utilization and faculty workload management</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">82%</div>
                <div className="text-sm text-gray-600">Avg. Utilization</div>
              </div>
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">17.2</div>
                <div className="text-sm text-gray-600">Avg. Faculty Hours</div>
              </div>
            </div>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">Peak Conflicts</div>
              </div>
            </div>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">94%</div>
                <div className="text-sm text-gray-600">Efficiency Score</div>
              </div>
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metric Selector */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Resource Analytics</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedMetric('utilization')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedMetric === 'utilization'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Classroom Utilization
                </button>
                <button
                  onClick={() => setSelectedMetric('workload')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedMetric === 'workload'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Faculty Workload
                </button>
                <button
                  onClick={() => setSelectedMetric('conflicts')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedMetric === 'conflicts'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Time Conflicts
                </button>
              </div>
            </div>

            <div className="min-h-[300px]">
              {selectedMetric === 'utilization' && <UtilizationChart />}
              {selectedMetric === 'workload' && <WorkloadChart />}
              {selectedMetric === 'conflicts' && <ConflictAnalysis />}
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Categories</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Lecture Halls</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">88.5%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Computer Labs</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">91.5%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Regular Classrooms</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">71.5%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Specialized Labs</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Slot Usage</h3>
              <div className="space-y-3">
                {[
                  { time: '9:00-10:00', usage: 75 },
                  { time: '10:00-11:00', usage: 92 },
                  { time: '11:00-12:00', usage: 85 },
                  { time: '2:00-3:00', usage: 68 },
                  { time: '3:00-4:00', usage: 58 }
                ].map((slot) => (
                  <div key={slot.time} className="flex items-center">
                    <div className="w-20 text-sm text-gray-600">{slot.time}</div>
                    <div className="flex-1 mx-3">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                          style={{ width: `${slot.usage}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{slot.usage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions Panel */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <Lightbulb className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">AI Optimization Suggestions</h3>
            </div>
            
            <div className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="flex items-start">
                    <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                      suggestion.type === 'optimization' ? 'bg-red-500' :
                      suggestion.type === 'efficiency' ? 'bg-green-500' :
                      suggestion.type === 'balance' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`} />
                    <p className="text-sm text-gray-700 leading-relaxed">{suggestion.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="font-medium text-blue-900 text-sm">Auto-Optimize Resources</div>
                <div className="text-xs text-blue-600 mt-1">Let AI redistribute classes for better utilization</div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="font-medium text-green-900 text-sm">Balance Faculty Workload</div>
                <div className="text-xs text-green-600 mt-1">Redistribute courses evenly among faculty</div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <div className="font-medium text-purple-900 text-sm">Resolve Peak Conflicts</div>
                <div className="text-xs text-purple-600 mt-1">Optimize scheduling for high-demand time slots</div>
              </button>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Overall Efficiency</span>
                <span className="text-sm font-semibold text-green-600">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Resource Optimization</span>
                <span className="text-sm font-semibold text-blue-600">89%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conflict Resolution</span>
                <span className="text-sm font-semibold text-purple-600">96%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Faculty Satisfaction</span>
                <span className="text-sm font-semibold text-orange-600">92%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceOptimization;