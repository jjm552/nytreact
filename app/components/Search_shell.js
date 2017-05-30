var React = require("react");

var Results = require("./children/Results");
var Saved = require("./children/Saved");

var Search_shell = React.createClass({

    searchNyt: function(){
        
        var userTopic = "spaceX";
        var userBD = "19800101";
        var userED = "20170101";

        request.get({
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
            qs: {
            'api-key': "14065e55dd764ecc83bc910e760db997",
            'q': userTopic,
            'begin_date': userBD,
            'end_date': userED
        },
            }, function(err, response, body) {
                body = JSON.parse(body);
                console.log(body);
        })
    },

    render: function(){
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron">
                        <h1>New York Times Article Scrubber</h1>
                        <p>
                            Search for and annotate articles of interest!
                        </p>
                    </div>
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title text-center">Search</h3>
                            </div>
                            <div className="panel-body text-center">
                                <div className="col-md-12">
                                    <form>
                                        <p>Topic</p>
                                        <input type="text" className="form-control" placeholder="i.e: Pick a good one it's crazy out there" />
                                        <p>Start Year</p>
                                        <input type="text" className="form-control" placeholder="YYYYMMDD - bes follow my format" />
                                        <p>End Year</p>
                                        <input type="text" className="form-control" placeholder="YYYYMMDD - do it or else" />
                                        <br/><br/>
                                        <input type="submit" className="btn btn-primary btn-lg" value="submit" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <Results />
                    </div>
                    <div className="col-md-12">
                        <Saved />
                    </div>
                </div>
            </div>
        )
    }
});




module.exports = Search_shell;