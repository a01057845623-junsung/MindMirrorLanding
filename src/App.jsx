import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import TeamRoleSection from './components/TeamRoleSection.jsx';
import ProblemSection from './components/ProblemSection.jsx';
import MechanismSection from './components/MechanismSection.jsx';
import DemoShowcaseSection from './components/DemoShowcaseSection.jsx';
import VisualClosingSection from './components/VisualClosingSection.jsx';
import SlideDeckController from './components/SlideDeckController.jsx';

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Billdr 스타일 구조적 세로 가이드 라인 (container-large 양 끝) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden xl:block">
        <div className="mx-auto h-full max-w-container border-x border-line" />
      </div>

      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <TeamRoleSection />
        <ProblemSection />
        <MechanismSection />
        <DemoShowcaseSection />
        <VisualClosingSection />
      </main>
      <SlideDeckController />
    </div>
  );
}
