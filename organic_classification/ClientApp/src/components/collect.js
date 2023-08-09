import React, { Component } from 'react';
import axios from "axios";
import ReactDOM from 'react-dom/client';
import { MoveTrain } from './MoveTrain';

export class Collect extends Component {
    static displayName = Collect.name;

    constructor(props) {
        super(props);
        this.state = { data: [], loading: true };
    }

    componentDidMount() {
        this.populateCollectedData();
    }

    static moveToTrain = (e) => {
        console.log(e); 

        MoveTrain.setInitial(e.target.id); 

        const container = document.getElementById('MoveTrain');
        const root = ReactDOM.createRoot(container);
        setTimeout(() => {
            // eslint-disable-next-line react/jsx-pascal-case
            root.render(< MoveTrain.formMoveToTrain />); 
        }, 200)
       
    }

    

    static renderCollectedData(data) {

        return (
            <div class="col-md-12 align-self-center mx-auto row" id="MoveTrain">
                {
                    data.map(dt => 

                        <div class="col-md-6">
                            <div class="card shadow card-content">
                                <div id="Img" >
                                    <img src={require("../../../FileUpload/"+dt.filepath)} class="card-img-top imgshow" alt={ dt.name } />
                                </div>
                                <div class="card-body">
                                    <table class="table table-sm table-borderless">
                                        <thead>
                                            <tr>
                                                <th colspan="3"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td width="35%">Predicted Label</td>
                                                <td width="2%">:</td>
                                                <td>{dt.name}</td>

                                            </tr>
                                            <tr>
                                                <td>Non-Organic</td>
                                                <td>:</td>
                                                <td><label class="non-organik"> {dt.n_score}</label></td>
                                            </tr>
                                            <tr>
                                                <td>Organic</td>
                                                <td>:</td>
                                                <td><label class="organik">{dt.o_score}</label></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="card-footer text-muted">
                                    <div class="col-md-12 row">
                                        <div class="text-start col-md-6">
                                            {dt.created_date}
                                        </div>
                                        <div class="text-end col-md-6">
                                            { dt.trained === false ? <button class="btn btn-primary" onClick={Collect.moveToTrain} id={dt.id}> Request Training </button> : <i>Requested</i>}
                                        </div>
                                       
                                    </div>
                                    
                                </div>
                            </div>
                      </div>
                    )
                }
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Collect.renderCollectedData(this.state.data);

        return (
            <div>
               {/* <h5 id="tabelLabel" >Collected data</h5>*/}
                {contents}
            </div>
        );
    }

    async populateCollectedData() {
        // using .then, create a new promise which extracts the data
        const data = await axios.get("analize/getfileuploaded").then((response) => response.data.data)

        // return it
        this.setState({ data: data, loading: false });
        //return dataPromise; 
        console.log(this.state.data);  
    }
}