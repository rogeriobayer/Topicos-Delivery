"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Motoboys",
      [
        {
          associateId: 1,
          name: "Marcelo",
          cpf: 84067522037,
          phone: 41999998888,
          password: "JJfC0y7pRXTfnhRN2glNreC0siJCWxES9TsvW4s32kRzpjzPMuk92",
        },
        {
          associateId: 1,
          name: "João",
          cpf: 72777647062,
          phone: 41999997777,
          password: "JJfC0y7pRXTfnhRN2glNreC0siJCWxES9TsvW4s32kRzpjzPMuk92",
        },
        {
          associateId: 2,
          name: "Maria",
          cpf: 89045133083,
          phone: 41999996666,
          password: "JJfC0y7pRXTfnhRN2glNreC0siJCWxES9TsvW4s32kRzpjzPMuk92",
        },
        {
          associateId: 2,
          name: "Marcela",
          cpf: 11976360056,
          phone: 41999995555,
          password: "JJfC0y7pRXTfnhRN2glNreC0siJCWxES9TsvW4s32kRzpjzPMuk92",
        },
        {
          associateId: 3,
          name: "Ana Maria",
          cpf: 2241306397,
          phone: 41999994444,
          password: "JJfC0y7pRXTfnhRN2glNreC0siJCWxES9TsvW4s32kRzpjzPMuk92",
        },
        {
          associateId: 4,
          name: "Pedro",
          cpf: 7077245003,
          phone: 41999933844,
          password: "JJfC0y7pRXTfnhRN2glNreC0siJCWxES9TsvW4s32kRzpjzPMuk92",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Motoboys", null, {});
  },
};
