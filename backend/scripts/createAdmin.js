const bcrypt = require('bcrypt');
const { User } = require('../database/associations');

const createAdminUser = async () => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash('admin123', saltRounds);

        const adminUser = await User.create({
            email: 'admin@example.com',
            passwordHash: hashedPassword,
            role: 'admin',
            phoneNumber: null
        });

        console.log('Admin user created successfully:', adminUser.email);
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        process.exit();
    }
};

createAdminUser(); 