import React, { PropTypes } from 'react'
import classNames           from 'classnames'

export  const lgLimit={
     title: 8,
     description: 16,
     hiddenStyle:"..."
}

export  function displayContent (contentText,limit) {
   if( contentText.length<=limit){
        return contentText;
   }else {
       return contentText.substring(0,limit)+"...";
   }
}


export default class AbcLabelLimit extends React.Component
{
    static propTypes =
    {
        contentText : PropTypes.string,
        limit :PropTypes.number,
    }
    //label label-bg label-abc
    static defaultProps =
    {
        contentText : "",
        limit :"-1",
    }
    render()
    {
        const { contentText, limit} = this.props
        const label=(<span>
            {
                displayContent(contentText,limit)
            }</span>)
        return label;
    }
}