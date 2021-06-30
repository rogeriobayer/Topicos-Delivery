const Sequelize = require("sequelize");

class Customer extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        companyname: Sequelize.STRING,
        cnpj: Sequelize.BIGINT,
        address: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Delivery, { foreignKey: "customerId" });
    this.belongsTo(models.Associate, { foreignKey: "associateId" });
  }
}

module.exports = Customer;
