import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, RefreshCw, Zap, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const GeneratePage = () => {
  const [gridSize, setGridSize] = useState([5]);
  const [patternType, setPatternType] = useState<string>("");
  const [complexity, setComplexity] = useState([3]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPattern, setGeneratedPattern] = useState<string | null>(null);
  const [patternMetadata, setPatternMetadata] = useState<any>(null);
  const { toast } = useToast();

  const patternTypes = [
    { value: "traditional", label: "Traditional Kolam", description: "Classic symmetric patterns" },
    { value: "modern", label: "Modern Fusion", description: "Contemporary artistic designs" },
    { value: "geometric", label: "Geometric", description: "Mathematical precision patterns" },
    { value: "floral", label: "Floral Motifs", description: "Nature-inspired designs" },
    { value: "festival", label: "Festival Special", description: "Celebration patterns" }
  ];

  // Sample pattern configurations for realistic kolam generation
  const sampleConfigs = [
    { grid: 7, type: "traditional", complexity: 4, name: "Sacred Lotus Mandala" },
    { grid: 9, type: "geometric", complexity: 5, name: "Cosmic Geometry" },
    { grid: 6, type: "floral", complexity: 3, name: "Garden of Petals" },
    { grid: 8, type: "festival", complexity: 4, name: "Celebration Burst" },
    { grid: 5, type: "modern", complexity: 3, name: "Contemporary Flow" }
  ];

  const applySampleConfig = (config: typeof sampleConfigs[0]) => {
    setGridSize([config.grid]);
    setPatternType(config.type);
    setComplexity([config.complexity]);
    toast({
      title: "Configuration Applied",
      description: `Using ${config.name} preset`,
    });
  };

  const getPatternColorPalette = (type: string) => {
    const palettes: Record<string, string[]> = {
      traditional: ["Saffron Gold", "Temple Red", "Sacred White", "Deep Maroon"],
      floral: ["Lotus Pink", "Leaf Green", "Petal Orange", "Sky Blue"],
      geometric: ["Royal Purple", "Golden Yellow", "Ocean Blue", "Pure White"],
      festival: ["Vibrant Orange", "Celebration Red", "Festive Gold", "Joyful Pink"],
      modern: ["Contemporary Teal", "Urban Gray", "Artistic Blue", "Modern White"]
    };
    return palettes[type] || palettes.traditional;
  };

  const generatePattern = async () => {
    if (!patternType) {
      toast({
        title: "Pattern type required",
        description: "Please select a pattern type to generate",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedPattern(null);
    setPatternMetadata(null);

    // Optimized generation - reduced delay and improved algorithm
    setTimeout(async () => {
      try {
        const seed = Date.now(); // Use timestamp for unique patterns
        const dots = gridSize[0] * gridSize[0];
        const complexityLevel = complexity[0];

        // Optimized SVG pattern generation
        const svgPattern = generateOptimizedSVGPattern(gridSize[0], patternType, complexityLevel, seed);
        setGeneratedPattern(svgPattern);

        const metadata = {
          grid_size: `${gridSize[0]} × ${gridSize[0]}`,
          total_dots: dots,
          pattern_type: patternTypes.find(p => p.value === patternType)?.label,
          complexity_level: complexityLevel,
          estimated_time: Math.round(dots * complexityLevel * 0.3) + " minutes",
          difficulty: complexityLevel <= 2 ? "Beginner" : complexityLevel <= 4 ? "Intermediate" : "Advanced",
          traditional_name: generateTraditionalName(patternType, complexityLevel),
          color_palette: getPatternColorPalette(patternType)
        };

        setPatternMetadata(metadata);
        setIsGenerating(false);

        toast({
          title: "✨ Pattern Generated!",
          description: `Beautiful ${metadata.pattern_type} pattern ready`,
        });
      } catch (error) {
        setIsGenerating(false);
        toast({
          title: "Generation failed",
          description: "Please try different parameters",
          variant: "destructive"
        });
      }
    }, 1200); // Reduced from 2500ms to 1200ms
  };

  const generateOptimizedSVGPattern = (gridSize: number, type: string, complexity: number, seed: number) => {
    const size = 700;
    const padding = 50;
    const innerSize = size - 2 * padding;
    const centerX = size / 2;
    const centerY = size / 2;
    
    // Optimized dot grid with minimal visibility
    const dots: { x: number; y: number }[] = [];
    const cellSize = innerSize / (gridSize + 1);
    const dotRadius = Math.max(0.8, cellSize / 25); // Even smaller dots
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        dots.push({ 
          x: padding + (i + 1) * cellSize, 
          y: padding + (j + 1) * cellSize 
        });
      }
    }

    const paths: string[] = [];
    const decorativeElements: string[] = [];
    const dotElements: string[] = [];
    
    // Extremely subtle guide dots - barely visible
    dots.forEach((dot, index) => {
      const opacity = 0.08; // Very subtle
      dotElements.push(`
        <circle cx="${dot.x}" cy="${dot.y}" r="${dotRadius}" 
                fill="url(#guideDotGradient)" 
                opacity="${opacity}"/>
      `);
    });
    
    if (type === 'traditional') {
      // Enhanced Traditional Kolam with sophisticated patterns
      const layers = Math.max(3, complexity);
      
      // Central sacred geometry
      for (let layer = 1; layer <= layers; layer++) {
        const radius = (layer * innerSize) / (layers * 2.2);
        const petals = 8 + layer * 4;
        
        // Create beautiful flowing curves
        for (let i = 0; i < petals; i++) {
          const angle = (i * 2 * Math.PI) / petals;
          const nextAngle = ((i + 1) * 2 * Math.PI) / petals;
          
          const x1 = centerX + Math.cos(angle) * radius;
          const y1 = centerY + Math.sin(angle) * radius;
          const x2 = centerX + Math.cos(nextAngle) * radius;
          const y2 = centerY + Math.sin(nextAngle) * radius;
          
          // Enhanced control points for smooth curves
          const controlRadius = radius * 1.6;
          const controlAngle = angle + (nextAngle - angle) / 2;
          const controlX = centerX + Math.cos(controlAngle) * controlRadius;
          const controlY = centerY + Math.sin(controlAngle) * controlRadius;
          
          paths.push(`M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`);
          
          // Intricate inner patterns
          if (layer > 1) {
            const innerRadius = radius * 0.6;
            const innerX = centerX + Math.cos(angle) * innerRadius;
            const innerY = centerY + Math.sin(angle) * innerRadius;
            
            // Create loops around dots
            dots.forEach(dot => {
              const distToDot = Math.sqrt((dot.x - innerX) ** 2 + (dot.y - innerY) ** 2);
              if (distToDot < cellSize * 0.8) {
                const loopRadius = cellSize * 0.3;
                paths.push(`M ${dot.x + loopRadius} ${dot.y} 
                           A ${loopRadius} ${loopRadius} 0 1 1 ${dot.x - loopRadius} ${dot.y}
                           A ${loopRadius} ${loopRadius} 0 1 1 ${dot.x + loopRadius} ${dot.y}`);
              }
            });
          }
        }
      }
      
    } else if (type === 'floral') {
      // Enhanced Lotus and organic patterns
      const petalLayers = Math.max(4, complexity + 1);
      
      // Central lotus
      for (let layer = 1; layer <= petalLayers; layer++) {
        const layerRadius = (layer * innerSize) / (petalLayers * 2.5);
        const petalsInLayer = 8 + layer * 6;
        
        for (let i = 0; i < petalsInLayer; i++) {
          const angle = (i * 2 * Math.PI) / petalsInLayer + (layer * 0.3);
          const petalTipX = centerX + Math.cos(angle) * layerRadius;
          const petalTipY = centerY + Math.sin(angle) * layerRadius;
          
          // Organic petal curves
          const petalWidth = layerRadius * 0.4;
          const leftAngle = angle - (0.6 / layer);
          const rightAngle = angle + (0.6 / layer);
          
          const leftX = centerX + Math.cos(leftAngle) * petalWidth;
          const leftY = centerY + Math.sin(leftAngle) * petalWidth;
          const rightX = centerX + Math.cos(rightAngle) * petalWidth;
          const rightY = centerY + Math.sin(rightAngle) * petalWidth;
          
          paths.push(`M ${centerX} ${centerY} 
                     C ${leftX} ${leftY} ${leftX} ${leftY} ${petalTipX} ${petalTipY}
                     C ${rightX} ${rightY} ${rightX} ${rightY} ${centerX} ${centerY}`);
          
          // Flowing stems
          if (layer === petalLayers) {
            const stemLength = layerRadius * 1.3;
            const stemX = centerX + Math.cos(angle) * stemLength;
            const stemY = centerY + Math.sin(angle) * stemLength;
            
            paths.push(`M ${petalTipX} ${petalTipY} 
                       Q ${(petalTipX + stemX) / 2} ${(petalTipY + stemY) / 2 + 20} ${stemX} ${stemY}`);
          }
        }
      }
      
    } else if (type === 'geometric') {
      // Advanced sacred geometry
      const layers = complexity + 2;
      
      for (let layer = 1; layer <= layers; layer++) {
        const radius = (layer * innerSize) / (layers * 2.3);
        const sides = 6 + layer * 2;
        
        // Sacred polygons
        const polygonPoints = [];
        for (let i = 0; i < sides; i++) {
          const angle = (i * 2 * Math.PI) / sides + (layer * Math.PI / sides);
          polygonPoints.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            angle
          });
        }
        
        // Connect vertices with curves
        for (let i = 0; i < sides; i++) {
          const current = polygonPoints[i];
          const next = polygonPoints[(i + 1) % sides];
          
          if (layer % 2 === 0) {
            // Curved sacred arcs
            const midX = (current.x + next.x) / 2;
            const midY = (current.y + next.y) / 2;
            const controlOffset = radius * 0.3;
            const controlX = midX + controlOffset * Math.cos(current.angle + Math.PI/2);
            const controlY = midY + controlOffset * Math.sin(current.angle + Math.PI/2);
            
            paths.push(`M ${current.x} ${current.y} Q ${controlX} ${controlY} ${next.x} ${next.y}`);
          } else {
            paths.push(`M ${current.x} ${current.y} L ${next.x} ${next.y}`);
          }
        }
        
        // Star connections
        if (layer > 1) {
          for (let i = 0; i < sides; i += 2) {
            const current = polygonPoints[i];
            const opposite = polygonPoints[(i + Math.floor(sides/2)) % sides];
            paths.push(`M ${current.x} ${current.y} L ${opposite.x} ${opposite.y}`);
          }
        }
      }
      
    } else if (type === 'festival') {
      // Vibrant celebration patterns
      const burstLayers = complexity + 3;
      
      // Central celebration burst
      for (let layer = 1; layer <= burstLayers; layer++) {
        const layerRadius = (layer * innerSize) / (burstLayers * 2.2);
        const rays = 12 + layer * 8;
        
        for (let i = 0; i < rays; i++) {
          const angle = (i * 2 * Math.PI) / rays;
          const isLongRay = i % 3 === 0;
          const rayLength = isLongRay ? layerRadius : layerRadius * 0.7;
          
          const rayTipX = centerX + Math.cos(angle) * rayLength;
          const rayTipY = centerY + Math.sin(angle) * rayLength;
          
          if (isLongRay) {
            // Decorative ray ends
            const rayWidth = layerRadius * 0.15;
            const perpAngle1 = angle + Math.PI/2;
            const perpAngle2 = angle - Math.PI/2;
            
            const side1X = rayTipX + Math.cos(perpAngle1) * rayWidth;
            const side1Y = rayTipY + Math.sin(perpAngle1) * rayWidth;
            const side2X = rayTipX + Math.cos(perpAngle2) * rayWidth;
            const side2Y = rayTipY + Math.sin(perpAngle2) * rayWidth;
            
            paths.push(`M ${centerX} ${centerY} L ${side1X} ${side1Y} L ${rayTipX} ${rayTipY} L ${side2X} ${side2Y} Z`);
          } else {
            paths.push(`M ${centerX} ${centerY} L ${rayTipX} ${rayTipY}`);
          }
        }
        
        // Firework sparkles
        if (layer === burstLayers) {
          for (let i = 0; i < rays; i += 3) {
            const angle = (i * 2 * Math.PI) / rays;
            const sparkleX = centerX + Math.cos(angle) * layerRadius * 1.2;
            const sparkleY = centerY + Math.sin(angle) * layerRadius * 1.2;
            
            const sparkleSize = 8;
            paths.push(`M ${sparkleX - sparkleSize} ${sparkleY} L ${sparkleX + sparkleSize} ${sparkleY}
                       M ${sparkleX} ${sparkleY - sparkleSize} L ${sparkleX} ${sparkleY + sparkleSize}`);
          }
        }
      }
      
    } else if (type === 'modern') {
      // Contemporary flowing patterns
      const flowLayers = complexity + 2;
      
      for (let layer = 1; layer <= flowLayers; layer++) {
        const radius = (layer * innerSize) / (flowLayers * 2.5);
        const segments = 16 + layer * 4;
        
        // Flowing wave patterns
        const wavePoints = [];
        for (let i = 0; i < segments; i++) {
          const angle = (i * 2 * Math.PI) / segments;
          const waveOffset = Math.sin(angle * 3 + layer) * radius * 0.3;
          const adjustedRadius = radius + waveOffset;
          
          wavePoints.push({
            x: centerX + Math.cos(angle) * adjustedRadius,
            y: centerY + Math.sin(angle) * adjustedRadius
          });
        }
        
        // Connect with smooth curves
        for (let i = 0; i < segments; i++) {
          const current = wavePoints[i];
          const next = wavePoints[(i + 1) % segments];
          const control = wavePoints[(i + 2) % segments];
          
          paths.push(`M ${current.x} ${current.y} Q ${next.x} ${next.y} ${control.x} ${control.y}`);
        }
        
        // Modern geometric accents
        if (layer > 1) {
          const accentCount = layer * 3;
          for (let i = 0; i < accentCount; i++) {
            const angle = (i * 2 * Math.PI) / accentCount;
            const accentX = centerX + Math.cos(angle) * radius * 0.8;
            const accentY = centerY + Math.sin(angle) * radius * 0.8;
            
            const accentSize = 12;
            paths.push(`M ${accentX} ${accentY - accentSize} L ${accentX + accentSize} ${accentY + accentSize} 
                       L ${accentX - accentSize} ${accentY + accentSize} Z`);
          }
        }
      }
    }

    const backgroundPatterns = {
      traditional: '#fef7cd',
      floral: '#f0fdf4', 
      geometric: '#f8fafc',
      festival: '#fef3c7',
      modern: '#f1f5f9'
    };

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#ea580c;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ca8a04;stop-opacity:1" />
          </linearGradient>
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#7c2d12;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#451a03;stop-opacity:0.9" />
          </radialGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#b91c1c;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#a16207;stop-opacity:1" />
          </linearGradient>
          <radialGradient id="guideDotGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#451a03;stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:#451a03;stop-opacity:0.05" />
          </radialGradient>
          
          <filter id="kolam-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect width="100%" height="100%" fill="${backgroundPatterns[type as keyof typeof backgroundPatterns] || backgroundPatterns.traditional}" />
        
        ${dotElements.join('')}
        
        <g filter="url(#kolam-glow)">
          ${paths.map((path, index) => {
            const strokeWidth = Math.max(2, 4.5 - (index % 4) * 0.5);
            const gradientId = index % 3 === 0 ? 'primaryGradient' : index % 3 === 1 ? 'accentGradient' : 'centerGradient';
            return `<path d="${path}" stroke="url(#${gradientId})" stroke-width="${strokeWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>`;
          }).join('')}
        </g>
        
        ${decorativeElements.join('')}
      </svg>
    `;
  };

  const generateTraditionalName = (type: string, complexity: number) => {
    const names: Record<string, string[]> = {
      traditional: ["Pulli Kolam", "Kambi Kolam", "Margazhi Kolam", "Rangoli Mandala", "Chikku Kolam"],
      floral: ["Lotus Mandala", "Rose Petal Design", "Jasmine Pattern", "Marigold Circle", "Hibiscus Bloom"],
      geometric: ["Yantra Pattern", "Sacred Geometry", "Hexagonal Mandala", "Star Formation", "Crystal Grid"],
      festival: ["Diwali Special", "Pongal Pattern", "New Year Design", "Celebration Mandala", "Joy Burst"],
      modern: ["Contemporary Flow", "Urban Mandala", "Fusion Pattern", "Artistic Expression", "Modern Classic"]
    };
    
    const typeNames = names[type] || names.traditional;
    return typeNames[complexity - 1] || typeNames[0];
  };

  const downloadPattern = () => {
    if (!generatedPattern) return;
    
    const blob = new Blob([generatedPattern], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kolam-pattern-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Pattern Downloaded",
      description: "SVG file saved successfully",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-glow">
          Generate Beautiful Kolam Patterns
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create stunning traditional and modern Kolam designs with AI-powered pattern generation
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Settings Panel */}
        <Card className="border-2 shadow-kolam">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Pattern Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Sample Configurations */}
              <div>
                <Label className="text-sm font-medium mb-3 block">✨ Perfect Sample Configs</Label>
                <div className="grid grid-cols-1 gap-2">
                  {sampleConfigs.map((config, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => applySampleConfig(config)}
                      className="justify-start text-left p-3 h-auto hover:bg-accent/50 transition-all"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{config.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {config.grid}×{config.grid} • {config.type} • Level {config.complexity}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="gridSize" className="text-sm font-medium">Grid Size: {gridSize[0]} × {gridSize[0]}</Label>
                <Slider
                  id="gridSize"
                  min={3}
                  max={12}
                  step={1}
                  value={gridSize}
                  onValueChange={setGridSize}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="patternType" className="text-sm font-medium">Pattern Type</Label>
                <Select value={patternType} onValueChange={setPatternType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose a pattern style" />
                  </SelectTrigger>
                  <SelectContent>
                    {patternTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="complexity" className="text-sm font-medium">Complexity Level: {complexity[0]}/5</Label>
                <Slider
                  id="complexity"
                  min={1}
                  max={5}
                  step={1}
                  value={complexity}
                  onValueChange={setComplexity}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Simple</span>
                  <span>Intricate</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button 
                onClick={generatePattern} 
                disabled={!patternType || isGenerating}
                className="flex-1 shadow-kolam hover:shadow-lg transition-all"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate Pattern
                  </>
                )}
              </Button>
              {generatedPattern && (
                <Button 
                  onClick={downloadPattern}
                  variant="outline"
                  size="lg"
                  className="shadow-kolam hover:shadow-lg transition-all"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Generated Pattern Display */}
        <Card className="border-2 shadow-kolam">
          <CardHeader>
            <CardTitle>Generated Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedPattern ? (
              <div className="space-y-6">
                <div className="relative bg-muted/30 rounded-lg p-4 overflow-hidden">
                  <div 
                    className="w-full flex justify-center items-center transform hover:scale-105 transition-transform duration-300"
                    dangerouslySetInnerHTML={{ __html: generatedPattern }}
                  />
                  
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge variant="secondary" className="text-xs bg-white/80 backdrop-blur-sm">
                      {patternMetadata?.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-white/80 backdrop-blur-sm">
                      {patternMetadata?.pattern_type}
                    </Badge>
                  </div>
                </div>

                {/* Pattern Metadata */}
                {patternMetadata && (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-primary">Type:</strong>
                      <p>{patternMetadata.pattern_type}</p>
                    </div>
                    <div>
                      <strong className="text-primary">Grid:</strong>
                      <p>{patternMetadata.grid_size}</p>
                    </div>
                    <div>
                      <strong className="text-primary">Difficulty:</strong>
                      <p>{patternMetadata.difficulty}</p>
                    </div>
                    <div>
                      <strong className="text-primary">Est. Time:</strong>
                      <p>{patternMetadata.estimated_time}</p>
                    </div>
                    <div className="col-span-2">
                      <strong className="text-primary">Traditional Name:</strong>
                      <p>{patternMetadata.traditional_name}</p>
                    </div>
                    <div className="col-span-2">
                      <strong className="text-primary">Color Palette:</strong>
                      <div className="flex gap-2 mt-1">
                        {patternMetadata.color_palette.map((color: string, index: number) => (
                          <span key={index} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Zap className="h-12 w-12 mx-auto mb-4" />
                <p>Configure settings and generate your first pattern</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};