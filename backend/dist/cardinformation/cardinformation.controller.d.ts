import { CardinformationService } from './cardinformation.service';
import { CreateCardinformationDto } from './dto/create-cardinformation.dto';
import { UpdateCardinformationDto } from './dto/update-cardinformation.dto';
export declare class CardinformationController {
    private readonly cardinformationService;
    constructor(cardinformationService: CardinformationService);
    create(createCardinformationDto: CreateCardinformationDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCardinformationDto: UpdateCardinformationDto): string;
    remove(id: string): string;
}
