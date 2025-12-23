import Hero from "./components/Hero";
import TrustedPartners from "./components/TrustedPartners";
import WhoWeAre from "./components/WhoWeAre";
import OurStrength from "./components/OurStrength";
import IndustriesServed from "./components/IndustriesServed";
import KeyProducts from "./components/KeyProducts";
import LeadershipMessage from "./components/LeadershipMessage";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <TrustedPartners />
      <WhoWeAre />
      <OurStrength />
      <IndustriesServed />
      <KeyProducts />
      <LeadershipMessage />
    </div>
  );
}
