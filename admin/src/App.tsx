import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { DashboardOverview } from "./components/DashboardOverview";
import { MoviesManagement } from "./components/MoviesManagement";
import { GenresManagement } from "./components/GenresManagement";
import { TheatersManagement } from "./components/TheatersManagement";
import { ScreensManagement } from "./components/ScreensManagement";
import { SeatsManagement } from "./components/SeatsManagement";
import { ShowtimesManagement } from "./components/ShowtimesManagement";
import { PricingManagement } from "./components/PricingManagement";
import { NewsManagement } from "./components/NewsManagement";
import { UsersManagement } from "./components/UsersManagement";
import { BookingsManagement } from "./components/BookingsManagement";
import { PaymentsManagement } from "./components/PaymentsManagement";
import { ReportsManagement } from "./components/ReportsManagement";

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "movies":
        return <MoviesManagement />;
      case "genres":
        return <GenresManagement />;
      case "theaters":
        return <TheatersManagement />;
      case "screens":
        return <ScreensManagement />;
      case "seats":
        return <SeatsManagement />;
      case "showtimes":
        return <ShowtimesManagement />;
      case "pricing":
        return <PricingManagement />;
      case "news":
        return <NewsManagement />;
      case "users":
        return <UsersManagement />;
      case "bookings":
        return <BookingsManagement />;
      case "payments":
        return <PaymentsManagement />;
      case "reports":
        return <ReportsManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{renderContent()}</div>
      </main>
    </div>
  );
}
