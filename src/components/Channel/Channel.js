import React from 'react';
import classes from './Channel.css'

console.log(classes)
const channel = ( props ) => {
    return (
        <div className={classes.Channel}>
            {props.channel.title}
        </div>
    )
};

export default channel;