import React from 'react';
import './Post.css';
import editIcon from './images/edit.png';
import deleteIcon from './images/delete.png';
export default (props) => {
    const {post,editPostHandler,deletePostHandler,showEditDeleteButton,minusCountHandler,plusCountHandler,buyHandler} = props
    const {id, title,image,content,stock,count,price,seller} = post

    return(  
 
    <li className='post'>
        <div className="container">
            <img src={editIcon} width="20" height="20" onClick={()=>editPostHandler(id)} hidden={!showEditDeleteButton} alt='editIC'/>
            <img src={deleteIcon} width="20" height="20" onClick={()=>deletePostHandler(id)} hidden={!showEditDeleteButton} alt='deleteIC'/>
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
        <div>Price:{price} THB</div>
        <div className="btn-group">
        <button className="button" onClick={() => buyHandler(post)}>buy</button>
        </div>
    </li>

    )
}