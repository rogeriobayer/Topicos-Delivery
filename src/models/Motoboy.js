const Sequelize = require("sequelize");

class Motoboy extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        phone: Sequelize.BIGINT,
        password: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Delivery, { foreignKey: "motoboyId" });
    this.belongsTo(models.Associate, { foreignKey: "associateId" });
  }
}

module.exports = Motoboy;
