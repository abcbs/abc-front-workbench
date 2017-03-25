import { PropTypes } from 'react'

export default PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    portrait: PropTypes.string.isRequired,
    portraitAlt: PropTypes.string.isRequired
});