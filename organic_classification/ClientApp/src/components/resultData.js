import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
export class resulData extends Component {
    static getResult = (data) => {


        return (
            
            <table class="table table-sm bordered">
                <thead>
                    <tr>
                        <th colspan="3">RESULT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Predicted Label</td><td>:</td><td>{ data.predictedLabel}</td>
                        
                    </tr>
                    <tr>
                        <td>Non-Organic</td><td>:</td><td><label class="non-organik"> {data.score[0]}</label></td>
                    </tr>
                    <tr>
                        <td>Organic</td><td>:</td><td><label class="organik">{data.score[1]}</label></td>
                    </tr>
                </tbody>

            </table>
        ); 
    }

   
}