import React from 'react';

export default (props) => {
    return(
        <div>
            <p>title:<input type='text' name='title' onChange={props.setHandler}/></p>
            <p>image(url):<input type='text' name='image' onChange={props.setHandler}/></p>
            <p>content:<input type='text' name='content' onChange={props.setHandler}/></p>
            <p>price:<input type='number' name='price' onChange={props.setHandler}/></p>
            <p>stock:<input type='number' name='stock' onChange={props.setHandler}/></p>
            <button onClick={props.createClick}>Create</button>
            <button onClick={props.cancelClick}>Cancel</button>
        </div>
    ) 
}
