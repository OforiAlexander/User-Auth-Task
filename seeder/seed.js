import dotenv from 'dotenv';
import sequelize from '../config/DB.js';
import User from '../models/user.js';

dotenv.config();

const users = [
    {
        username: 'admin_user',
        password: 'Admin123!',
        isAdmin: true
    },
    {
        username: 'test_user1',
        password: 'Test123!',
    },
    {
        username: 'john_doe',
        password: 'JohnDoe123!',
    },
    {
        username: 'jane_smith',
        password: 'JaneSmith123!',
    },
    {
        username: 'developer1',
        password: 'Dev123!',
    },
    {
        username: 'qa_tester',
        password: 'QATest123!',
    },
    {
        username: 'product_owner',
        password: 'Product123!',
    },
    {
        username: 'scrum_master',
        password: 'Scrum123!',
    },
    {
        username: 'tech_lead',
        password: 'Tech123!',
    },
    {
        username: 'ui_designer',
        password: 'Design123!',
    },
    {
        username: 'data_analyst',
        password: 'Data123!',
    },
    {
        username: 'guest_user',
        password: 'Guest123!',
    }
];

const seedDatabase = async () => {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // Sync the model with the database
        await sequelize.sync({ force: process.env.NODE_ENV === 'development' });
        console.log('Database synced successfully.');

        // Create users
        console.log('Starting to seed users...');
        const userPromises = users.map(async (user) => {
            try {
                await User.create(user);
                console.log(`User ${user.username} created successfully`);
            } catch (error) {
                console.error(`Error creating user ${user.username}:`, error.message);
            }
        });

        await Promise.all(userPromises);

        console.log('\nSeeding Statistics:');
        const userCount = await User.count();
        console.log(`Total users in database: ${userCount}`);
    } catch (error) {
        console.error('\n Database seeding failed:', error.message);
    } finally {
        // Close the database connection
        await sequelize.close();
        console.log('\n Database connection closed.');
        process.exit(0);
    }
};

seedDatabase();