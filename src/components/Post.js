import React from 'react';
import {firestore} from '../App'
import './Post.css';
export default (props) => {
    const {post,editPostHandler,deletePostHandler,showEditDeleteButton,minusCountHandler,plusCountHandler} = props
    const {id, title,image,content,stock,count,price,seller} = post

    return(  
    <li className='post'>
        <div className="container">
            {id} 
            <button onClick={()=>editPostHandler(id)} hidden={!showEditDeleteButton}>Edit</button> 
            <button onClick={()=>deletePostHandler(id)} hidden={!showEditDeleteButton}>Delete</button>
        </div>
        <div >{title}</div>
        <img src={image} height="100" alt=''/>
        <div >{content}</div>
        <div className="container">
        <button onClick={()=>minusCountHandler(post)}>-</button>
        {count}
        <button onClick={()=>plusCountHandler(post)}>+</button>
        Stock:{stock}
        </div>
        <div >Seller:{seller}</div>
        <div >Price:{price}</div>
        <button>buy</button>
    </li>
    )
}