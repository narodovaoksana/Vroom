export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  transmissionType: string;
  fuelType: string;
  pricePerHour: number;
  imageUrl: string;
  isAvailable: boolean;
}

export interface CarFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  transmission?: string;
  fuelType?: string;
}