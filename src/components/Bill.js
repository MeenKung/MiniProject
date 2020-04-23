import React from 'react';
import './Post.css';
export default (props) => {
    const {bill} = props
    const {id,buyInfo,buyer,address,postNO} = bill

    return(  
 
    <li className='post'>
        <div>billNo. : {id}</div>
        <div>buyer : {buyer}</div>
        <div>address : {address}</div>
        <div>postNo. : {postNO}</div>
        <div>seller : {buyInfo.seller}</div>
        <div>title : {buyInfo.title}</div>
        <div>price : {buyInfo.price}</div>
        <div>count : {buyInfo.count}</div>
        <div>cost : {buyInfo.cost}</div>
    </li>

    )
}