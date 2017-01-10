import React from 'react'

const PlaceHolders = ({placeHolders, handleClick, activeElement}) => {
  return (
    <ul className="avatar-loop">
      {placeHolders.map((avatar, index )=> (
        <li className="avatar-box" key={index.toString()}>
          <img
            role="presentation"
            className={index === activeElement ? 'active': ''}
            src={avatar}
            onClick={() => handleClick(avatar, index)}
          />
        </li>
      ))}
    </ul>
  );
}

export default PlaceHolders;