import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3x3, Palette, Flower, Star, Sparkles } from "lucide-react";
import sampleKolam1 from "@/assets/sample-kolam-1.jpg";
import sampleKolam2 from "@/assets/sample-kolam-2.jpg";
import sampleKolam3 from "@/assets/sample-kolam-3.jpg";
import sampleKolam4 from "@/assets/sample-kolam-4.jpg";

interface SamplePattern {
  id: string;
  name: string;
  image: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  dots: number;
  description: string;
}

const samplePatterns: SamplePattern[] = [
  {
    id: "1",
    name: "Classic Geometric",
    image: sampleKolam1,
    category: "traditional",
    difficulty: "Beginner",
    dots: 25,
    description: "Simple geometric pattern perfect for beginners"
  },
  {
    id: "2", 
    name: "Lotus Bloom",
    image: sampleKolam2,
    category: "floral",
    difficulty: "Intermediate",
    dots: 49,
    description: "Beautiful floral motif with intricate curves"
  },
  {
    id: "3",
    name: "Festival Mandala",
    image: sampleKolam3,
    category: "festival",
    difficulty: "Advanced",
    dots: 81,
    description: "Colorful festival design for celebrations"
  },
  {
    id: "4",
    name: "Modern Fusion",
    image: sampleKolam4,
    category: "modern",
    difficulty: "Intermediate",
    dots: 36,
    description: "Contemporary interpretation of traditional art"
  }
];

const categories = [
  { id: "all", label: "All Patterns", icon: Grid3x3 },
  { id: "traditional", label: "Traditional", icon: Star },
  { id: "floral", label: "Floral", icon: Flower },
  { id: "festival", label: "Festival", icon: Sparkles },
  { id: "modern", label: "Modern", icon: Palette }
];

export const SamplePatternsViewer = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const filteredPatterns = selectedCategory === "all" 
    ? samplePatterns 
    : samplePatterns.filter(pattern => pattern.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-primary mb-4">
          Explore Sample Patterns
        </h3>
        <p className="text-lg text-muted-foreground">
          Discover beautiful Kolam designs across different categories
        </p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              <category.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{category.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPatterns.map((pattern) => (
                <Card key={pattern.id} className="group hover:shadow-kolam transition-all duration-300 border-2">
                  <CardHeader className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img 
                        src={pattern.image} 
                        alt={pattern.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{pattern.name}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getDifficultyColor(pattern.difficulty)}`}
                      >
                        {pattern.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {pattern.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{pattern.dots} dots</span>
                      <span className="capitalize">{pattern.category}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};