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
  verified?: boolean;
  featured?: boolean;
}

export interface Review {
  id: string;
  fareId: string;
  companyId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Booking {
  id: string;
  fareId: string;
  userId: string;
  userName: string;
  userEmail?: string;
  userPhone?: string;
  seats: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  bookingDate: string;
  travelDate: string;
}

export interface PromotionRequest {
  id: string;
  companyId: string;
  companyName: string;
  requestDate: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  type: 'featured' | 'discount' | 'banner';
}

export const popularDestinations = [
  { name: "Enugu", code: "ENU" },
  { name: "Nsukka", code: "NSK" },
  { name: "Awgu", code: "AWG" },
  { name: "Udi", code: "UDI" },
  { name: "Oji River", code: "OJR" },
  { name: "Ezeagu", code: "EZA" },
  { name: "Nkanu", code: "NKA" },
  { name: "Abakaliki", code: "ABK" },
  { name: "Onitsha", code: "ONI" },
  { name: "Owerri", code: "OWE" }
];

export const transportCompanies = [
  { name: "Peace Mass Transit", id: "peace-mass", verified: true },
  { name: "GUO Transport", id: "guo-transport", verified: true },
  { name: "ABC Transport", id: "abc-transport", verified: false },
  { name: "God is Good Motors", id: "gigm", verified: true },
  { name: "Enugu City Transport", id: "enugu-city", verified: false },
  { name: "Ifesinachi Transport", id: "ifesinachi", verified: false }
];

export const fakeHistoricalPrices = {
  "ENU-NSK": [1200, 1300, 1400, 1250, 1350, 1450, 1500],
  "ENU-OWE": [2500, 2400, 2600, 2700, 2550, 2450, 2600],
  "ENU-ONI": [1800, 1900, 1750, 1850, 2000, 1950, 1900],
  "ENU-ABK": [1000, 1100, 1050, 1150, 1200, 1100, 1150]
};

export const transportFares: FareData[] = [
  {
    id: "1",
    company: "Peace Mass Transit",
    route: {
      from: "Enugu",
      to: "Nsukka"
    },
    price: 1500,
    duration: "1h 30m",
    departureTime: "08:30 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.2,
    amenities: ["Air Conditioning", "Comfortable Seats", "Storage Space"],
    verified: true,
    featured: true
  },
  {
    id: "2",
    company: "GUO Transport",
    route: {
      from: "Enugu",
      to: "Nsukka"
    },
    price: 1300,
    discount: 10,
    duration: "1h 45m",
    departureTime: "09:15 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.0,
    amenities: ["Air Conditioning", "Comfortable Seats", "Free Water", "Storage Space"],
    verified: true
  },
  {
    id: "3",
    company: "ABC Transport",
    route: {
      from: "Enugu",
      to: "Owerri"
    },
    price: 2600,
    duration: "2h 45m",
    departureTime: "10:00 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.5,
    amenities: ["Air Conditioning", "Refreshments", "Extra Legroom"]
  },
  {
    id: "4",
    company: "God is Good Motors",
    route: {
      from: "Enugu",
      to: "Onitsha"
    },
    price: 1900,
    duration: "2h 00m",
    departureTime: "11:30 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.3,
    amenities: ["Air Conditioning", "Comfortable Seats", "Power Outlets"]
  },
  {
    id: "5",
    company: "Enugu City Transport",
    route: {
      from: "Enugu",
      to: "Awgu"
    },
    price: 800,
    duration: "1h 10m",
    departureTime: "09:00 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 3.7,
    amenities: ["Basic Seating", "Storage Space"]
  },
  {
    id: "6",
    company: "Ifesinachi Transport",
    route: {
      from: "Enugu",
      to: "Abakaliki"
    },
    price: 1150,
    discount: 15,
    duration: "1h 30m",
    departureTime: "07:45 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.1,
    amenities: ["Air Conditioning", "Refreshments", "Extra Baggage"]
  },
  {
    id: "7",
    company: "Peace Mass Transit",
    route: {
      from: "Enugu",
      to: "Udi"
    },
    price: 600,
    duration: "45m",
    departureTime: "08:00 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 3.9,
    amenities: ["Basic Seating", "Storage Space"]
  },
  {
    id: "8",
    company: "GUO Transport",
    route: {
      from: "Enugu",
      to: "Oji River"
    },
    price: 750,
    duration: "1h 00m",
    departureTime: "10:30 AM",
    transportType: "bus",
    logo: "https://via.placeholder.com/50",
    rating: 4.4,
    amenities: ["Air Conditioning", "Comfortable Seats", "Storage Space"]
  }
];

export const fakeReviews: Review[] = [
  {
    id: "1",
    fareId: "1",
    companyId: "peace-mass",
    userId: "user1",
    userName: "John Doe",
    rating: 4,
    comment: "Very comfortable journey, the driver was professional and punctual.",
    date: "2023-11-15",
    status: "approved"
  },
  {
    id: "2",
    fareId: "1",
    companyId: "peace-mass",
    userId: "user2",
    userName: "Mary Johnson",
    rating: 5,
    comment: "Excellent service, very clean bus and on-time departure.",
    date: "2023-11-10",
    status: "approved"
  },
  {
    id: "3",
    fareId: "2",
    companyId: "guo-transport",
    userId: "user3",
    userName: "David Williams",
    rating: 3,
    comment: "Average experience, bus was slightly delayed but comfortable ride.",
    date: "2023-11-05",
    status: "approved"
  },
  {
    id: "4",
    fareId: "3",
    companyId: "abc-transport",
    userId: "user4",
    userName: "Sarah Brown",
    rating: 4,
    comment: "Good service, would use again.",
    date: "2023-11-01",
    status: "approved"
  },
  {
    id: "5",
    fareId: "4",
    companyId: "gigm",
    userId: "user5",
    userName: "Michael Smith",
    rating: 2,
    comment: "Bus was late and air conditioning wasn't working properly.",
    date: "2023-10-28",
    status: "pending"
  }
];

export const fakeBookings: Booking[] = [
  {
    id: "1",
    fareId: "1",
    userId: "user1",
    userName: "John Doe",
    userPhone: "08012345678",
    seats: 1,
    status: "confirmed",
    bookingDate: "2023-11-12",
    travelDate: "2023-11-20"
  },
  {
    id: "2",
    fareId: "2",
    userId: "user2",
    userName: "Mary Johnson",
    userEmail: "mary@example.com",
    seats: 2,
    status: "pending",
    bookingDate: "2023-11-15",
    travelDate: "2023-11-22"
  },
  {
    id: "3",
    fareId: "3",
    userId: "user3",
    userName: "David Williams",
    userPhone: "08087654321",
    seats: 1,
    status: "completed",
    bookingDate: "2023-10-25",
    travelDate: "2023-11-01"
  }
];

export const fakePromotionRequests: PromotionRequest[] = [
  {
    id: "1",
    companyId: "peace-mass",
    companyName: "Peace Mass Transit",
    requestDate: "2023-11-10",
    startDate: "2023-11-15",
    endDate: "2023-12-15",
    status: "approved",
    type: "featured"
  },
  {
    id: "2",
    companyId: "guo-transport",
    companyName: "GUO Transport",
    requestDate: "2023-11-12",
    startDate: "2023-11-20",
    endDate: "2023-12-20",
    status: "pending",
    type: "featured"
  },
  {
    id: "3",
    companyId: "abc-transport",
    companyName: "ABC Transport",
    requestDate: "2023-11-05",
    startDate: "2023-11-25",
    endDate: "2023-12-25",
    status: "pending",
    type: "discount"
  }
];
