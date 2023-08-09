import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
export class resulData extends Component {
    static getResult = (data) => {


        return (
            
            <table class="table table-sm table-borderless tableResult">
                <thead>
                    <tr>
                        <th colspan="3"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td width="25%">Predicted Label</td>
                        <td width="3%">:</td>
                        <td>{data.predictedLabel}</td>
                        
                    </tr>
                    <tr>
                        <td>Non-Organic</td>
                        <td>:</td>
                        <td><label class="non-organik"> {data.score[0]}</label></td>
                    </tr>
                    <tr>
                        <td>Organic</td>
                        <td>:</td>
                        <td><label class="organik">{data.score[1]}</label></td>
                    </tr>
                </tbody>

            </table>
        ); 
    }

   
}