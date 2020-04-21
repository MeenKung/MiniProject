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
                <div className="col-25">
                    Buyer Name :
                </div>
                <div className="col-50">
                <input type='text' name='buyer' onChange={setHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    Address :
                </div>
                <div className="col-50">
                <input type='text' name='address' onChange={setHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    PostNo. :
                </div>
                <div className="col-50">
                    <input type='number' name='postNO' onChange={setHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    title : 
                </div>
                <div className="col-50">
                    {title}
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    price : 
                </div>
                <div className="col-50">
                    {price}
                </div>
            </div>
            <div className="row">
            <div className="col-25">
                seller :
            </div>
            <div className="col-50">
                    {seller}
                </div>
            </div>
            <div className="row">
            <div className="col-25">
                count :
            </div>
            <div className="col-50">
                    {count}
                </div>
            </div>
            <div className="row">
            <div className="col-25">
                All cost :
            </div>
            <div className="col-50">
                    {cost}
                </div>
            </div>
            <center><br/>
            <button className="bttn" onClick={confirmHandler} >Confirm</button> &nbsp;
            <button  className="myButton"  onClick={cancelHandler}>Cancel</button>
            </center>
            </div>
        </center>: null
        }
        </div>
    ) 
}
