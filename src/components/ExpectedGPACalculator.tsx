
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ExpectedGPACalculator = () => {
  const [currentGPA, setCurrentGPA] = useState('');
  const [currentHours, setCurrentHours] = useState('');
  const [newHours, setNewHours] = useState('');
  const [targetGPA, setTargetGPA] = useState('');
  const [requiredGrade, setRequiredGrade] = useState<string | null>(null);
  const [possibleGPA, setPossibleGPA] = useState<number | null>(null);
  const [selectedGrade, setSelectedGrade] = useState('');
  const { toast } = useToast();

  const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C+': 2.5, 'C': 2.0, 'D+': 1.5, 'D': 1.0, 'F': 0.0
  };

  const calculateRequiredGrade = () => {
    if (!currentGPA || !currentHours || !newHours || !targetGPA) {
      toast({
        title: "خطأ في الإدخال",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const currentGPANum = parseFloat(currentGPA);
    const currentHoursNum = parseInt(currentHours);
    const newHoursNum = parseInt(newHours);
    const targetGPANum = parseFloat(targetGPA);

    if (currentGPANum > 4.0 || targetGPANum > 4.0 || currentGPANum < 0 || targetGPANum < 0) {
      toast({
        title: "خطأ في القيم",
        description: "المعدل يجب أن يكون بين 0 و 4.0",
        variant: "destructive",
      });
      return;
    }

    const totalCurrentPoints = currentGPANum * currentHoursNum;
    const totalHoursAfter = currentHoursNum + newHoursNum;
    const totalPointsNeeded = targetGPANum * totalHoursAfter;
    const pointsNeeded = totalPointsNeeded - totalCurrentPoints;
    const requiredAverage = pointsNeeded / newHoursNum;

    if (requiredAverage > 4.0) {
      setRequiredGrade("غير ممكن - المعدل المطلوب عالي جداً");
    } else if (requiredAverage < 0) {
      setRequiredGrade("يمكن تحقيق المعدل المطلوب بأي درجة");
    } else {
      let grade = 'F';
      for (const [gradeKey, points] of Object.entries(gradePoints)) {
        if (points >= requiredAverage) {
          grade = gradeKey;
        }
      }
      setRequiredGrade(`${grade} (${requiredAverage.toFixed(2)} نقطة على الأقل)`);
    }

    toast({
      title: "تم الحساب بنجاح",
      description: "تم حساب المعدل المطلوب للوصول للهدف",
    });
  };

  const calculatePossibleGPA = () => {
    if (!currentGPA || !currentHours || !newHours || !selectedGrade) {
      toast({
        title: "خطأ في الإدخال",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const currentGPANum = parseFloat(currentGPA);
    const currentHoursNum = parseInt(currentHours);
    const newHoursNum = parseInt(newHours);
    const gradePoints = gradePoints[selectedGrade];

    const totalCurrentPoints = currentGPANum * currentHoursNum;
    const newPoints = gradePoints * newHoursNum;
    const totalPoints = totalCurrentPoints + newPoints;
    const totalHours = currentHoursNum + newHoursNum;
    const newGPA = totalPoints / totalHours;

    setPossibleGPA(newGPA);

    toast({
      title: "تم الحساب بنجاح",
      description: `المعدل المتوقع هو ${newGPA.toFixed(2)}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">حاسبة المعدل المتوقع</h2>
        <p className="text-gray-600">احسب المعدل المطلوب للوصول لهدفك أو المعدل المتوقع بدرجة معينة</p>
      </div>

      {/* Current Status Input */}
      <Card className="border-2 border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
          <CardTitle>الوضع الأكاديمي الحالي</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="currentGPA">المعدل التراكمي الحالي</Label>
              <Input
                id="currentGPA"
                type="number"
                step="0.01"
                max="4.0"
                min="0"
                value={currentGPA}
                onChange={(e) => setCurrentGPA(e.target.value)}
                placeholder="3.50"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="currentHours">إجمالي الساعات المكتسبة</Label>
              <Input
                id="currentHours"
                type="number"
                min="1"
                value={currentHours}
                onChange={(e) => setCurrentHours(e.target.value)}
                placeholder="60"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="newHours">ساعات الفصل القادم</Label>
              <Input
                id="newHours"
                type="number"
                min="1"
                max="21"
                value={newHours}
                onChange={(e) => setNewHours(e.target.value)}
                placeholder="15"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculate Required Grade */}
        <Card className="border-2 border-green-100">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 ml-2" />
              حساب المعدل المطلوب
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="targetGPA">المعدل المستهدف</Label>
                <Input
                  id="targetGPA"
                  type="number"
                  step="0.01"
                  max="4.0"
                  min="0"
                  value={targetGPA}
                  onChange={(e) => setTargetGPA(e.target.value)}
                  placeholder="3.75"
                  className="mt-1"
                />
              </div>
              <Button
                onClick={calculateRequiredGrade}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Calculator className="w-4 h-4 ml-2" />
                احسب المعدل المطلوب
              </Button>
              
              {requiredGrade && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">المعدل المطلوب:</h4>
                  <p className="text-green-700">{requiredGrade}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Calculate Possible GPA */}
        <Card className="border-2 border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardTitle className="flex items-center">
              <Calculator className="w-5 h-5 ml-2" />
              حساب المعدل المتوقع
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="selectedGrade">المعدل المتوقع للفصل</Label>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="اختر المعدل المتوقع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+ (4.0)</SelectItem>
                    <SelectItem value="A">A (4.0)</SelectItem>
                    <SelectItem value="B+">B+ (3.5)</SelectItem>
                    <SelectItem value="B">B (3.0)</SelectItem>
                    <SelectItem value="C+">C+ (2.5)</SelectItem>
                    <SelectItem value="C">C (2.0)</SelectItem>
                    <SelectItem value="D+">D+ (1.5)</SelectItem>
                    <SelectItem value="D">D (1.0)</SelectItem>
                    <SelectItem value="F">F (0.0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={calculatePossibleGPA}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                <Calculator className="w-4 h-4 ml-2" />
                احسب المعدل المتوقع
              </Button>
              
              {possibleGPA !== null && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">المعدل المتوقع:</h4>
                  <p className="text-2xl font-bold text-blue-700">{possibleGPA.toFixed(2)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpectedGPACalculator;
