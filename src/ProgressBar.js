import React from 'react';
export default class ProgressBar extends React.Component {
    render() {
        let currentWidth = this.props.progress + '%'
        let wpm = this.props.wpm +'WPM'
        return (
            <div>
                <div style={{
                    width: '100%',
                    backgroundColor: '#262626'
                }}>
                    <div style={{
                        width: currentWidth,
                        height: '30px',
                        backgroundColor: '#4CAF50',
                        textAlign: 'center',
                        color:'white'
                    }}>{wpm}</div>
                </div>
            </div>
        )
    }
}

