import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import { btnUpload } from './btnUpload';
import { resulData } from './resultData';

export class inputUpload extends Component {

    constructor(props) {
        super(props);
        this.state = { filename: '' }
        this.inputRef = React.CreateRef(); 
    }

    //static [filenama, setFileNama] = useState(); 

    static setDefaultValue = (value) => {
        //const [filename, SetFileName] = useState(''); 

        //SetFileName(value); 
        this.inputRef = value; 

        //this.setState ({ filename:values});
    }



    static UserForm = props => {

        const [imagedt, setImageName] = useState(''); 
        const onChangeHandler = (event: HTMLInputElement) => {
            const { name, value } = event
            setImageName((prev) => {  
                return { ...prev, [name]: value }
            })
        }
        
        const submit = e => {
            e.preventDefault()

            var arrdata = ""; 

            for (var i = 0; i < e.target.length; i++) {
                if (e.target[i].name === "fileName") {
                    //arrdata = onChangeHandler(e.target[i]); 
                    arrdata = {
                        fileName: e.target[i].value, 
                    }
                }
            }

            console.log(arrdata); 
            //imagedt = arrdata
            const container = document.getElementById('showresult');
            const root = ReactDOM.createRoot(container);
            root.render("Menganalisa data..."); 

            window.setTimeout(() => {

                console.log(imagedt); 
                axios.post('analize/send', arrdata).then(function (response) {
                    console.log(response);

                    root.render("Mendapatkan data..."); 
                    console.log(response.data.imageSource); 
                    var ress = resulData.getResult(response.data);
                    window.setTimeout(() => {
                        
                        root.render(ress);
                    }, 200); 
                   
                }).catch(function (error) {
                    console.log(error);
                });

            }, 1000); 
        }

        return (
            <form id="form-analize" onSubmit={submit}>
                <div id="inputsection">
                    <input type="hidden" id="FileName" name="fileName" value={this.inputRef} onChange={(e) => onChangeHandler(e.target)}></input>
                </div>
                <button type="submit" class="btn btn-success extra-btn2" >Analisa</button>
            </form>
                    
        )
    }

}