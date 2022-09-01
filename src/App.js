import './App.css';
import React, {useState, useEffect} from 'react'

function App() {

  const [view , setView] = useState(true)
  const [inv, setInv] = useState([])
  const [page, setPage] = useState({})

  async function inven() {
    const res = await fetch('http://localhost:1234')
    const data = await res.json()
    setInv(data)
  }

  async function single(x) {
    setView(!view)
    const resd = await fetch('http://localhost:1234/')
    const dataa = await resd.json()
    setPage(x)
  }

  useEffect( () => {
    inven()
  } ,[])

  return <>

  {view ?

          inv.map((x) => {return <div className="items" onClick={() => {single(x)}}>
          <p>{x.title}</p>
          <img src={x.image} alt={x.title} />
          <p>Price: £{x.price}</p>
          </div> } )
      
      :

      <>


    <div className="singlitem">
      <p>{page.title}</p>
      <img src={page.image} alt={page.title} />
      <p>{page.description}</p>
      <p>£{page.price}</p>
      <p>Category: {page.category}</p>
      <button onClick={() => setView(!view)}>Back</button>
      </div>
      </>
      }

    </>;
}

export default App;

//Do npm run serv before npm start to run it properly