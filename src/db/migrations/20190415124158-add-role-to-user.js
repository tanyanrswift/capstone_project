'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users', 
      'role', 
      {
        type: Sequelize.STRING,
        defaultValue: 'student'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'role');
  }
};
