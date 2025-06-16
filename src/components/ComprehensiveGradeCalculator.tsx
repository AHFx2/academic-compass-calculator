
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, School } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ComprehensiveGradeCalculator = () => {
  const [qudratScore, setQudratScore] = useState('');
  const [tahsiliScore, setTahsiliScore] = useState('');
  const [thanaweyaScore, setThanaweyaScore] = useState('');
  const [qudratWeight, setQudratWeight] = useState('30');
  const [tahsiliWeight, setTahsiliWeight] = useState('30');
  const [thanaweyaWeight, setThanaweyaWeight] = useState('40');
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const { toast } = useToast();

  const calculateTotalScore = () => {
    if (!qudratScore || !tahsiliScore || !thanaweyaScore) {
      toast({
        title: "خطأ في الإدخال",
        description: "يرجى إدخال جميع الدرجات المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const qudrat = parseFloat(qudratScore);
    const tahsili = parseFloat(tahsiliScore);
    const thanaweyaNum = parseFloat(thanaweyaScore);
    const qudratW = parseFloat(qudratWeight);
    const tahsiliW = parseFloat(tahsiliWeight);
    const thanaweyaW = parseFloat(thanaweyaWeight);

    // Validate scores
    if (qudrat < 0 || qudrat > 100 || tahsili < 0 || tahsili > 100 || thanaweyaNum < 0 || thanaweyaNum > 100) {
      toast({
        title: "خطأ في القيم",
        description: "الدرجات يجب أن تكون بين 0 و 100",
        variant: "destructive",
      });
      return;
    }

    // Validate weights
    if (qudratW + tahsiliW + thanaweyaW !== 100) {
      toast({
        title: "خطأ في النسب",
        description: "مجموع النسب يجب أن يكون 100%",
        variant: "destructive",
      });
      return;
    }

    const total = (qudrat * qudratW / 100) + (tahsili * tahsiliW / 100) + (thanaweyaNum * thanaweyaW / 100);
    setTotalScore(total);

    toast({
      title: "تم الحساب بنجاح",
      description: `النسبة الموزونة هي ${total.toFixed(2)}%`,
    });
  };

  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGradeText = (score: number) => {
    if (score >= 90) return 'ممتاز';
    if (score >= 80) return 'جيد جداً';
    if (score >= 70) return 'جيد';
    if (score >= 60) return 'مقبول';
    return 'ضعيف';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">حاسبة النسبة الموزونة</h2>
        <p className="text-gray-600">احسب النسبة الموزونة للقدرات والتحصيلي والثانوية العامة</p>
      </div>

      {/* Scores Input */}
      <Card className="border-2 border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
          <CardTitle className="flex items-center">
            <School className="w-5 h-5 ml-2" />
            الدرجات المحققة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="qudratScore">درجة القدرات</Label>
              <Input
                id="qudratScore"
                type="number"
                min="0"
                max="100"
                value={qudratScore}
                onChange={(e) => setQudratScore(e.target.value)}
                placeholder="85"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">من 100</p>
            </div>
            <div>
              <Label htmlFor="tahsiliScore">درجة التحصيلي</Label>
              <Input
                id="tahsiliScore"
                type="number"
                min="0"
                max="100"
                value={tahsiliScore}
                onChange={(e) => setTahsiliScore(e.target.value)}
                placeholder="90"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">من 100</p>
            </div>
            <div>
              <Label htmlFor="thanaweyaScore">نسبة الثانوية العامة</Label>
              <Input
                id="thanaweyaScore"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={thanaweyaScore}
                onChange={(e) => setThanaweyaScore(e.target.value)}
                placeholder="95.5"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">نسبة مئوية</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weights Configuration */}
      <Card className="border-2 border-green-100">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardTitle>أوزان النسب (يمكن تعديلها حسب الجامعة)</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="qudratWeight">وزن القدرات (%)</Label>
              <Input
                id="qudratWeight"
                type="number"
                min="0"
                max="100"
                value={qudratWeight}
                onChange={(e) => setQudratWeight(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="tahsiliWeight">وزن التحصيلي (%)</Label>
              <Input
                id="tahsiliWeight"
                type="number"
                min="0"
                max="100"
                value={tahsiliWeight}
                onChange={(e) => setTahsiliWeight(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="thanaweyaWeight">وزن الثانوية (%)</Label>
              <Input
                id="thanaweyaWeight"
                type="number"
                min="0"
                max="100"
                value={thanaweyaWeight}
                onChange={(e) => setThanaweyaWeight(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              مجموع النسب: {(parseFloat(qudratWeight || '0') + parseFloat(tahsiliWeight || '0') + parseFloat(thanaweyaWeight || '0'))}%
              {(parseFloat(qudratWeight || '0') + parseFloat(tahsiliWeight || '0') + parseFloat(thanaweyaWeight || '0')) !== 100 && 
                <span className="text-red-600 font-medium"> (يجب أن يكون 100%)</span>
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Calculate Button */}
      <div className="text-center">
        <Button
          onClick={calculateTotalScore}
          size="lg"
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-3 text-lg"
        >
          <Calculator className="w-5 h-5 ml-2" />
          احسب النسبة الموزونة
        </Button>
      </div>

      {/* Result */}
      {totalScore !== null && (
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">النتيجة النهائية</h3>
            <div className={`text-5xl font-bold ${getGradeColor(totalScore)} mb-2`}>
              {totalScore.toFixed(2)}%
            </div>
            <p className={`text-xl font-semibold ${getGradeColor(totalScore)} mb-4`}>
              {getGradeText(totalScore)}
            </p>
            
            {/* Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-500">مساهمة القدرات</p>
                <p className="text-lg font-semibold text-blue-600">
                  {((parseFloat(qudratScore || '0') * parseFloat(qudratWeight || '0')) / 100).toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">مساهمة التحصيلي</p>
                <p className="text-lg font-semibold text-green-600">
                  {((parseFloat(tahsiliScore || '0') * parseFloat(tahsiliWeight || '0')) / 100).toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">مساهمة الثانوية</p>
                <p className="text-lg font-semibold text-purple-600">
                  {((parseFloat(thanaweyaScore || '0') * parseFloat(thanaweyaWeight || '0')) / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComprehensiveGradeCalculator;
