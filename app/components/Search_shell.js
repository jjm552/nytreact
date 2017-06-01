var React = require("react");
// var request = require("request");

var Results = require("./children/Results");
var Saved = require("./children/Saved");

var Search_shell = React.createClass({

    getInitialState: function(){
        return {topic: '',
                startYear: '',
                endYear: ''}
    },
    handleChange: function(key){
        return function(e){
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    handleSubmit(event){
        console.log(this.state.topic);
        event.preventDefault();
    },

    searchNyt: function(event){    
        // var userTopic = "spaceX";
        // var userBD = "19800101";
        // var userED = "20170101";
        var userTopic = this.state.topic;
        var userBD = this.state.startYear;
        var userED = this.state.endYear;
        console.log(userTopic);
        console.log(userBD);
        console.log(userED);

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
                                    <form onSubmit={this.searchNyt}>
                                        Topic: <input className="form-control" value={this.state.topic} onChange={this.handleChange('topic')} placeholder="i.e: Pick a good one it's crazy out there" />
                                        <br />
                                        Start Year: <input className="form-control" value={this.state.startYear} onChange={this.handleChange('startYear')} placeholder="YYYYMMDD - bes follow my format"  />
                                        <br />
                                        End Year: <input className="form-control" value={this.state.endYear} onChange={this.handleChange('endYear')} placeholder="YYYYMMDD - do it or else" />
                                        <br />
                                        <input type="submit" className="btn btn-primary btn-lg" value="Submit" />
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