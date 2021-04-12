'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'userId',
        as: 'author'
      });
      this.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
    }

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined }
    }
  };
  Post.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    body: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    hasBeenReported: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};