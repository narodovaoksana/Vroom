import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { carApi } from '../../lib/api';
import { Car } from '../../lib/types';

export default function CarDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCar = async () => {
      try {
        if (!id) return;
        const response = await carApi.getById(Number(id));
        setCar(response.data);
      } catch (error) {
        console.error('Failed to load car:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCar();
  }, [id]);

  if (loading) return <div>Завантаження...</div>;
  if (!car) return <div>Автомобіль не знайдено</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img 
            src={car.imageUrl || '/images/car-placeholder.jpg'} 
            alt={`${car.brand} ${car.model}`}
            className="w-full rounded-lg"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold">
            {car.brand} {car.model} ({car.year})
          </h1>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <span className="font-semibold w-32">Держ. номер:</span>
              <span>{car.licensePlate}</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-semibold w-32">Коробка:</span>
              <span>{car.transmissionType}</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-semibold w-32">Паливо:</span>
              <span>{car.fuelType}</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-semibold w-32">Ціна:</span>
              <span className="text-xl font-bold">{car.pricePerHour} ₴/год</span>
            </div>
            
            <div className="pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg w-full">
                Забронювати
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}