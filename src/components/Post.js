import React from 'react';
import './Post.css';
import edit from './edit.png';
import delet from './delete.png';
export default (props) => {
    const {post,editPostHandler,deletePostHandler,showEditDeleteButton,minusCountHandler,plusCountHandler} = props
    const {id, title,image,content,stock,count,price,seller} = post

    return(  
 
    <li className='post'>
        <div className="container">
             
            <img src={edit} width="20" height="20" onClick={()=>editPostHandler(id)} hidden={!showEditDeleteButton}></img>
            <img src={delet} width="20" height="20" onClick={()=>deletePostHandler(id)} hidden={!showEditDeleteButton}></img>
        </div>
        <div ><b>{title}</b></div>
        <div className="img"><img src={image} width="75%" alt=''/></div>
        <div >{content}</div>
        <div className="container">
        <button onClick={()=>minusCountHandler(post)}>-</button>
        {count}
        <button onClick={()=>plusCountHandler(post)}>+</button>
        Stock:{stock}
        </div>
        <div>Seller:{seller}</div>
        <div>Price:{price}</div>
        <div className="btn-group">
        <button className="button">buy</button>
        </div>
    </li>

    )
}