module.exports = (sequelize, DataTypes) => {
  const ProductPart = sequelize.define('productpart', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    partName: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    serviceInterval: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lastServicedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(250),
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  return ProductPart
}
