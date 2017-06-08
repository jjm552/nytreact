var axios = require ("axios");

var helper = {

    runQuery: function(userTopic, startYear, endYear){

        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"

        queryURL += '?' + $.param({
           'api-key': "14065e55dd764ecc83bc910e760db997",
            'q': userTopic,
            'begin_date': stratYear + "0101",
            'end_date': endYear + "0101",
            'page': 1
        });

        return axios.get(queryURL).then(function(response){
            var nytReturnedArticles = response.data.response.docs;
            var articleArray = [];

            if( nytReturnedArticles){
                for(var i =0; i < 5; i++){
                    var articleTemp = {
                        title: nytReturnedArticles[i].headline.main,
                        date: nytReturnedArticles[i].pub.date,
                        url: nytReturnedArticles[i].web_url
                    }
                    articleArray.push(articleTemp);
                }
                return articleArray;
            }
            return "";
        });

    },
    getDbArticles: function(){
        return axios.get("/api/saved");
    },
    postDbArticles: function(article){
        return axios.post("/api/saved", {article:article});
    },
    deleteDbArticles: function(article){
        return axios.delete("/api/saved",{data:{article:article}});
    }
};

module.exports = helper;