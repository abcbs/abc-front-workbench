import { PropTypes } from 'react'

export default PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string,
    price:PropTypes.number,
    number:PropTypes.number,
    portrait: PropTypes.string.isRequired,
    portraitAlt: PropTypes.string.isRequired
});