const Sequelize = require("sequelize");

class Customer extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        companyname: Sequelize.STRING,
        cnpj: Sequelize.INTEGER,
        address: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Delivery, { foreignKey: "customerId" });
  }
}

module.exports = Customer;
