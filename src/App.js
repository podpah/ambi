import './App.css';
import React, {useState, useEffect} from 'react'

function App() {

  const [view , setView] = useState("list")
  const [inv, setInv] = useState([])
  const [page, setPage] = useState({})

  async function inven() {
    const res = await fetch('http://localhost:1234')
    const data = await res.json()
    setInv(data)
    console.log(inv)
  }

  useEffect( () => {
    inven()
  } ,[])

  return <>
          {inv.map((x) => {return <div className="items">
          <p>{x.title}</p>
          <img src={x.image} alt={x.title} />
          <p>Price: £{x.price}</p>
          </div> } )}
    </>;
}

export default App;

//Do npm run serv before npm start to run it properly