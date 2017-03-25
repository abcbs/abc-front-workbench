import React, { PropTypes } from 'react'
import FilterLink from '../routeres/FilterLink'
const Link = ({ active,linkName, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
  <FilterLink filter={linkName} onClick={onClick} children={children}></FilterLink>
    /**
    <a href="#"
       onClick={
         (e)=> {
          e.preventDefault();
          if(onClick){
            onClick()
            }
        }

       }

      >
      {children}
    </a>
     **/
  )
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  linkName: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link
