import Hero from "./components/Hero";
import TrustedPartners from "./components/TrustedPartners";
import WhoWeAre from "./components/WhoWeAre";
import OurStrength from "./components/OurStrength";
import IndustriesServed from "./components/IndustriesServed";
import KeyProducts from "./components/KeyProducts";
import LeadershipMessage from "./components/LeadershipMessage";

// Function to fetch content from the backend
async function getContent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    // Check if backend is reachable before fetching
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000); // 1s timeout
    const res = await fetch(`${apiUrl}/content`, { 
      cache: 'no-store',
      signal: controller.signal
    }).catch(() => null);
    
    clearTimeout(timeoutId);

    if (!res || !res.ok) {
      throw new Error('Failed to fetch content');
    }
    return res.json();
  } catch (error) {
    console.log("Using fallback content (backend unreachable)");
    return {};
  }
}

// Function to fetch products
async function getProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);
    const res = await fetch(`${apiUrl}/products?limit=8`, { 
      cache: 'no-store',
      signal: controller.signal 
    }).catch(() => null);
    
    clearTimeout(timeoutId);

    if (!res || !res.ok) {
      throw new Error('Failed to fetch products');
    }
    return res.json();
  } catch (error) {
    console.log("Using fallback products (backend unreachable)");
    return [];
  }
}

// Function to fetch categories
async function getCategories() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);
    const res = await fetch(`${apiUrl}/categories`, { 
      cache: 'no-store',
      signal: controller.signal
    }).catch(() => null);

    clearTimeout(timeoutId);

    if (!res || !res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  } catch (error) {
    console.log("Using fallback categories (backend unreachable)");
    return [];
  }
}

export default async function Home() {
  const [content, products, categories] = await Promise.all([
    getContent(),
    getProducts(),
    getCategories()
  ]);

  return (
    <div className="min-h-screen">
      <Hero content={content} />
      <WhoWeAre content={content} />
      <KeyProducts products={products} categories={categories} />
      <OurStrength content={content} />
      <IndustriesServed />
      <TrustedPartners />
      <LeadershipMessage content={content} />
    </div>
  );
}
