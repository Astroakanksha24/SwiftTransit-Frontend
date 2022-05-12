import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { getURL, getToken } from '../utils/index';
import jwt_decode from "jwt-decode";

export default function UserScanCash() {
    const [data, setData] = useState('');

    const approveTicketHandler = () => {
        console.log(data)
        let theTicketID = data;
        theTicketID = theTicketID.split("http://")[1]
        var decoded = jwt_decode(getToken());
        let username = decoded["data"]["data"]["_id"];
        //bus-travel-ticket/complete-ticket-transaction-by-user-cash
        const thatURL = getURL() + "bus-travel-ticket/complete-ticket-transaction-by-user-cash";
      axios.post(
          thatURL,
          {
            "ticketID": data,
            "userID": username
        },
          {
              headers: {
                  "Content-Type": "application/json",
              },
          }
      )
      .then((response) => {
         if (response.status === 201) {
            alert("Ticket Booked Successfully!")
            window.location='/user-dashboard'
            return;
          }
      })
      .catch((err) => {
         console.log(err)
         console.log(err.response.data)
         console.log(err.response.message)
         console.log(err.response )
         alert("Some error occurred");
         window.location='/user-dashboard'
         return;
      });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
         setData('')
        }, 1000);
        return () => clearTimeout(timer);
      }, []);

  return (
    <div>
        <>
            <QrReader
                onResult={(result, error) => {
                if (!!result) {
                    setData(result?.text);
                }
                if (!!error) {
                    console.info(error);
                }
                }}
                style={{ width: 'auto', height: 'auto' }}
            />
            {data.length>0 ? <>
            <div>
                <button onClick={approveTicketHandler}>
                    Approve
                </button>
            </div>
            </> : <></> }
        </>
    </div>
  )
}