const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const docSchema = new Schema({
    _id: {
        type: String,
    },
    userId:{
        type: String,
    },
    delta: {
        type: Object,
    }
});


mongoose.model("Doc", docSchema);