'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'johndoe@ex.com',
      phone: '01711091062',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      name: 'Steve Almas',
      email: 'stevealmas@bee.com',
      phone: '01779898372',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      name: 'Angel Moni',
      email: 'angel@cee.com',
      phone: '01889675742',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }
    ], {})

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
