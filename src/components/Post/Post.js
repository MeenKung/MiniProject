import React from 'react';
import './Post.css';
import editIcon from '../images/edit.png';
import deleteIcon from '../images/delete.png';
import { useSelector, useDispatch} from 'react-redux';
import {firestore} from '../../App'

export default (props) => {
    const dispatch = useDispatch();
    const showEditDeleteButton = useSelector(state => state.showStatus.showForm)
    const {post,editPostHandler,deletePostHandler} = props
    const {id, title,image,content,stock,count,price,seller} = post

    const plusCountHandler = (post) => {
        const { id, title, image, content, stock, count, price, seller } = post
        if (count < stock) {
          firestore.collection("posts").doc(id + '').set({ id, title, image, content, count: count + 1, stock, price, seller })
        }
      }
    const minusCountHandler = (post) => {
        const { id, title, image, content, stock, count, price, seller } = post
        if (count > 0) {
          firestore.collection("posts").doc(id + '').set({ id, title, image, content, count: count - 1, stock, price, seller })
        }
    }
    const buyHandler = (post) => {
        dispatch({type:'POSTTOBUY_CHANGE',postToBuy:post})
        const {title, count, price, seller } = post
        if(count>0){
          let buyinfo = {title,count,price,seller,cost:price*count}
          dispatch({type:'BUYINFO_CHANGE',buyInfo:buyinfo})
          dispatch({type:'SHOWBUYFORM'})
          dispatch({type:'NOT_SHOWFORM'})
        }
    }
    
    return(  
 
    <li className='post'>
        <div className="billContainer">
            <img src={editIcon} width="20" height="20" onClick={()=>editPostHandler(id)} hidden={!showEditDeleteButton} alt='editIC'/>
            <img src={deleteIcon} width="20" height="20" onClick={()=>deletePostHandler(id)} hidden={!showEditDeleteButton} alt='deleteIC'/>
        </div>
        <div ><b>{title}</b></div>
        <div className="imgPost"><img src={image} width="60%" height="100"  alt=''/></div>
        <div className="billContainer">{content}</div>
        <div>
        <button onClick={()=>minusCountHandler(post)}>-</button>
        {count}
        <button onClick={()=>plusCountHandler(post)}>+</button>
        Stock:{stock}
        </div>
        <div className="billContainer">Seller:{seller}</div>
        <div className="billContainer">Price:{price} THB</div><br/>
        <div className="btn-group">
        <button className="button" onClick={() => buyHandler(post)}>buy</button>
        </div>
        
    </li>

    )
}