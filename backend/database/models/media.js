module.exports = (sequelize, DataTypes) => {
    const Media = sequelize.define('Media', {
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
        orderItemId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
    });

    return Media;
};