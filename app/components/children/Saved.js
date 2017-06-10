var React = require("react");
var Helpers = require("../../utils/helpers");


var Saved = React.createClass({
    getInitialState: function () {
        return {
            savedResults: this.props.saved
        };
    },
    componentDidMount: function () {
        this.props.articleRetrieve();
    },
    deleteArticle: function (article) {
        var promoise = new Promise((resolve, reject) => {
            resolve(Helpers.deleteDbArticles(article));
        }).then((res) => {
            this.props.articleRetrieve();
        });
    },
    handleOnclick: function (event) {
        var i = event.target.value;
        var article = {
            id: this.props.saved[i].articleID
        };
        this.deleteArticle(article);
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-md-12">
                    {this.props.saved.map((res, index) => {
                        return (
                            <div key={index} className="row">
                                <div className="col-md-12">
                                    <h3><a target="_blank" href={res.url}>{res.title}</a></h3>
                                    <h4>{res.date}</h4>
                                    <button onClick={this.handleOnclick} className="btn" value={index}>Delete</button>
                                    <hr />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        );
    }
});


module.exports = Saved;
