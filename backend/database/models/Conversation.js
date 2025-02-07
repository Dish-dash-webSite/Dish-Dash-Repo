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
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('active', 'closed'),
            defaultValue: 'active'
        }
    }, {
        tableName: 'Conversations'
    });
    
    return Conversation;
};
