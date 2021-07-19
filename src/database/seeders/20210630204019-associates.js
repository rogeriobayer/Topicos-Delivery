"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Associates",
      [
        {
          companyname: "SIS Sistemas",
          cnpj: 14622590000107,
          address: "Rua Yasmin, 3363",
          password: "JJfC0y7pRXTfnhRN2glNreC0siJCWxES9TsvW4s32kRzpjzPMuk92",
        },
        {
          companyname: "Farmácias FAR",
          cnpj: 44640940000110,
          address: "Rua Jose, 3633",
          password: "JJfC0y7pRXTfnhRN2glNreC0siJCWxES9TsvW4s32kRzpjzPMuk92",
        },
        {
          companyname: "Inter Internet",
          cnpj: 17033919000184,
          address: "Rua Italia, 3336",
          password: "JJfC0y7pRXTfnhRN2glNreC0siJCWxES9TsvW4s32kRzpjzPMuk92",
        },
        {
          companyname: "Restaurante TAUR",
          cnpj: 13554896000100,
          address: "Rua Querencia, 663",
          password: "JJfC0y7pRXTfnhRN2glNreC0siJCWxES9TsvW4s32kRzpjzPMuk92",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Associates", null, {});
  },
};
