import LandingNavbar from "./LandingNavbar";
import Hero from "./Hero";
import ScrollStory from "./ScrollStory";
import CodeEditorDemo from "./CodeEditorDemo";
import TrustBar from "./TrustBar";
import PlatformPreview from "./PlatformPreview";
import VideoSection from "./VideoSection";
import LandingCourses from "./LandingCourses";
import LiveCourses from "./LiveCourses";
import Educators from "./Educators";
import WhyKeplerCodes from "./WhyKeplerCodes";
import Projects from "./Projects";
import Stats from "./Stats";
import Testimonials from "./Testimonials";
import FreeContent from "./FreeContent";
import Community from "./Community";
import Certifications from "./Certifications";
import Pricing from "./Pricing";
import Comparison from "./Comparison";
import FAQ from "./FAQ";
import AIMentor from "./AIMentor";
import FinalCTA from "./FinalCTA";
import LandingFooter from "./LandingFooter";
import { GridBackground } from "./GridBackground";
import SpotlightCursor from "./SpotlightCursor";
import FloatingSymbols from "./FloatingSymbols";
import TerminalBootLoader from "./TerminalBootLoader";
import SpotlightHoverCards from "./SpotlightHoverCards";
import GitBranchTimeline from "./GitBranchTimeline";
import InteractiveCodeEditor from "./InteractiveCodeEditor";

export default function LandingPage() {
  return (
    <>
      <TerminalBootLoader />
      <GridBackground />
      <FloatingSymbols />
      <SpotlightCursor />
      <div className="relative z-10">
        <LandingNavbar />
        <Hero />
        <TrustBar />
        <ScrollStory />
        <CodeEditorDemo />
        <PlatformPreview />
        <VideoSection />
        <LandingCourses />
        <SpotlightHoverCards />
        <LiveCourses />
        <Educators />
        <WhyKeplerCodes />
        <GitBranchTimeline />
        <Projects />
        <Stats />
        <Testimonials />
        <FreeContent />
        <InteractiveCodeEditor />
        <Community />
        <Certifications />
        <Pricing />
        <Comparison />
        <FAQ />
        <AIMentor />
        <FinalCTA />
        <LandingFooter />
      </div>
    </>
  );
}
