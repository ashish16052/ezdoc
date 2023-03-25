const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const boilerSchema = new Schema({
    _id: {
        type: String,
    },
    userId: {
        type: String,
    },
    delta: {
        type: Object,
    }
});


mongoose.model("Boiler", boilerSchema);