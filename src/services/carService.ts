import { Types } from 'mongoose';
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
    description: string;
}

interface CarDocument extends CarData {
    _ownerId: string;
    save: () => Promise<void>;
}

class CarService {
    async getAll() {
        return Car.find({}).sort({ _id: -1 }).lean();
    }
    async getById(id: string) {
        return Car.findById(id).lean() as unknown as CarDocument;
    }
    async getLatestOne() {
        return Car.find({}).sort({ _id: -1 }).limit(1).lean();
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
            description: data.description,
        });

        await car.save();

        return car;
    }
    async edit(carId: string, data: CarData, userId: Types.ObjectId): Promise<CarDocument> {
        const car = (await Car.findById(carId)) as CarDocument;

        if (!car) {
            throw new Error(`Record ${carId} does not exist`);
        }

        if (car._ownerId.toString() !== userId.toString()) {
            throw new Error('Access denied');
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
        car.description = data.description;

        await car.save();

        return car;
    }

    async delete(carId: string, userId: Types.ObjectId): Promise<CarDocument> {
        const car = (await Car.findById(carId)) as CarDocument;

        if (!car) {
            throw new Error(`Record ${carId} not found`);
        }

        if (car._ownerId.toString() !== userId.toString()) {
            throw new Error('Access denied');
        }

        await Car.findByIdAndDelete(carId);

        return car;
    }
}

export default new CarService();
