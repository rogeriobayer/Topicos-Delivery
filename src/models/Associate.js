const Sequelize = require("sequelize");

class Associate extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        companyname: Sequelize.STRING,
        cnpj: Sequelize.BIGINT,
        address: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Delivery, { foreignKey: "associateId" });
    this.hasMany(models.Motoboy, { foreignKey: "associateId" });
    this.hasMany(models.Customer, { foreignKey: "associateId" });
  }
}

module.exports = Associate;
