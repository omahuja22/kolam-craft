import { useState } from "react";
import { KolamNavigation } from "@/components/KolamNavigation";
import { HomePage } from "@/components/HomePage";
import { UploadPage } from "@/components/UploadPage";
import { GeneratePage } from "@/components/GeneratePage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "upload":
        return <UploadPage />;
      case "generate":
        return <GeneratePage />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <KolamNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default Index;
