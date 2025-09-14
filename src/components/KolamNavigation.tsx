import { Menu, Upload, Zap, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import kolamLogo from "@/assets/kolam-logo.png";

interface KolamNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const KolamNavigation = ({ currentPage, onPageChange }: KolamNavigationProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "upload", label: "Analyze Kolam", icon: Upload },
    { id: "generate", label: "Generate Pattern", icon: Zap },
  ];

  const NavContent = () => (
    <>
      {navItems.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={currentPage === id ? "default" : "ghost"}
          onClick={() => onPageChange(id)}
          className="w-full justify-start gap-2"
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </>
  );

  return (
    <nav className="bg-card border-b shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={kolamLogo} alt="Kolam Craft" className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Kolam Craft
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavContent />
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-3 mb-6">
                    <img src={kolamLogo} alt="Kolam Craft" className="h-6 w-6" />
                    <span className="font-bold">Kolam Craft</span>
                  </div>
                  <NavContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};