import React from 'react';
import { Link } from 'react-router';

const FilterLink = ({ filter,onClick, children }) => (
    <Link
        to={filter}
        activeStyle={{
        textDecoration: 'none',
        color: 'black'
        }}
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
    </Link>
);

export default FilterLink;
