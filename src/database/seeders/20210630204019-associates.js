"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Associates",
      [
        {
          companyname: "SIS Sistemas",
          cnpj: 85168962070107,
          address: "Rua Yasmin, 3363",
          password: "JJfC0y7pRXTfnhRN2glNreC0siJCWxES9TsvW4s32kRzpjzPMuk92",
        },
        {
          companyname: "Farmácias FAR",
          cnpj: 76341824000197,
          address: "Rua Jose, 3633",
          password: "JJfC0y7pRXTfnhRN2glNreC0siJCWxES9TsvW4s32kRzpjzPMuk92",
        },
        {
          companyname: "Inter Internet",
          cnpj: 19103805000124,
          address: "Rua Italia, 3336",
          password: "JJfC0y7pRXTfnhRN2glNreC0siJCWxES9TsvW4s32kRzpjzPMuk92",
        },
        {
          companyname: "Restaurante TAUR",
          cnpj: 19103815000124,
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
