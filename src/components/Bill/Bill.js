import React from 'react';
import deleteIcon from '../images/delete.png';
import './Bill.css'
export default (props) => {
    const {bill,deleteBillHandler} = props
    const {id,buyInfo,buyer,address,postNO} = bill

    return(  
    <li className='bill'>
        <div className="billContainer">
            <img src={deleteIcon} width="20" height="20" alt="delteIC" onClick={()=>deleteBillHandler(id)}/>
        </div>
        <div><h2>MeenShop</h2></div>
        <div className="billContainer">billNo. : {id}</div>
        <div className="billContainer">buyer : {buyer}</div>
        <div className="billContainer">address : {address}</div>
        <div className="billContainer">postNo. : {postNO}</div>
        <div className="billContainer">seller : {buyInfo.seller}</div>
        <div className="billContainer">title : {buyInfo.title}</div>
        <div className="billContainer">price : {buyInfo.price}</div>
        <div className="billContainer">count : {buyInfo.count}</div>
        <div className="billContainer">cost : {buyInfo.cost}</div>
    </li>

    )
}