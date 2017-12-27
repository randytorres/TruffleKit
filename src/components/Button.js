import React from 'react'

export const Button = ({ onUserClick, text }) =>
  <li className="pure-menu-item">
    <a href="#" className="pure-menu-link" onClick={onUserClick}>{text}</a>
  </li>