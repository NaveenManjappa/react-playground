import React from 'react'

const JsxRules = () => {
  return (
    <div>
      <h1>JSX Rules</h1>
      <ol>
        <li>JSX must return a single parent element</li>
        <li>JSX elements must be properly closed</li>
        <li>JSX attributes are written using camelCase like className,htmlFor etc</li>
      </ol>
      <p>2 + 2 = { 2 + 2 }</p>
      <p>Friend list: {['A','B','C']}</p>
    </div>
  )
}

export default JsxRules