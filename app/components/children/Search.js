import React from "react";

var Search = React.createClass({

    getInitialState: function () {
        return {
            topic: '',
            startYear: '',
            endYear: ''
        }
    },
    handleChange: function (key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    handleSubmit(event) {
        event.preventDefault();
        this.props.articleSearch(this.state.topic, this.state.startYear, this.state.endYear);
        this.setState(
            {
                topic: '',
                startYear: '',
                endYear: ''
            }
        );
    },

    render: function () {
        return (
            <div className="container" id="search-box">
                <div className="row">
                    <div className="col-md-12">
                            <div className="panel-body text-center">
                                <form onSubmit={this.handleSubmit}>
                                    <h4>Topic:</h4> <input className="form-control" value={this.state.topic} onChange={this.handleChange('topic')} placeholder="i.e: Pick a good one it's crazy out there" /><br />
                                    <h4>Start Year:</h4> <input className="form-control" value={this.state.startYear} onChange={this.handleChange('startYear')} placeholder="YYYY - bes follow my format" /><br />
                                    <h4>End Year:</h4> <input className="form-control" value={this.state.endYear} onChange={this.handleChange('endYear')} placeholder="YYYY - do it or else" /><br />
                                    <button type="submit" className="btn btn-primary btn-lg" value="Submit">Search</button>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Search;