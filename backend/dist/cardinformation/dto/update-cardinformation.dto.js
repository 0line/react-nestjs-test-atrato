"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCardinformationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cardinformation_dto_1 = require("./create-cardinformation.dto");
class UpdateCardinformationDto extends (0, mapped_types_1.PartialType)(create_cardinformation_dto_1.CreateCardinformationDto) {
}
exports.UpdateCardinformationDto = UpdateCardinformationDto;
//# sourceMappingURL=update-cardinformation.dto.js.map