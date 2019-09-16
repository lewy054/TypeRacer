import React from 'react';
import './CSS/TopList.css'
import { toplist } from './content/toplist.json';


let lowestWPM = 5000;

export default class TopList extends React.PureComponent {
    createTopList = () => {
        var children = [];
        var topList = [];

        for (let i = 0; i < toplist.length; i++) {
            if (lowestWPM > parseFloat(toplist[i].wpm)) {
                lowestWPM = parseFloat(toplist[i].wpm);
            }
            children.push(
                <tr>
                    <td>{toplist[i].name}</td>
                    <td>{toplist[i].wpm}</td>
                    <td>{toplist[i].country}</td>
                </tr>
            )
        }
        this.props.parentCallback(lowestWPM);
        topList.push(<table id="topList">
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>WPM</th>
                    <th>Country</th>
                </tr>{children}
            </tbody>
        </table>)
        return topList
    }
    render() {
        return (
            <div>
                {this.createTopList()}
            </div>
        )
    }

}