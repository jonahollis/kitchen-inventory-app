import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ text, onClick, className }) => {

  return (
    <button className={className} onClick={onClick} >{ text }</button>
  )
}

Button.defaultProps = {
    color: 'steelblue',
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button