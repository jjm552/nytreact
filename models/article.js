var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    date:{
        type:String,
        require: true
    },
    url:{
        type:String,
        require: true
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;