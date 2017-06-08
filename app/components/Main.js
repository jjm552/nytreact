import React from "react";

var Link = require("react-router").Link;
var Helpers = require("../utils/helpers");

// var Results = require("./children/Search");
// var Saved = require("./children/Saved");

var Main = React.createClass({
    getInitialState: function(){
        return {
            userTopic: "",
            startYear: "",
            endYear: ""
        }
    },
    articleSearch: function(userTopic, startYear, endYear){
        Helpers.runQuery(userTopic,startYear,endYear)
        .then(function(results){
            this.setState({results: results});
            console.log(this.state.results);
        }.bind(this));
    },
    articleSave: function(article){
        var promise = new Promise((resolve, reject) => {
            resolve(Helpers.postDbArticles(article));
        }).then((res) => {
            this.articleRetrieve();
        });
    },
    articleRetrieve: function(){
        Helpers.getDbArticles()
        .then(function(response){
            var res = response.data;
            var saved = [];
            for (var i = 0; i < res.length; i++){
                saved.push(res[i]);
            }
            this.setState({
                saved: saved
            });
        }.bind(this));
    },

    render: function(){
        return (
            <div className="container">
                    <div className="jumbotron">
                        <h1>New York Times Article Scrubber</h1>
                        <p>
                            Search for and annotate articles of interest!
                        </p>
                    </div>

                    <div className="row">

                        {this.props.children}

                    </div>
            </div>
        )
    }
});




module.exports = Main;