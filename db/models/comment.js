'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.sighting, { as: "observation" });
    }
  }
  comment.init({
    content: DataTypes.STRING,
    sighting_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "sightings",
        key: "id",
      },
    },
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};