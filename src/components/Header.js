import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd, replenishFilter, setReplenishFilter }) => {
  return (
    <header className='mb-4'>
      <div className='row align-items-center'>
        <div className='col'>
          <h1>{title}</h1>
        </div>
        <div className='col-auto'>
          <Button
            text={replenishFilter ? 'Return to Kitchen Inventory' : 'Show Grocery List'}
            className={replenishFilter ? 'btn btn-secondary' : 'btn btn-primary'}
            onClick={() => setReplenishFilter(!replenishFilter)}
          />
        </div>
        <div className='col-auto'>
          <Button className={showAdd ? 'btn btn-danger' : 'btn btn-success'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />
        </div>
      </div>
    </header>
  )
}

Header.defaultProps = {
    title: 'Kitchen Inventory App',
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header