import { useState, useEffect } from 'react';
import { carApi } from '../../lib/api';
import { Car, CarFilters } from '../../lib/types';
import { CarCard } from '../../components/CarCatalog/CarCard';
import { CarFilters } from '../../components/CarCatalog/CarFilters';

export default function CarCatalog() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const response = await carApi.getAll();
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (err) {
        setError('Не вдалося завантажити автомобілі');
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  const handleFilter = (filters: CarFilters) => {
    const filtered = cars.filter(car => {
      return (
        (!filters.brand || car.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
        (!filters.minPrice || car.pricePerHour >= filters.minPrice) &&
        (!filters.maxPrice || car.pricePerHour <= filters.maxPrice) &&
        (!filters.transmission || car.transmissionType === filters.transmission) &&
        (!filters.fuelType || car.fuelType === filters.fuelType)
      );
    });
    setFilteredCars(filtered);
  };

  if (loading) return <div className="text-center py-12">Завантаження...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Каталог автомобілів</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <CarFilters onFilter={handleFilter} />
        </div>
        
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          
          {filteredCars.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Автомобілів за вашими критеріями не знайдено
            </div>
          )}
        </div>
      </div>
    </div>
  );
}