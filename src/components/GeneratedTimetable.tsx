import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, AlertTriangle, CheckCircle, RefreshCw, Download, Share } from 'lucide-react';
import type { TimetableSlot, Course } from '../App';

interface GeneratedTimetableProps {
  timetable: TimetableSlot[];
  onRegenerate: () => void;
}

const GeneratedTimetable: React.FC<GeneratedTimetableProps> = ({ timetable, onRegenerate }) => {
  const [selectedSlot, setSelectedSlot] = useState<TimetableSlot | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['9:00-10:00', '10:00-11:00', '11:00-12:00', '2:00-3:00', '3:00-4:00'];

  const getSlotForDayTime = (day: string, time: string): TimetableSlot | undefined => {
    return timetable.find(slot => slot.day === day && slot.time === time);
  };

  const conflictCount = timetable.filter(slot => slot.hasConflict).length;
  const totalSlots = timetable.length;
  const utilizationRate = Math.round((totalSlots / (days.length * timeSlots.length)) * 100);

  const handleSlotClick = (slot: TimetableSlot) => {
    setSelectedSlot(slot);
  };

  const CourseCard = ({ slot }: { slot: TimetableSlot }) => (
    <div
      onClick={() => handleSlotClick(slot)}
      className={`${slot.course.color} text-white p-3 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105 relative ${
        slot.hasConflict ? 'ring-2 ring-red-400' : ''
      }`}
    >
      {slot.hasConflict && (
        <AlertTriangle className="w-4 h-4 absolute top-1 right-1 text-red-200" />
      )}
      <div className="text-sm font-medium mb-1 truncate">{slot.course.name}</div>
      <div className="text-xs opacity-90">{slot.course.code}</div>
      <div className="text-xs opacity-75 mt-1">{slot.room}</div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Generated Timetable</h1>
          <p className="text-gray-600">AI-optimized schedule with conflict resolution</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </button>
          <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Share className="w-4 h-4 mr-2" />
            Share
          </button>
          <button
            onClick={onRegenerate}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalSlots}</div>
              <div className="text-sm text-gray-600">Total Classes</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{utilizationRate}%</div>
              <div className="text-sm text-gray-600">Utilization</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <AlertTriangle className={`w-8 h-8 mr-3 ${conflictCount > 0 ? 'text-red-600' : 'text-green-600'}`} />
            <div>
              <div className="text-2xl font-bold text-gray-900">{conflictCount}</div>
              <div className="text-sm text-gray-600">Conflicts</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">98.7%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {conflictCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-800 font-medium">
              {conflictCount} conflict{conflictCount > 1 ? 's' : ''} detected
            </span>
          </div>
          <p className="text-red-700 text-sm mt-1">
            AI suggestions: Consider adjusting faculty availability or room assignments
          </p>
        </div>
      )}

      {viewMode === 'grid' ? (
        /* Grid View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 border-r border-gray-200">
                    Time
                  </th>
                  {days.map((day) => (
                    <th key={day} className="px-6 py-4 text-center text-sm font-medium text-gray-900 border-r border-gray-200 last:border-r-0">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {timeSlots.map((time) => (
                  <tr key={time} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200 bg-gray-50">
                      {time}
                    </td>
                    {days.map((day) => {
                      const slot = getSlotForDayTime(day, time);
                      return (
                        <td key={day} className="px-3 py-4 border-r border-gray-200 last:border-r-0">
                          {slot ? (
                            <CourseCard slot={slot} />
                          ) : (
                            <div className="h-16 flex items-center justify-center text-gray-400 text-xs">
                              Free
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {days.map((day) => (
            <div key={day} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{day}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {timeSlots.map((time) => {
                  const slot = getSlotForDayTime(day, time);
                  return (
                    <div key={time} className="border border-gray-200 rounded-lg p-3">
                      <div className="text-xs font-medium text-gray-500 mb-2">{time}</div>
                      {slot ? (
                        <div
                          onClick={() => handleSlotClick(slot)}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <div className="text-sm font-medium text-gray-900 mb-1">{slot.course.name}</div>
                          <div className="text-xs text-gray-500">{slot.course.code} • {slot.room}</div>
                          <div className="text-xs text-gray-500">{slot.course.faculty}</div>
                          {slot.hasConflict && (
                            <div className="flex items-center mt-1">
                              <AlertTriangle className="w-3 h-3 text-red-500 mr-1" />
                              <span className="text-xs text-red-600">Conflict</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400">Free Period</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Details Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Course Details</h3>
              <button
                onClick={() => setSelectedSlot(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">{selectedSlot.course.name}</h4>
                <p className="text-sm text-gray-600">{selectedSlot.course.code}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{selectedSlot.course.faculty}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{selectedSlot.room}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{selectedSlot.day}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{selectedSlot.time}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">Credits: {selectedSlot.course.credits}</span>
                </div>
                <div className="flex items-center">
                  {selectedSlot.hasConflict ? (
                    <div className="flex items-center text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      <span className="text-sm">Conflict</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">No Conflict</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratedTimetable;