import React, { useRef, Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { inputUpload } from './inputUpload';
import { Upload } from './Upload';



export class btnUpload extends Component {

    constructor(props) {
        super(props);
        this.state = { uploads: [], loading: true };
        this.state = { filename: '' }
    }


    static Uploadfile =(files)=> {
        
        try {
            const formData = new FormData(); 
            formData.append("file", files); 

            const container = document.getElementById('analize');
            const root = ReactDOM.createRoot(container);
            root.render("Uploading..."); 

            var result = fetch("analize/importfile", {
                method: 'POST',
                body: formData
            }).then((response) => {
                console.log(response); 
                return response.text(); 
            }).then((data) => { 

                inputUpload.setDefaultValue(data); 
                root.render("Processing..."); 
                window.setTimeout(() => {
                    root.render(< inputUpload.UserForm />);

                }, 1000); 
               

            }).catch(error => {
                console.warn(error)
            });

           
        } catch (e) {
            console.log(e); 
        }
    }
     
    static btnAction() {

        return (
            <div class="col-md-12 row btnaction" >
                <div class="col-md-12">
                   <div class="col-md-12" id="showresult">

                   </div>
                </div>
                <div class="col-md-6" id="analize">
                    
                </div>
                <div class="col-md-6">
                    <button class="btn btn-secondary extra-btn2" onClick={ Upload.uploadbutton }>Refresh</button>
                </div>
            </div>
        ); 
    }
    static img(img) {

        return (<img src={img} class="card-img-top"  alt="..." />
            //<div class="col-md-12 row">
            //    <div class="col-md-6">
            //        <img src={img} class="rounded float-center" width="400px" alt="..." />
            //    </div>
            //    <div class="col-md-6" id="showResult">
                   
            //    </div>
            //</div>

            
        ); 
    }


    static previewImage(ths) {

        const container = document.getElementById('previewImage');
        const root = ReactDOM.createRoot(container);

        //if (ths == undefined) { return;  }
        var file = ths.target.files[0];
        if (ths.target.files.length === 0) {
            root.render(<h1>No file selected</h1>); 

            return;
        }

        const objectUrl = URL.createObjectURL(file); 
        var imgelemn = btnUpload.img(objectUrl)
        root.render(imgelemn); 

        const container2 = document.getElementById('btnAction');
        const root2 = ReactDOM.createRoot(container2);
        root2.render(< btnUpload.btnAction />); 

        window.setTimeout(() => {
            btnUpload.Uploadfile(file); 
        }, 300); 
    }

    static btn() {
        return (
            <div class="col-md-12 text-center">
                <div class="col-md-8 align-self-center mx-auto">
                    <div class="card shadow">
                        <div id="previewImage" >
                            <img src={require('../../src/images/preview.jpg')}  class="card-img-top" alt="..." />
                        </div>
                        <div class="card-body">
                            <div id="btnAction">
                                <input type="file" class="custom-file-input" onChange={btnUpload.previewImage} id="formFileLg" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}