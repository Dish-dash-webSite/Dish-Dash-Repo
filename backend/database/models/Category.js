// models/Category.js
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // cuisineType: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });
  
  // Search by category name and cuisineType
  Category.searchByNameAndCuisineType = async function (name, cuisineType) {
    return await this.findAll({
      where: {
        name: {
          [sequelize.Op.like]: `%${name}%`
        },
        cuisineType: {
          [sequelize.Op.like]: `%${cuisineType}%`
        }
      }
    });
  };

  return Category;
};