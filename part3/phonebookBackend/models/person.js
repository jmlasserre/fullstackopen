const mongoose = require("mongoose");

// Tested in Render, working as expected both locally and while deployed.

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("Connecting to MongoDB...");
mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Error while connecting to MongoDB.", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    required: [true, 'A phone number is required'],
    validate: {
      validator: function(v){
        return /^\d{2,3}-\d{6,}$/.test(v);
      },
      message: props => `${props.value} is an invalid phone number.`
    }
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
