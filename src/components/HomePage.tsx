import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Zap, Brain, Palette, Award, Sparkles, History, BookOpen } from "lucide-react";
import { SamplePatternsViewer } from "@/components/SamplePatternsViewer";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import kolamHero from "@/assets/kolam-hero.jpg";
import sampleKolam1 from "@/assets/sample-kolam-1.jpg";
import sampleKolam2 from "@/assets/sample-kolam-2.jpg";
import sampleKolam5 from "@/assets/sample-kolam-5.jpg";

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export const HomePage = ({ onPageChange }: HomePageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  const AnimatedSection = ({ children, className = "", delay = 0 }: { 
    children: React.ReactNode; 
    className?: string; 
    delay?: number;
  }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 75 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 75 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced CNN model trained on 500+ traditional Kolam patterns"
    },
    {
      icon: Palette,
      title: "Pattern Generation",
      description: "Create beautiful Kolam designs with customizable dot grids"
    },
    {
      icon: Upload,
      title: "Image Recognition",
      description: "Upload and analyze existing Kolam artwork instantly"
    },
    {
      icon: Sparkles,
      title: "Production Ready",
      description: "Professional-grade architecture with scalable deployment capabilities"
    }
  ];

  const stats = [
    { number: "500+", label: "Training Images" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "10+", label: "Pattern Types" },
    { number: "6", label: "Team Members" }
  ];

  return (
    <div ref={containerRef} className="min-h-screen font-serif">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <motion.div 
          className="absolute inset-0 opacity-30 dark:opacity-40"
          style={{ y, opacity }}
        >
          <img 
            src={kolamHero} 
            alt="Traditional Kolam Pattern" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="relative container mx-auto px-4 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-8">
              <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto mb-4 rounded-full" />
              <h2 className="text-xl text-primary-foreground/90 tracking-wide uppercase">Welcome to</h2>
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-glow"
            >
              Kolam Craft
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block text-3xl md:text-4xl font-normal opacity-90 mt-2 animate-float"
              >
                AI-Powered Pattern Creation
              </motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed"
            >
              Discover, analyze, and generate traditional Indian Kolam art patterns using cutting-edge machine learning
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => onPageChange("upload")}
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary text-secondary-foreground shadow-kolam hover:shadow-xl transition-all duration-300 group"
                >
                  <Upload className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Analyze Kolam
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => onPageChange("generate")}
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary text-secondary-foreground shadow-kolam hover:shadow-xl transition-all duration-300 group"
                >
                  <Zap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Generate Pattern
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="text-4xl md:text-5xl font-bold text-primary mb-2 animate-float"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-glow">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combining traditional art with modern AI technology
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                  <Card className="border-2 hover:shadow-kolam transition-all duration-300 group h-full">
                    <CardContent className="p-6 text-center">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="bg-gradient-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-float"
                      >
                        <feature.icon className="h-8 w-8 text-primary" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 animate-float"
              >
                <History className="h-8 w-8 text-primary" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-glow">
                The Art of Kolam
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover the rich heritage of Kolam, a traditional South Indian floor art form practiced for centuries
              </p>
            </AnimatedSection>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <AnimatedSection delay={0.2}>
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-primary animate-glow">A Living Tradition</h3>
                  <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                    <motion.p 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      Kolam is an ancient art form where intricate patterns are drawn using rice flour, 
                      creating beautiful geometric and floral designs that welcome prosperity and ward off evil spirits.
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      Traditionally drawn by women at dawn, these ephemeral artworks represent the cycle of 
                      creation and destruction, connecting communities to their cultural roots through daily practice.
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      Each pattern tells a story, from simple dots and lines to complex mandalas that require 
                      mathematical precision and artistic vision.
                    </motion.p>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.4}>
                <div className="grid grid-cols-2 gap-4">
                  {[sampleKolam1, sampleKolam2, kolamHero, sampleKolam5].map((src, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="aspect-square rounded-lg overflow-hidden shadow-kolam"
                    >
                      <img 
                        src={src} 
                        alt={`Kolam pattern ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Patterns Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <SamplePatternsViewer />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-gradient-accent rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-kolam animate-float"
              >
                <Sparkles className="h-10 w-10 text-primary" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-foreground to-accent bg-clip-text text-transparent animate-glow">
                Experience the Future of Art
              </h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Where traditional Indian artistry meets cutting-edge artificial intelligence in perfect harmony
              </p>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button 
                  onClick={() => onPageChange("upload")}
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 shadow-kolam hover:shadow-lg transition-all group"
                >
                  <Upload className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Start Creating
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};