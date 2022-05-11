import React, {useState, useRef} from 'react';
import { TextField, Button } from '@mui/material';
import QRCode from "qrcode";

export default function Generator() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }
  return (
    <container>
                 <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
                          <Button  variant="contained" 
                             color="primary" onClick={() => generateQrCode()}>Generate</Button>
                             <br/>
                             <br/>
                             <br/>
                             {imageUrl ? (
                               <a href={imageUrl} download>
                                   <img src={imageUrl} alt="img"/>
                             </a>) : null}
  </container>
  )
}
