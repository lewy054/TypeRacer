import React from 'react';
var currentWidth = 0;
export default class ProgressBar extends React.Component {
    render() {
        currentWidth = this.props.progress + '%'
        return (
            <div>
                <div style={{
                    width: '100%',
                    backgroundColor: '#ddd'
                }}>
                    <div style={{
                        width: currentWidth,
                        height: '30px',
                        backgroundColor: '#4CAF50'
                    }}></div>
                </div>
            </div>
        )
    }
}

