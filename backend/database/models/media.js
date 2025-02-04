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
    });

    return Media;
};
