import Link from 'next/link';
import Map from '../components/Map';

export const metadata = {
  title: 'Market Coverage | Trans Emirates Company',
  description: 'Our extensive distribution network covering major regions and cities across Saudi Arabia.',
};

async function getCoverageData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const [regionsRes, citiesRes] = await Promise.all([
      fetch(`${apiUrl}/regions`, { cache: 'no-store' }),
      fetch(`${apiUrl}/cities`, { cache: 'no-store' })
    ]);
    
    if (!regionsRes.ok || !citiesRes.ok) return { regions: [], cities: [] };
    
    const regions = await regionsRes.json();
    const cities = await citiesRes.json();
    return { regions, cities };
  } catch (error) {
    return { regions: [], cities: [] };
  }
}

const CITY_COORDINATES: Record<string, [number, number]> = {
  "Jeddah": [21.5433, 39.1728],
  "Riyadh": [24.7136, 46.6753],
  "Dammam": [26.4207, 50.0888],
  "Makkah": [21.3891, 39.8579],
  "Madinah": [24.5247, 39.5692],
  "Taif": [21.4225, 40.5116],
  "Tabuk": [28.3833, 36.5667],
  "Abha": [18.2164, 42.5053],
  "Khamis Mushait": [18.3000, 42.7333],
  "Jizan": [16.8894, 42.5511],
  "Najran": [17.4917, 44.1322],
  "Hail": [27.5114, 41.7208],
  "Al Jouf": [29.9539, 40.1970],
  "Arar": [30.9753, 41.0381],
  "Buraidah": [26.3260, 43.9750],
  "Yanbu": [24.0232, 38.1900],
  "Al Bahah": [20.0129, 41.4677],
  "Sakaka": [29.9697, 40.2064],
  "Dubal": [27.3517, 35.6901],
  "Rabigh": [22.7986, 39.0349],
  "Bisha": [20.0005, 42.6019]
};

interface RegionDisplay {
  name: string;
  hub: string;
  cities: string[];
  color: string;
  borderColor: string;
}

const MarketCoveragePage = async () => {
  const { regions: dbRegions, cities: dbCities } = await getCoverageData();

  // Fallback data if DB is empty
  const regions: RegionDisplay[] = dbRegions.length > 0 ? dbRegions.map((r: any, index: number) => {
    const regionCities = dbCities.filter((c: any) => c.region_id === r.id);
    return {
      name: r.name,
      hub: regionCities.length > 0 ? regionCities[0].name : "Main Hub",
      cities: regionCities.map((c: any) => c.name),
      color: index % 3 === 0 ? "bg-primary" : index % 3 === 1 ? "bg-secondary" : "bg-accent",
      borderColor: index % 3 === 0 ? '#7E3736' : index % 3 === 1 ? '#C09977' : '#D4AF37'
    };
  }) : [
    {
      name: "Western Region",
      hub: "Jeddah (HQ)",
      cities: ["Jeddah", "Makkah", "Madinah", "Taif", "Yanbu", "Rabigh"],
      color: "bg-primary",
      borderColor: '#7E3736'
    },
    {
      name: "Southern Region",
      hub: "Khamis Mushait",
      cities: ["Abha", "Khamis Mushait", "Jizan", "Najran", "Bisha", "Al Bahah"],
      color: "bg-secondary",
      borderColor: '#C09977'
    },
    {
      name: "Northern Region",
      hub: "Tabuk",
      cities: ["Tabuk", "Sakaka", "Arar", "Al Jouf", "Hail", "Dubal"],
      color: "bg-accent",
      borderColor: '#D4AF37'
    }
  ];

  const mapMarkers = regions.flatMap((r: RegionDisplay) => 
    r.cities.map((city: string) => {
      const cleanCity = city.replace(/ \(HQ\)| \(Branch\)/g, '');
      const coords = CITY_COORDINATES[cleanCity];
      if (!coords) return null;
      return {
        position: coords,
        title: city,
        description: `${r.name} - ${r.hub === city ? 'Regional Hub' : 'Distribution Point'}`
      };
    })
  ).filter(Boolean);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">Market Coverage</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed text-gray-200">
            A robust logistics network reaching every corner of the Kingdom.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative -mt-10 z-20 container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="py-4 md:py-0">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">60%</div>
              <div className="text-gray-500 font-medium uppercase tracking-wide">Geographical Area</div>
            </div>
            <div className="py-4 md:py-0">
              <div className="text-5xl md:text-6xl font-bold text-secondary mb-2">55%</div>
              <div className="text-gray-500 font-medium uppercase tracking-wide">Population Reach</div>
            </div>
            <div className="py-4 md:py-0">
              <div className="text-5xl md:text-6xl font-bold text-accent mb-2">{regions.length}</div>
              <div className="text-gray-500 font-medium uppercase tracking-wide">Regional Hubs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Visualization */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Network Map</h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Strategically located hubs ensuring rapid distribution across the Kingdom.</p>
          </div>
          <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-200 h-[500px] w-full z-0 relative">
            <Map 
              center={[24.0, 42.0]} 
              zoom={5} 
              markers={mapMarkers as any} 
            />
          </div>
        </div>
      </section>

      {/* Map & Regions Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Visual Representation (Map Placeholder) */}
            <div className="w-full lg:w-1/2">
              <div className="sticky top-24">
                <h2 className="text-3xl font-bold text-primary mb-6">Strategic Presence</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our network is designed to ensure efficient distribution to both major urban centers and remote rural areas. With strategically located warehouses and a dedicated fleet, we guarantee timely delivery and product integrity.
                </p>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden h-[400px] flex items-center justify-center bg-blue-50">
                  <div className="text-center opacity-50">
                     <span className="text-9xl">🇸🇦</span>
                     <p className="mt-4 font-bold text-primary">KSA Map Visual</p>
                  </div>
                  {/* Interactive Dots */}
                  <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-primary rounded-full animate-ping"></div>
                  <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg" title="Jeddah"></div>
                  
                  <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-secondary rounded-full animate-ping delay-75"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-secondary rounded-full border-2 border-white shadow-lg" title="Khamis Mushait"></div>

                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent rounded-full animate-ping delay-150"></div>
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent rounded-full border-2 border-white shadow-lg" title="Tabuk"></div>
                </div>
              </div>
            </div>

            {/* Regions List */}
            <div className="w-full lg:w-1/2 space-y-8">
              {regions.map((region, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-l-8" style={{ borderLeftColor: region.borderColor }}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-primary">{region.name}</h3>
                      <p className="text-gray-500 font-medium mt-1">Hub: <span className="text-primary font-bold">{region.hub}</span></p>
                    </div>
                    <div className="text-3xl">📍</div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Key Cities Covered</h4>
                    <ul className="grid grid-cols-2 gap-3">
                      {region.cities.map((city, idx) => (
                        <li key={idx} className="flex items-center text-gray-700 font-medium">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          {city}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Expand Your Reach in Saudi Arabia</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Partner with us to leverage our established distribution channels and market expertise.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-primary font-bold py-4 px-10 rounded-full hover:bg-accent hover:text-white transition-all shadow-lg"
          >
            Become a Partner
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MarketCoveragePage;
