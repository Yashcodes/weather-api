import { DataTypes, Model } from "sequelize";
import { db } from "../config";
import { ModelNameEnum, ModelToTableNameMap } from "../utilities";

class Weather extends Model {}

Weather.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    minTemperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    maxTemperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    humidity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    weather: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: true,
    modelName: ModelNameEnum.WEATHER,
    tableName: ModelToTableNameMap.Weather,
  },
);

export { Weather };;
