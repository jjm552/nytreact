import React from "react";

var Link = require("react-router").Link;

var Search = React.createClass({

    getInitialState: function () {
        return {
            topic: '',
            startYear: '',
            endYear: ''
        }
    },   // 
    handleChange: function (key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    handleSubmit(event) {
        console.log(this.state.topic);
        event.preventDefault();
    },

    render: function () {
        return (
            <div className="container">
                <div className="col-md-12">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title text-center">Search</h3>
                        </div>
                        <div className="panel-body text-center">
                            <form onSubmit={this.searchNyt}>
                                Topic: <input className="form-control" value={this.state.userTopic} onChange={this.handleChange('topic')} placeholder="i.e: Pick a good one it's crazy out there" />
                                <br />
                                Start Year: <input className="form-control" value={this.state.startYear} onChange={this.handleChange('startYear')} placeholder="YYYY - bes follow my format" />
                                <br />
                                End Year: <input className="form-control" value={this.state.endYear} onChange={this.handleChange('endYear')} placeholder="YYYY - do it or else" />
                                <br />
                                <Link to="/Search/Saved"><input type="submit" className="btn btn-primary btn-lg" value="Submit" /></Link>
                            </form>
                        </div>

                    </div>
                    <div>
                        {this.props.children}
                    </div>

                </div>

            </div>
        )
    }
});

module.exports = Search;