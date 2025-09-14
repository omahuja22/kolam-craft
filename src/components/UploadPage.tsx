import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Image, Loader2, CheckCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const UploadPage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setAnalysis(null);

    // Simulate ML analysis with realistic delay
    setTimeout(() => {
      // Mock analysis results
      const mockResults = {
        pattern_type: "Traditional Pookalam",
        confidence: 0.89,
        complexity: "High",
        dot_count: 108,
        symmetry: "Radial",
        dominant_colors: ["Deep Red", "Golden Yellow", "White"],
        cultural_significance: "Festival decoration pattern commonly used during Onam celebrations",
        similar_patterns: [
          { name: "Lotus Kolam", similarity: 0.76 },
          { name: "Rangoli Circular", similarity: 0.71 },
          { name: "Mandala Basic", similarity: 0.68 }
        ]
      };

      setAnalysis(mockResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete!",
        description: `Identified as ${mockResults.pattern_type} with ${Math.round(mockResults.confidence * 100)}% confidence`,
      });
    }, 3000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage(e.target?.result as string);
          analyzeImage();
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Kolam Pattern Analyzer</h1>
        <p className="text-xl text-muted-foreground">
          Upload a Kolam image to analyze its patterns using our trained CNN model
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Kolam Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadedImage ? (
                <div className="space-y-4">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded Kolam" 
                    className="max-w-full max-h-64 mx-auto rounded-lg shadow-soft object-contain"
                  />
                  <p className="text-sm text-muted-foreground">Click to upload a different image</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Image className="h-16 w-16 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">Drop your Kolam image here</p>
                    <p className="text-sm text-muted-foreground">or click to browse files</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supports JPG, PNG • Max 5MB
                  </p>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {uploadedImage && (
              <div className="mt-4 space-y-2">
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline" 
                  className="w-full"
                >
                  Upload Different Image
                </Button>
                {!isAnalyzing && !analysis && (
                  <Button onClick={analyzeImage} className="w-full">
                    Analyze Pattern
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isAnalyzing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : analysis ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Info className="h-5 w-5" />
              )}
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="text-center py-12">
                <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-lg font-medium mb-2">Analyzing Pattern...</p>
                <p className="text-sm text-muted-foreground">Processing with CNN model</p>
              </div>
            ) : analysis ? (
              <div className="space-y-6">
                {/* Main Classification */}
                <div className="text-center p-6 bg-gradient-accent rounded-lg">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {analysis.pattern_type}
                  </h3>
                  <Badge variant="secondary" className="text-lg px-4 py-1">
                    {Math.round(analysis.confidence * 100)}% Confidence
                  </Badge>
                </div>

                {/* Pattern Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Complexity</h4>
                    <p className="text-sm">{analysis.complexity}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Dot Count</h4>
                    <p className="text-sm">{analysis.dot_count}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Symmetry</h4>
                    <p className="text-sm">{analysis.symmetry}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Colors</h4>
                    <p className="text-sm">{analysis.dominant_colors.join(", ")}</p>
                  </div>
                </div>

                {/* Cultural Significance */}
                <div>
                  <h4 className="font-semibold text-primary mb-2">Cultural Significance</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {analysis.cultural_significance}
                  </p>
                </div>

                {/* Similar Patterns */}
                <div>
                  <h4 className="font-semibold text-primary mb-3">Similar Patterns</h4>
                  <div className="space-y-2">
                    {analysis.similar_patterns.map((pattern: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm">{pattern.name}</span>
                        <Badge variant="outline">
                          {Math.round(pattern.similarity * 100)}% similar
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Info className="h-12 w-12 mx-auto mb-4" />
                <p>Upload an image to see analysis results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};