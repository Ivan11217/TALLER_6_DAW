'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('fotoetiquetas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      foto_id: {
        type: Sequelize.INTEGER,
        allowNull: true // Permitir valores NULL
      },
      etiqueta_id: {
        type: Sequelize.INTEGER,
        allowNull: true // Permitir valores NULL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('fotoetiquetas');
  }
};


