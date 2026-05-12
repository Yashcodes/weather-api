import { Model, ModelStatic } from "sequelize";

export class BaseService<T extends Model> {
    protected model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }
}