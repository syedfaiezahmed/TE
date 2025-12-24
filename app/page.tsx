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
    const res = await fetch(`${apiUrl}/content`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch content');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching content:", error);
    return {};
  }
}

// Function to fetch products
async function getProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const res = await fetch(`${apiUrl}/products?limit=8`, { cache: 'no-store' });
    if (!res.ok) {
      // If endpoint doesn't support limit, it might return all. We handle slicing in UI if needed.
      // But let's assume it returns a list.
      throw new Error('Failed to fetch products');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Function to fetch categories
async function getCategories() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const res = await fetch(`${apiUrl}/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
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
      <TrustedPartners />
      <WhoWeAre content={content} />
      <OurStrength />
      <IndustriesServed />
      <KeyProducts products={products} categories={categories} />
      <LeadershipMessage />
    </div>
  );
}
