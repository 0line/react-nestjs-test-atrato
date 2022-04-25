import { CreateCardinformationDto } from './dto/create-cardinformation.dto';
import { UpdateCardinformationDto } from './dto/update-cardinformation.dto';
export declare class CardinformationService {
    create(createCardinformationDto: CreateCardinformationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCardinformationDto: UpdateCardinformationDto): string;
    remove(id: number): string;
}
