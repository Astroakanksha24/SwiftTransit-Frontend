import React, {Component} from 'react'
import QrReader from 'react-qr-scanner'

class QrContainer extends Component{
    constructor(props){
        super(props)
        this.state ={
            result:'Hold QR code steady and clear to scan',
        }
        this.handleScan=this.handleScan.bind(this)
    }

    handleScan(result){
        this.setState(
            {
                result:data
            }
        )
    }

    handleError(err)
    {
        console.error(err);
    }

    render(){
        const previewStyle={
            height:700,
            width:1000,
            display:'flex',
            "justify-content":"center"

        }

        const camStyle={
            display:'flex',
            justifyContent:"center",
            marginTop: '-50px'
        }

        const textStyle={
            fontStyle:'30px',
            "text-align":'center',
            marginTop: '-50px'
        }

        return(
            <React.Fragment>
                <div style=(camStyle)>
                     <QrReader
                        delay={100}
                        style={previewStyle}
                        onError={this.handleError}
                        onScan={this.handleScan}
                     />
                </div>
                <p style={textStyle}>
                    {this.style.result}
                </p>
            </React.Fragment>
        )
    }
}
export default QrContainer;