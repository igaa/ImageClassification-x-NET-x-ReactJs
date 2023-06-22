import React, { Component } from 'react';

export class collect extends Component {
    static displayName = collect.name;

    constructor(props) {
        super(props);
        this.state = { data: [], loading: true };
    }

    componentDidMount() {
        this.populateCollectedData();
    }


    static renderCollectedData(data) {
        return ( <div></div>);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : collect.renderCollectedData(this.state.data);

        return (
            <div>
                <h1 id="tabelLabel" >Collected data</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateCollectedData() {
        const response = await fetch('analize/getfileuploaded');
        const data = await response.data.json();
        this.setState({ data: data, loading: false });
    }
}