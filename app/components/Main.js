var React = require("react");
var Search = require("./children/Search");
var Saved = require("./children/Saved");
var Result = require("./children/Result");
var Footer = require("./children/Footer");
var Helpers = require("../utils/helpers");

// var Results = require("./children/Search");
// var Saved = require("./children/Saved");

var Main = React.createClass({
    getInitialState: function () {
        return {
            userTopic: "",
            startYear: "",
            endYear: "",
            results: [],
            saved: []
        }
    },
    articleSearch: function (userTopic, startYear, endYear) {
        Helpers.runQuery(userTopic, startYear, endYear)
            .then(function (results) {
                this.setState({ results: results });
                console.log(this.state.results);
            }.bind(this));
    },
    articleSave: function (article) {
        var promise = new Promise((resolve, reject) => {
            resolve(Helpers.postDbArticles(article));
        }).then((res) => {
            this.articleRetrieve();
        });
    },
    articleRetrieve: function () {
        Helpers.getDbArticles()
            .then(function (response) {
                var res = response.data;
                var saved = [];
                for (var i = 0; i < res.length; i++) {
                    saved.push(res[i]);
                }
                this.setState({
                    saved: saved
                });
            }.bind(this));
    },
    componentDidUpdate: function () {

    },

    render: function () {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>New York Times Article Scrubber</h1>
                    <p>
                        Search for and save your favorite articles!
                        </p>
                </div>
                <div className="row">
                    <div className="col-md-12" id="search-title">
                        <h2>Search</h2><hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" id="search-window">
                        <Search articleSearch={this.articleSearch} />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12" id="result-title">
                        <h2>Search Results</h2><hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" id="result-window">
                        <Result articleSave={this.articleSave} results={this.state.results} />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12" id="saved-title">
                        <h2>Saved Articles</h2><hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" id="saved-window">
                        <Saved articleRetrieve={this.articleRetrieve} saved={this.state.saved} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
});




module.exports = Main;