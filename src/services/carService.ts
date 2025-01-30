import { Car } from '../models/Car';

interface CarData {
    brand: string;
    model: string;
    engine: string;
    fuel: string;
    doors: number;
    wheels: string;
    dimensions: string;
    imageUrl: string;
    tuning: string;
}

interface CarDocument extends CarData {
    _ownerId: string;
    save: () => Promise<void>;
}

class CarService {
    async getAll() {
        return Car.find({});
    }
    async getById(id: string) {
        return Car.findById(id);
    }
    async create(data: CarData) {
        const car = new Car({
            brand: data.brand,
            model: data.model,
            engine: data.engine,
            fuel: data.fuel,
            doors: data.doors,
            wheels: data.wheels,
            dimensions: data.dimensions,
            imageUrl: data.imageUrl,
            tuning: data.tuning,
        });

        await car.save();

        return car;
    }
    async edit(carId: string, data: CarData): Promise<CarDocument> {
        const car = (await Car.findById(carId)) as CarDocument;

        if (!car) {
            throw new Error(`Record ${carId} does not exist`);
        }

        car.brand = data.brand;
        car.model = data.model;
        car.engine = data.engine;
        car.fuel = data.fuel;
        car.doors = data.doors;
        car.wheels = data.wheels;
        car.dimensions = data.dimensions;
        car.imageUrl = data.imageUrl;
        car.tuning = data.tuning;

        await car.save();

        return car;
    }

    async delete(carId: string, userId: string): Promise<CarDocument> {
        const car = (await Car.findById(carId)) as CarDocument;

        if (car._ownerId !== userId) {
            throw new Error('Access denied');
        }

        await Car.findByIdAndDelete(carId);

        return car;
    }
}

export default new CarService();
