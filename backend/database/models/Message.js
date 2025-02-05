module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        conversationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Conversations',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        senderType: {
            type: DataTypes.ENUM('customer', 'driver'),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
    
    return Message;
};