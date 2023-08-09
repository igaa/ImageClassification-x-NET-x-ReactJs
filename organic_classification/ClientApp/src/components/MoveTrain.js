import React, { useRef, Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";

export class MoveTrain extends Component {
    constructor(props) {
        super(props);
        this.state = { filename: '', id : '' }
        this.inputRef = React.CreateRef();
    }

    static setInitial = (value) => {
        this.inputRef = value;
    }

    static formMoveToTrain = () => {

        var id = this.inputRef; 

        const submit = e => {
            e.preventDefault()

            var arrdata = [];

            for (var i = 0; i < e.target.length; i++) {
                if (e.target[i].localName !== "button") {
                    var Objarrdata = {
                        Name   : e.target[i].name, 
                        Value : e.target[i].value,
                    }

                    arrdata.push(Objarrdata);

                    
                }
            }

            axios.post('analize/requests', arrdata).then(function (response) {
                console.log(response);
                //alert(""); 
                window.location.reload(); 
                //window.open("./collect"); 

            }).catch(function (error) {
                console.log(error);
            });
        }

        return (
            <div class="col-md-8 align-self-center mx-auto">
                <div class="col-md-12">
                    <div class="card shadow card-content">
                        <div class="card-body">
                            <form id="form-mover" onSubmit={submit}>
                                <div>
                                    <input type="hidden" class="form-control" name="id" value={this.inputRef}></input>
                                    <div class="form-group">
                                        <label for="categoryInput">Category</label>
                                        <select class="form-control" name="category" id="categoryInput" required>
                                            <option> select category</option>
                                            <option value="Organic"> Organik</option>
                                            <option value="Non-Organic"> Non-Organik</option>
                                        </select>
                                    </div>
                                    <br />
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-primary">Save</button>&nbsp;
                                        <button type="reset" class="btn btn-secondary">Reset</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
}