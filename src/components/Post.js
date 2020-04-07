import React from 'react';
import {firestore} from '../index'
import './Post.css';
export default (props) => {
    const {post} = props
    const {id, title,image,stock,count} = post

    const plusCount = () => {
        if(count<stock){
            firestore.collection("posts").doc(id+'').set({id,title,image,stock,count:count+1})
        }
        
    }
    const minusCount = () => {
        if(count>0){
            firestore.collection("posts").doc(id+'').set({id,title,image,stock,count:count-1})
        }
    }
    return(
    <li>
        <div>{id}</div>
        <div >{title}</div>
        <img src={image} height="100" alt=''/>
        <div className="container">
        <button onClick={minusCount}>-</button>
        {count}
        <button onClick={plusCount}>+</button>
        Stock:{stock}
        </div>
    </li>
    )
}