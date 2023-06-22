import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import { btnUpload } from './btnUpload';

export class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = { upload: [], loading: true };
    }

    static uploadbutton() {
        const container = document.getElementById('upload');
        const root = ReactDOM.createRoot(container);
        root.render(< btnUpload.btn/>) 
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Upload.uploadbutton(this.state.upload);
        return (
            <div class="col-md-12">
                <div id="upload">
                    <button onClick={Upload.uploadbutton} class="btn btn-primary extra-btn">Start</button>
                    {/*{ contents }*/}
                </div>
            
            </div>
           
        )
    }

   
}