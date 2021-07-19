"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Deliveries",
      [
        {
          associateId: 4,
          motoboyId: 6,
          customerId: 6,
          status: "Em Aberto",
          price: 12.0,
          description: "Desodorante Old Spice",
        },
        {
          associateId: 1,
          motoboyId: 1,
          customerId: 2,
          status: "Entregue",
          price: 2.0,
          description: "Bala Fini",
        },
        {
          associateId: 2,
          motoboyId: 4,
          customerId: 3,
          status: "Em Aberto",
          price: 4.95,
          description: "Sorvete de Limão",
        },
        {
          associateId: 2,
          motoboyId: 3,
          customerId: 4,
          status: "Entregue",
          price: 27.95,
          description: "Combo Whooper + Batata",
        },
        {
          associateId: 3,
          motoboyId: 2,
          customerId: 1,
          status: "Em Aberto",
          price: 240.95,
          description: "Aquecedor Eletrico",
        },
        {
          associateId: 4,
          motoboyId: 1,
          customerId: 2,
          status: "Em Aberto",
          price: 24.95,
          description: "Salada de Rúcula com Tomate",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Deliveries", null, {});
  },
};
