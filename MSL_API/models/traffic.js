module.exports = (sequelize, DataTypes) => {
    const Traffic = sequelize.define('Traffic', {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      visits: DataTypes.INTEGER,
      pageviews: DataTypes.INTEGER,
      bounce_rate: DataTypes.FLOAT,
      new_users: DataTypes.INTEGER,
    });
    return Traffic;
  };
  