'use client';

import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/api';
import { Trash2, Plus, MapPin } from 'lucide-react';

interface Region {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  region_id: number;
}

export default function CoverageManager() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [newRegionName, setNewRegionName] = useState('');
  const [newCityName, setNewCityName] = useState('');
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [regionsData, citiesData] = await Promise.all([
        fetcher('/regions'),
        fetcher('/cities')
      ]);
      setRegions(regionsData);
      setCities(citiesData);
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRegion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRegionName.trim()) return;
    try {
      const newRegion = await fetcher('/regions', {
        method: 'POST',
        body: JSON.stringify({ name: newRegionName })
      });
      setRegions([...regions, newRegion]);
      setNewRegionName('');
    } catch (error) {
      alert('Failed to add region');
    }
  };

  const handleDeleteRegion = async (id: number) => {
    if (!confirm('Delete this region? All associated cities will be lost (or orphaned).')) return;
    try {
      await fetcher(`/regions/${id}`, { method: 'DELETE' });
      setRegions(regions.filter(r => r.id !== id));
      setCities(cities.filter(c => c.region_id !== id));
    } catch (error) {
      alert('Failed to delete region');
    }
  };

  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim() || !selectedRegionId) return;
    try {
      const newCity = await fetcher('/cities', {
        method: 'POST',
        body: JSON.stringify({ name: newCityName, region_id: selectedRegionId })
      });
      setCities([...cities, newCity]);
      setNewCityName('');
    } catch (error) {
      alert('Failed to add city');
    }
  };

  const handleDeleteCity = async (id: number) => {
    if (!confirm('Delete this city?')) return;
    try {
      await fetcher(`/cities/${id}`, { method: 'DELETE' });
      setCities(cities.filter(c => c.id !== id));
    } catch (error) {
      alert('Failed to delete city');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Market Coverage Manager</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Regions Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="text-primary" /> Regions
            </h2>
            
            <form onSubmit={handleAddRegion} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Region Name"
                value={newRegionName}
                onChange={e => setNewRegionName(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <button 
                type="submit"
                className="bg-primary text-white p-2 rounded-lg hover:bg-primary-light"
              >
                <Plus size={20} />
              </button>
            </form>

            <div className="space-y-2">
              {regions.map(region => (
                <div 
                  key={region.id}
                  onClick={() => setSelectedRegionId(region.id)}
                  className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedRegionId === region.id 
                      ? 'bg-primary/10 border-primary border' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-medium">{region.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRegion(region.id);
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {regions.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No regions added.</p>}
            </div>
          </div>
        </div>

        {/* Cities Column */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              Cities {selectedRegionId && regions.find(r => r.id === selectedRegionId) && `in ${regions.find(r => r.id === selectedRegionId)?.name}`}
            </h2>

            {!selectedRegionId ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <MapPin size={48} className="mb-4 opacity-20" />
                <p>Select a region to manage cities</p>
              </div>
            ) : (
              <>
                <form onSubmit={handleAddCity} className="flex gap-2 mb-6 max-w-md">
                  <input
                    type="text"
                    placeholder="City Name"
                    value={newCityName}
                    onChange={e => setNewCityName(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <button 
                    type="submit"
                    className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-light flex items-center gap-2"
                  >
                    <Plus size={18} /> Add City
                  </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cities
                    .filter(c => c.region_id === selectedRegionId)
                    .map(city => (
                      <div key={city.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg group">
                        <span>{city.name}</span>
                        <button
                          onClick={() => handleDeleteCity(city.id)}
                          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                </div>
                {cities.filter(c => c.region_id === selectedRegionId).length === 0 && (
                  <p className="text-gray-500 text-sm py-4">No cities added to this region yet.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
