import React from 'react';
import './CSS/TopList.css'
import { toplist } from './content/toplist.json';

export default class TopList extends React.Component {
    constructor(props) {
        super(props);
        this.createTopList = this.createTopList.bind(this);
    }
    createTopList = () => {
        var children = [];
        var topList = [];

        for (let i = 0; i < toplist.length; i++) {
            children.push(
                <tr>
                    <td>{toplist[i].name}</td>
                    <td>{toplist[i].wpm}</td>
                    <td>{toplist[i].country}</td>
                </tr>
            )
        }
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