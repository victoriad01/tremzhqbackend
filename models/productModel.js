module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.STRING(6),
    },
    desc: {
      type: DataTypes.STRING(250),
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  return Product
}
