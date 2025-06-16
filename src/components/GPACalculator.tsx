
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  name: string;
  hours: number;
  grade: string;
}

const GPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseName, setCourseName] = useState('');
  const [courseHours, setCourseHours] = useState('');
  const [courseGrade, setCourseGrade] = useState('');
  const [gpa, setGPA] = useState<number | null>(null);
  const { toast } = useToast();

  const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C+': 2.5, 'C': 2.0, 'D+': 1.5, 'D': 1.0, 'F': 0.0
  };

  const addCourse = () => {
    if (!courseName || !courseHours || !courseGrade) {
      toast({
        title: "خطأ في الإدخال",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const newCourse: Course = {
      id: Date.now().toString(),
      name: courseName,
      hours: parseInt(courseHours),
      grade: courseGrade
    };

    setCourses([...courses, newCourse]);
    setCourseName('');
    setCourseHours('');
    setCourseGrade('');
    
    toast({
      title: "تم إضافة المادة بنجاح",
      description: `تمت إضافة ${courseName} إلى قائمة المواد`,
    });
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const calculateGPA = () => {
    if (courses.length === 0) {
      toast({
        title: "لا توجد مواد",
        description: "يرجى إضافة المواد أولاً لحساب المعدل",
        variant: "destructive",
      });
      return;
    }

    let totalPoints = 0;
    let totalHours = 0;

    courses.forEach(course => {
      totalPoints += gradePoints[course.grade] * course.hours;
      totalHours += course.hours;
    });

    const calculatedGPA = totalPoints / totalHours;
    setGPA(calculatedGPA);
    
    toast({
      title: "تم حساب المعدل بنجاح",
      description: `المعدل التراكمي الخاص بك هو ${calculatedGPA.toFixed(2)}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">حاسبة المعدل الجامعي (GPA)</h2>
        <p className="text-gray-600">أضف موادك الدراسية وساعاتها ودرجاتها لحساب معدلك التراكمي</p>
      </div>

      {/* Add Course Form */}
      <Card className="border-2 border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
          <CardTitle className="flex items-center">
            <Plus className="w-5 h-5 ml-2" />
            إضافة مادة جديدة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="courseName">اسم المادة</Label>
              <Input
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="مثال: الرياضيات"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="courseHours">عدد الساعات</Label>
              <Input
                id="courseHours"
                type="number"
                value={courseHours}
                onChange={(e) => setCourseHours(e.target.value)}
                placeholder="3"
                min="1"
                max="6"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="courseGrade">الدرجة</Label>
              <Select value={courseGrade} onValueChange={setCourseGrade}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="اختر الدرجة" />
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
            <div className="flex items-end">
              <Button 
                onClick={addCourse}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses List */}
      {courses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>المواد المضافة ({courses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">اسم المادة:</span>
                      <p className="font-medium">{course.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">الساعات:</span>
                      <p className="font-medium">{course.hours}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">الدرجة:</span>
                      <p className="font-medium">{course.grade} ({gradePoints[course.grade]})</p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeCourse(course.id)}
                    className="mr-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calculate Button */}
      <div className="text-center">
        <Button
          onClick={calculateGPA}
          size="lg"
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-3 text-lg"
          disabled={courses.length === 0}
        >
          <Calculator className="w-5 h-5 ml-2" />
          احسب المعدل التراكمي
        </Button>
      </div>

      {/* GPA Result */}
      {gpa !== null && (
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">النتيجة</h3>
            <div className="text-4xl font-bold text-green-600 mb-2">
              {gpa.toFixed(2)}
            </div>
            <p className="text-gray-600">المعدل التراكمي من 4.0</p>
            <div className="mt-4 text-sm text-gray-500">
              إجمالي الساعات: {courses.reduce((sum, course) => sum + course.hours, 0)} ساعة
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GPACalculator;
