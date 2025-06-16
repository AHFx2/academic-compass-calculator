
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Book } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HighSchoolCalculator = () => {
  const [firstYear, setFirstYear] = useState('');
  const [secondYear, setSecondYear] = useState('');
  const [thirdYear, setThirdYear] = useState('');
  const [firstYearWeight, setFirstYearWeight] = useState('25');
  const [secondYearWeight, setSecondYearWeight] = useState('35');
  const [thirdYearWeight, setThirdYearWeight] = useState('40');
  const [totalAverage, setTotalAverage] = useState<number | null>(null);
  const { toast } = useToast();

  const calculateAverage = () => {
    if (!firstYear || !secondYear || !thirdYear) {
      toast({
        title: "خطأ في الإدخال",
        description: "يرجى إدخال درجات جميع السنوات الثلاث",
        variant: "destructive",
      });
      return;
    }

    const first = parseFloat(firstYear);
    const second = parseFloat(secondYear);
    const third = parseFloat(thirdYear);
    const firstW = parseFloat(firstYearWeight);
    const secondW = parseFloat(secondYearWeight);
    const thirdW = parseFloat(thirdYearWeight);

    // Validate scores
    if (first < 0 || first > 100 || second < 0 || second > 100 || third < 0 || third > 100) {
      toast({
        title: "خطأ في القيم",
        description: "الدرجات يجب أن تكون بين 0 و 100",
        variant: "destructive",
      });
      return;
    }

    // Validate weights
    if (firstW + secondW + thirdW !== 100) {
      toast({
        title: "خطأ في النسب",
        description: "مجموع نسب السنوات يجب أن يكون 100%",
        variant: "destructive",
      });
      return;
    }

    const total = (first * firstW / 100) + (second * secondW / 100) + (third * thirdW / 100);
    setTotalAverage(total);

    toast({
      title: "تم الحساب بنجاح",
      description: `المعدل التراكمي للثانوية هو ${total.toFixed(2)}%`,
    });
  };

  const getGradeColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 90) return 'text-blue-600';
    if (score >= 85) return 'text-yellow-600';
    if (score >= 80) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGradeText = (score: number) => {
    if (score >= 95) return 'ممتاز مرتفع';
    if (score >= 90) return 'ممتاز';
    if (score >= 85) return 'جيد جداً مرتفع';
    if (score >= 80) return 'جيد جداً';
    if (score >= 75) return 'جيد مرتفع';
    if (score >= 70) return 'جيد';
    if (score >= 65) return 'مقبول مرتفع';
    if (score >= 60) return 'مقبول';
    return 'ضعيف';
  };

  // Sample grade distribution
  const gradeDistribution = [
    { grade: 'أ', min: 90, max: 100, color: 'bg-green-500' },
    { grade: 'ب', min: 80, max: 89, color: 'bg-blue-500' },
    { grade: 'ج', min: 70, max: 79, color: 'bg-yellow-500' },
    { grade: 'د', min: 60, max: 69, color: 'bg-orange-500' },
    { grade: 'هـ', min: 50, max: 59, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">حاسبة معدل الثانوية العامة</h2>
        <p className="text-gray-600">احسب المعدل التراكمي للثانوية العامة للسنوات الثلاث</p>
      </div>

      {/* Years Scores Input */}
      <Card className="border-2 border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
          <CardTitle className="flex items-center">
            <Book className="w-5 h-5 ml-2" />
            درجات السنوات الدراسية
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="firstYear">السنة الأولى ثانوي</Label>
              <Input
                id="firstYear"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={firstYear}
                onChange={(e) => setFirstYear(e.target.value)}
                placeholder="85.50"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">النسبة المئوية</p>
            </div>
            <div>
              <Label htmlFor="secondYear">السنة الثانية ثانوي</Label>
              <Input
                id="secondYear"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={secondYear}
                onChange={(e) => setSecondYear(e.target.value)}
                placeholder="88.75"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">النسبة المئوية</p>
            </div>
            <div>
              <Label htmlFor="thirdYear">السنة الثالثة ثانوي</Label>
              <Input
                id="thirdYear"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={thirdYear}
                onChange={(e) => setThirdYear(e.target.value)}
                placeholder="92.25"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">النسبة المئوية</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weights Configuration */}
      <Card className="border-2 border-green-100">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardTitle>أوزان السنوات (يمكن تعديلها حسب النظام المتبع)</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="firstYearWeight">وزن السنة الأولى (%)</Label>
              <Input
                id="firstYearWeight"
                type="number"
                min="0"
                max="100"
                value={firstYearWeight}
                onChange={(e) => setFirstYearWeight(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="secondYearWeight">وزن السنة الثانية (%)</Label>
              <Input
                id="secondYearWeight"
                type="number"
                min="0"
                max="100"
                value={secondYearWeight}
                onChange={(e) => setSecondYearWeight(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="thirdYearWeight">وزن السنة الثالثة (%)</Label>
              <Input
                id="thirdYearWeight"
                type="number"
                min="0"
                max="100"
                value={thirdYearWeight}
                onChange={(e) => setThirdYearWeight(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              مجموع النسب: {(parseFloat(firstYearWeight || '0') + parseFloat(secondYearWeight || '0') + parseFloat(thirdYearWeight || '0'))}%
              {(parseFloat(firstYearWeight || '0') + parseFloat(secondYearWeight || '0') + parseFloat(thirdYearWeight || '0')) !== 100 && 
                <span className="text-red-600 font-medium"> (يجب أن يكون 100%)</span>
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Calculate Button */}
      <div className="text-center">
        <Button
          onClick={calculateAverage}
          size="lg"
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-3 text-lg"
        >
          <Calculator className="w-5 h-5 ml-2" />
          احسب المعدل التراكمي
        </Button>
      </div>

      {/* Result */}
      {totalAverage !== null && (
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">المعدل التراكمي للثانوية العامة</h3>
            <div className={`text-5xl font-bold ${getGradeColor(totalAverage)} mb-2`}>
              {totalAverage.toFixed(2)}%
            </div>
            <p className={`text-xl font-semibold ${getGradeColor(totalAverage)} mb-4`}>
              {getGradeText(totalAverage)}
            </p>
            
            {/* Grade Scale */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">سلم التقديرات</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {gradeDistribution.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-8 h-8 ${item.color} text-white rounded-full flex items-center justify-center mx-auto mb-1 text-sm font-bold`}>
                      {item.grade}
                    </div>
                    <p className="text-xs text-gray-600">{item.min}-{item.max}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-500">مساهمة السنة الأولى</p>
                <p className="text-lg font-semibold text-blue-600">
                  {((parseFloat(firstYear || '0') * parseFloat(firstYearWeight || '0')) / 100).toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">مساهمة السنة الثانية</p>
                <p className="text-lg font-semibold text-green-600">
                  {((parseFloat(secondYear || '0') * parseFloat(secondYearWeight || '0')) / 100).toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">مساهمة السنة الثالثة</p>
                <p className="text-lg font-semibold text-purple-600">
                  {((parseFloat(thirdYear || '0') * parseFloat(thirdYearWeight || '0')) / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HighSchoolCalculator;
