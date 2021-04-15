'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.belongsTo(Post, {
        foreignKey: 'postId',
        as: 'post'
      })
    }
  };
  Vote.init({
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usersLiked: DataTypes.JSON,
    usersDisliked: DataTypes.JSON
  }, {
    sequelize,
    tableName: 'votes',
    modelName: 'Vote',
  });
  return Vote;
};