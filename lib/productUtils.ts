
export const getFallbackImage = (name: string) => {
  const lowerName = name.toLowerCase();
  // Rice - Close up of grains/pile
  if (lowerName.includes('rice')) return "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  // Sugar - Crystals close up
  if (lowerName.includes('sugar')) return "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  // Pulses/Lentils - Close up
  if (lowerName.includes('pulse') || lowerName.includes('lentil') || lowerName.includes('dal') || lowerName.includes('daal') || lowerName.includes('bean')) return "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  // Flour/Atta - Sacks/Bag
  if (lowerName.includes('flour') || lowerName.includes('atta') || lowerName.includes('wheat') || lowerName.includes('bak')) return "https://images.unsplash.com/photo-1626075161063-49488e5d0d82?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  // Spices
  if (lowerName.includes('spice') || lowerName.includes('masala') || lowerName.includes('herb')) return "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  // Oil - Industrial/Bulk (Drums/Tanks if possible, otherwise clean oil)
  if (lowerName.includes('oil') || lowerName.includes('ghee')) return "https://images.unsplash.com/photo-1474979266404-7caddbed646e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  // Canned Food Pallets
  if (lowerName.includes('can') || lowerName.includes('preserv')) return "https://images.unsplash.com/photo-1584473457406-6240486418e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  
  return "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"; // Default Warehouse
};

export const getPackingOptions = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('oil')) return "Flexi-tank, 20L Jerry Can, 200L Drum";
  if (lowerName.includes('can')) return "Cartons (24x400g), Pallets";
  return "25kg PP Bags, 50kg Jute Sacks, 1MT Jumbo Bags";
};
