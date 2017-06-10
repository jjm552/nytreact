var axios = require ("axios");

var helper = {

    runQuery: function(topic, startYear, endYear){

        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"

        queryURL += '?' + $.param({
           'api-key': "14065e55dd764ecc83bc910e760db997",
            'q': topic,
            'begin_date': startYear + "0101",
            'end_date': endYear + "1231",
            'page': 1
        });

        return axios.get(queryURL).then(function(response){
            console.log(response);
            if(response.data.response.docs.length > 0){
                 var res = [];
               for(var i =0; i < 5; i++){
                    var doc = response.data.response.docs[i];
                    var id = doc._id;
                    var articleTemp = {
                        title: doc.headline.main,
                        date: doc.pub_date.split('T')[0],
                        url: doc.web_url,
                        articleID: id
                    }
                    res.push(articleTemp);
                }
                return res;
            }
            return false;
        });

    },
    getDbArticles: function(){
        return axios.get("/api");
    },
    postDbArticles: function(data){
        axios.post("/api",data);
    },
    deleteDbArticles: function(data){
        axios.post("/api/delete",data);
    }
};

module.exports = helper;