import { Menu, Upload, Zap, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import kolamLogo from "@/assets/kolam-logo.png";

interface KolamNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "upload", label: "Analyze Kolam", icon: Upload },
  { id: "generate", label: "Generate Pattern", icon: Zap },
] as const;

type NavItemType = typeof navItems[number]["id"];

interface NavButtonProps {
  id: NavItemType;
  label: string;
  icon: typeof Home;
  isActive: boolean;
  onClick: () => void;
}

const NavButton = ({ id, label, icon: Icon, isActive, onClick }: NavButtonProps) => (
  <Button
    key={id}
    variant={isActive ? "default" : "ghost"}
    onClick={onClick}
    className={`relative justify-start gap-3 rounded-full px-4 group transition-all duration-300 ${
      isActive 
        ? 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-sm' 
        : 'hover:bg-secondary/10'
    }`}
  >
    <Icon className={`h-4 w-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
    <span className="font-medium">{label}</span>
    {isActive && (
      <span className="absolute inset-0 bg-white/10 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    )}
  </Button>
);

export const KolamNavigation = ({ currentPage, onPageChange }: KolamNavigationProps) => {
  const NavContent = () => (
    <>
      {navItems.map(({ id, label, icon }) => (
        <NavButton
          key={id}
          id={id}
          label={label}
          icon={icon}
          isActive={currentPage === id}
          onClick={() => onPageChange(id)}
        />
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-secondary/20 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <div className="p-1.5 bg-gradient-to-br from-secondary to-accent rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img 
                src={kolamLogo} 
                alt="Kolam Craft" 
                className="h-7 w-7 md:h-8 md:w-8 transition-transform duration-300 group-hover:rotate-[360deg]" 
              />
            </div>
            <span className="text-xl md:text-2xl font-medium bg-gradient-primary bg-clip-text text-transparent">
              Kolam Craft
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 bg-background/80 p-1.5 rounded-full border border-border/50 shadow-sm backdrop-blur-sm">
              <NavContent />
            </div>
            <div className="w-px h-8 bg-border/50" />
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="rounded-full border-secondary/20 hover:bg-secondary/10"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-72 bg-background/95 backdrop-blur-lg border-l border-secondary/20"
              >
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-3 px-2">
                    <div className="p-1 bg-gradient-to-br from-secondary to-accent rounded-lg">
                      <img src={kolamLogo} alt="Kolam Craft" className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-medium">Kolam Craft</span>
                  </div>
                  <div className="flex flex-col gap-2 px-2">
                    <NavContent />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};