module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define('Conversation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Customers',
                key: 'id',
            },
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Drivers',
                key: 'id',
            },
        },
    });
    
    return Conversation;
};
