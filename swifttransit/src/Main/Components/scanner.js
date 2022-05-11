import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';


function ScannerApp()
{
    const  setScanResultWebCam =  useState('');

     
      const handleErrorWebCam = (error) => {
        console.log(error);
      }
      const handleScanWebCam = (result) => {
        if (result){
            setScanResultWebCam(result);
            console.log(result);
        }
     
    }
    return(
        <QrReader
        delay={300}
        style={{width: '100%'}}
        onError={handleErrorWebCam}
        onScan={handleScanWebCam}
        />
       
    );
}
export default ScannerApp;
