"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardinformationController = void 0;
const common_1 = require("@nestjs/common");
const cardinformation_service_1 = require("./cardinformation.service");
const create_cardinformation_dto_1 = require("./dto/create-cardinformation.dto");
const update_cardinformation_dto_1 = require("./dto/update-cardinformation.dto");
let CardinformationController = class CardinformationController {
    constructor(cardinformationService) {
        this.cardinformationService = cardinformationService;
    }
    create(createCardinformationDto) {
        return this.cardinformationService.create(createCardinformationDto);
    }
    findAll() {
        return this.cardinformationService.findAll();
    }
    findOne(id) {
        return this.cardinformationService.findOne(+id);
    }
    update(id, updateCardinformationDto) {
        return this.cardinformationService.update(+id, updateCardinformationDto);
    }
    remove(id) {
        return this.cardinformationService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cardinformation_dto_1.CreateCardinformationDto]),
    __metadata("design:returntype", void 0)
], CardinformationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CardinformationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CardinformationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cardinformation_dto_1.UpdateCardinformationDto]),
    __metadata("design:returntype", void 0)
], CardinformationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CardinformationController.prototype, "remove", null);
CardinformationController = __decorate([
    (0, common_1.Controller)('cardinformation'),
    __metadata("design:paramtypes", [cardinformation_service_1.CardinformationService])
], CardinformationController);
exports.CardinformationController = CardinformationController;
//# sourceMappingURL=cardinformation.controller.js.map