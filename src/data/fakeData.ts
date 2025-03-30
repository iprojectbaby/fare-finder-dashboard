
export interface FareData {
  id: string;
  company: string;
  route: {
    from: string;
    to: string;
  };
  price: number;
  discount?: number;
  duration: string;
  departureTime: string;
  transportType: 'bus' | 'train' | 'ferry' | 'flight';
  logo: string;
  rating: number;
  amenities: string[];
}

export const popularDestinations = [
  { name: "New York", code: "NYC" },
  { name: "Los Angeles", code: "LAX" },
  { name: "Chicago", code: "CHI" },
  { name: "Miami", code: "MIA" },
  { name: "San Francisco", code: "SFO" },
  { name: "Boston", code: "BOS" },
  { name: "Dallas", code: "DAL" },
  { name: "Seattle", code: "SEA" }
];

export const transportCompanies = [
  { name: "Blue Transit", id: "blue-transit" },
  { name: "Express Lines", id: "express-lines" },
  { name: "Metro Connect", id: "metro-connect" },
  { name: "Coastal Ferries", id: "coastal-ferries" },
  { name: "Sky Routes", id: "sky-routes" },
  { name: "City Rail", id: "city-rail" }
];

export const fakeHistoricalPrices = {
  "NYC-LAX": [42, 45, 48, 43, 41, 44, 49],
  "MIA-NYC": [38, 35, 39, 42, 40, 38, 37],
  "CHI-BOS": [29, 31, 28, 30, 33, 35, 32],
  "LAX-SFO": [25, 28, 26, 24, 25, 27, 29]
};

export const transportFares: FareData[] = [
  {
    id: "1",
    company: "Blue Transit",
    route: {
      from: "New York",
      to: "Boston"
    },
    price: 45.99,
    duration: "4h 15m",
    departureTime: "08:30 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.2,
    amenities: ["WiFi", "Power Outlets", "Restroom"]
  },
  {
    id: "2",
    company: "Express Lines",
    route: {
      from: "New York",
      to: "Boston"
    },
    price: 42.50,
    discount: 10,
    duration: "4h 30m",
    departureTime: "09:15 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.0,
    amenities: ["WiFi", "Power Outlets", "Snacks", "Restroom"]
  },
  {
    id: "3",
    company: "Metro Connect",
    route: {
      from: "New York",
      to: "Boston"
    },
    price: 52.75,
    duration: "3h 45m",
    departureTime: "10:00 AM",
    transportType: "train",
    logo: "https://via.placeholder.com/50",
    rating: 4.5,
    amenities: ["WiFi", "Cafe Car", "Extra Legroom"]
  },
  {
    id: "4",
    company: "City Rail",
    route: {
      from: "New York",
      to: "Boston"
    },
    price: 48.25,
    duration: "3h 50m",
    departureTime: "11:30 AM",
    transportType: "train",
    logo: "https://via.placeholder.com/50",
    rating: 4.3,
    amenities: ["WiFi", "Power Outlets", "Quiet Car"]
  },
  {
    id: "5",
    company: "Coastal Ferries",
    route: {
      from: "Miami",
      to: "Key West"
    },
    price: 65.00,
    duration: "3h 30m",
    departureTime: "09:00 AM",
    transportType: "ferry",
    logo: "https://via.placeholder.com/50",
    rating: 4.7,
    amenities: ["Open Deck", "Cafe", "Scenic Views"]
  },
  {
    id: "6",
    company: "Sky Routes",
    route: {
      from: "Los Angeles",
      to: "San Francisco"
    },
    price: 119.99,
    discount: 15,
    duration: "1h 30m",
    departureTime: "07:45 AM",
    transportType: "flight",
    logo: "https://via.placeholder.com/50",
    rating: 4.1,
    amenities: ["In-flight Entertainment", "Meal Service", "Extra Baggage"]
  },
  {
    id: "7",
    company: "Blue Transit",
    route: {
      from: "Chicago",
      to: "Detroit"
    },
    price: 38.50,
    duration: "5h 15m",
    departureTime: "08:00 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 3.9,
    amenities: ["WiFi", "Power Outlets", "Restroom"]
  },
  {
    id: "8",
    company: "Express Lines",
    route: {
      from: "Seattle",
      to: "Portland"
    },
    price: 35.75,
    duration: "3h 00m",
    departureTime: "10:30 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.4,
    amenities: ["WiFi", "Power Outlets", "Restroom", "Extra Legroom"]
  }
];
