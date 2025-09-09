"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bcrypt = require("bcryptjs");
    const { v4: uuidv4 } = require("uuid");
    const now = new Date();

    const hashedPassword = await bcrypt.hash("admin123", 12);
    const adminUserId = uuidv4();

    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: adminUserId,
          name: "Administrator",
          email: "admin@expressapp.com",
          password: hashedPassword,
          email_verified_at: now, // Admin langsung terverifikasi
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );

    /**
     * ambil role Admin dari tabel roles*
     */
    const [adminRole] = await queryInterface.sequelize.query(
      "SELECT id FROM roles WHERE name = 'Admin' LIMIT 1",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    /**
     * assign role Admin ke user admin yang baru dibuat
     */
    if (adminRole) {
      await queryInterface.bulkInsert(
        "user_roles",
        [
          {
            user_id: adminUserId,
            role_id: adminRole.id,
            created_at: now,
            updated_at: now,
          },
        ],
        {}
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "user_roles",
      {
        user_id: {
          [Sequelize.Op.in]: queryInterface.sequelize.literal(
            "(SELECT id FROM users WHERE email = 'admin@expressapp.com')"
          ),
        },
      },
      {}
    );

    await queryInterface.bulkDelete(
      "users",
      {
        email: "admin@expressapp.com",
      },
      {}
    );
  },
};
