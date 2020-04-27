import React from 'react';
import './Form.css';
import { useSelector, useDispatch } from 'react-redux';
export default (props) => {
    const dispatch = useDispatch();
    const showBuyForm = useSelector(state => state.showStatus.showBuyForm)
    const buyInfo = useSelector(state => state.buyInfo)
    const {cancelHandler,confirmHandler} = props
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
                <input type='text' name='buyer' onChange={(e)=>{dispatch({type:'BUYER_CHANGE',buyer:e.target.value})}}/>
                </div>
            </div>
            <div className="row">
                <div className="col25">
                    Address :
                </div>
                <div className="col50">
                <input type='text' name='address' onChange={(e)=>{dispatch({type:'ADDRESS_CHANGE',address:e.target.value})}}/>
                </div>
            </div>
            <div className="row">
                <div className="col25">
                    PostNo. :
                </div>
                <div className="col50">
                    <input type='number' name='postNO' onChange={(e)=>{dispatch({type:'POSTNO_CHANGE',postNO:e.target.value})}}/>
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
