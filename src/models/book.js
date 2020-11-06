module.exports = (sequelize, DataTypes) => {
    const schema = {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: 'Title cannot be empty, please enter a Title',
                },
                notNull: {
                    args: [true],
                    msg: 'Title cannot be empty, please enter a Title',
                },
            },
        },

        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: 'Author cannot be empty, please enter an Author',
                },
                notNull: {
                    args: [true],
                    msg: 'Author cannot be empty, please enter an Author',
                },
            },
        },

        genre: DataTypes.STRING,
        ISBN: DataTypes.STRING,
    };

    return sequelize.define('Book', schema);
};
