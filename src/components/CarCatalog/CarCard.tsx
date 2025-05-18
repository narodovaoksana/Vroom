import Link from 'next/link';
import { Car } from '../../lib/types';

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img 
          src={car.imageUrl || '/images/car-placeholder.jpg'} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
        />
        {!car.isAvailable && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            Недоступно
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold">
          {car.brand} {car.model} ({car.year})
        </h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-600">{car.transmissionType}, {car.fuelType}</span>
          <span className="font-bold">{car.pricePerHour} ₴/год</span>
        </div>
        
        <Link href={`/cars/${car.id}`}>
          <button 
            className={`mt-4 w-full py-2 rounded ${car.isAvailable 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-300 cursor-not-allowed'}`}
            disabled={!car.isAvailable}
          >
            {car.isAvailable ? 'Детальніше' : 'Недоступно'}
          </button>
        </Link>
      </div>
    </div>
  );
};