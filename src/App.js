import React, { useState, useEffect } from 'react'
import './App.css';

const useFetch = url => {
  const [clicky, setClicky] = useState(null)

  async function fetchData() {
    const response = await fetch(url)
    const clicky = await response.json()
    setClicky(clicky)
  }

  useEffect(() => { fetchData() }, [url]) // eslint-disable-line react-hooks/exhaustive-deps
  return [clicky, fetchData]
}

function App() {
  let years = new Date().getFullYear() - 1982
  const [clicky, fetchData] = useFetch('https://www.moogleapi.com/api/v1/blogs/9949bae0-b5cf-45e8-851f-4128bfda8dc6')

  async function handleReactionUpdate (e) {
    e.preventDefault()
    fetch('https://www.moogleapi.com/api/v1/blogs/like/9949bae0-b5cf-45e8-851f-4128bfda8dc6', {
    method: 'put'
    }).then(function(response) {
        if (response.status === 200) {
            fetchData('https://www.moogleapi.com/api/v1/blogs/9949bae0-b5cf-45e8-851f-4128bfda8dc6')
        }
    })
  }

  if (clicky) {
    return (
      <div className="app">
        <header>
          <div className="header-container"></div>
        </header>
        <a href="https://opensea.io/collection/nonfungiblejacks" target="_blank" rel="noreferrer"><div className="logo-container"></div></a>
        <h1>
          <a href="https://opensea.io/collection/nonfungiblejacks" target="_blank" rel="noreferrer">NonFungibleJacks</a>
          <span className='pointer reaction' onClick={e => { handleReactionUpdate(e) }}>
            <i className="fas fa-thumbs-up"></i><small><span className='reaction-count'>{clicky[0].like}</span></small>
          </span>
        </h1>
        <hr/>
        <div className="content-container">
          <p>This collection has been in the making for {years} years. It's me. Jack. I'm Jack. This is just a collection of 33 unique nonfungible Jacks because I was born on March 3rd.</p>
          <p>If you haven't come across <a href="https://opensea.io/collection/states-of-joi" target="_blank" rel="noreferrer">States of Joi</a> or <a href="https://opensea.io/collection/blockchainbetties" target="_blank" rel="noreferrer">Blockchain Betties</a> yet you should go check that out, too.</p>
          <br/>
          <br/>
          <br/>
          <p>That's all.</p>
        </div>
        <footer>
        <p>&copy; 
          <a href="https://twitter.com/jackfperryjr" target="_blank" rel="noreferrer">@jackfperryjr</a>&nbsp;
          <a href="https://twitter.com/statesofjoi" target="_blank" rel="noreferrer">@statesofjoi</a>&nbsp;
          <a href="https://twitter.com/bc_betties" target="_blank" rel="noreferrer">@bc_betties</a>
        </p>
        </footer>
      </div>
    );
  } else {
    return (
      <div className="no-state-yet">
        <span>Getting coffee...</span>
      </div>
    )
  }
  
}

export default App;
