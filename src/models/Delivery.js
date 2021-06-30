const Sequelize = require("sequelize");

class Delivery extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.STRING,
        price: Sequelize.FLOAT,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Customer, { foreignKey: "customerId" });
    this.belongsTo(models.Motoboy, { foreignKey: "motoboyId" });
    this.belongsTo(models.Associate, { foreignKey: "associateId" });
  }
}

module.exports = Delivery;
