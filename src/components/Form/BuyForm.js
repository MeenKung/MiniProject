import React from 'react';
import './Form.css';
export default (props) => {
    const {showBuyForm,setHandler,buyInfo,cancelHandler,confirmHandler} = props
    const {title,price,seller,count,cost} = buyInfo
    return(
        <div>
            {showBuyForm?
            <center>
                <div className="buyForm">
                <div className="row">
                <div className="col25">
                    Buyer Name :
                </div>
                <div className="col50">
                <input type='text' name='buyer' onChange={setHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col25">
                    Address :
                </div>
                <div className="col50">
                <input type='text' name='address' onChange={setHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col25">
                    PostNo. :
                </div>
                <div className="col50">
                    <input type='number' name='postNO' onChange={setHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col25">
                    title : 
                </div>
                <div className="col50">
                    {title}
                </div>
            </div>
            <div className="row">
                <div className="col25">
                    price : 
                </div>
                <div className="col50">
                    {price} THB
                </div>
            </div>
            <div className="row">
            <div className="col25">
                seller :
            </div>
            <div className="col50">
                    {seller}
                </div>
            </div>
            <div className="row">
            <div className="col25">
                count :
            </div>
            <div className="col50">
                    {count}
                </div>
            </div>
            <div className="row">
            <div className="col25">
                All cost :
            </div>
            <div className="col50">
                    {cost} THB
                </div>
            </div>
            <center><br/>
            <button className="cButton" onClick={confirmHandler} >Confirm</button> &nbsp;
            <button  className="cancelButton"  onClick={cancelHandler}>Cancel</button>
            </center>
            </div>
        </center>: null
        }
        </div>
    ) 
}
