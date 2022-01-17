const Sequelize = require("sequelize");
const sequelize = new Sequelize("contentorganizer", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 9,
    min: 0,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to the databse hurray!");
    const Videos = sequelize.define(
      "videos",
      {
        title: {
          type: Sequelize.STRING,
        },
        youtuber: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING,
        },
        tags: {
          type: Sequelize.STRING,
        },
      },
      {
        freezeTableName: true,
      }
    );

    Videos.sync({ force: true }).then(() => {
      return Videos.create({
        title: "How to start a youtube channel",
        youtuber: "Dinma Otutu",
        description: "Teaching newbies how to start their journey on youtube",
        tags: "new channel, new joiner, first video",
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });

  // PERFOMING CRUD OPERATIONS USING FINDALL(), UPDATE() AND DESTROY() METHOD
  
// get all items in the db
  Videos.findAll({})
  .then((result) => {
    console.log(result, "find all items");
  })
  .catch((error) => {
    console.log(error);
  });


// update an item in the db
  Videos.update(
  {
    description: "Teaching new joiners how to create a video",
  },
  {
    where: {
      id: 1,
    },
  }
)
  .then((result) => {
    console.log("Description has been updated", result);
  })
  .catch((error) => {
    console.log("We could not update item", error);
  });


// delete an item in the db
Videos.destroy({
  where: {
    id: 1,
  },
})
  .then(() => {
    console.log("We successfully deleted the item");
  })
  .catch((error) => {
    console.log("Error deleting item", error);
  });
