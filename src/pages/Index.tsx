
import React, { useState } from 'react';
import { Calculator, GraduationCap, School, Book, User } from 'lucide-react';
import GPACalculator from '@/components/GPACalculator';
import ExpectedGPACalculator from '@/components/ExpectedGPACalculator';
import ComprehensiveGradeCalculator from '@/components/ComprehensiveGradeCalculator';
import HighSchoolCalculator from '@/components/HighSchoolCalculator';

const Index = () => {
  const [activeTab, setActiveTab] = useState('gpa');

  const tabs = [
    { id: 'gpa', name: 'حاسبة المعدل الجامعي', icon: Calculator },
    { id: 'expected', name: 'المعدل المتوقع', icon: GraduationCap },
    { id: 'comprehensive', name: 'المعدل التراكمي', icon: School },
    { id: 'highschool', name: 'معدل الثانوية', icon: Book }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'gpa':
        return <GPACalculator />;
      case 'expected':
        return <ExpectedGPACalculator />;
      case 'comprehensive':
        return <ComprehensiveGradeCalculator />;
      case 'highschool':
        return <HighSchoolCalculator />;
      default:
        return <GPACalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <GraduationCap className="w-8 h-8 text-blue-600 ml-3" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                حاسبة المعدلات الأكاديمية
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              أداتك الشاملة لحساب جميع المعدلات الدراسية بدقة واحترافية
            </p>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  <IconComponent className="w-5 h-5 ml-2" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderActiveComponent()}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-blue-600 ml-2" />
            <p className="text-gray-600">تم تطويره لخدمة الطلاب والطالبات</p>
          </div>
          <p className="text-sm text-gray-500">
            جميع الحسابات دقيقة ومعتمدة على المعايير الأكاديمية المتبعة
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
