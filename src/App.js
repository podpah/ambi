import './App.css';
import React, {useState, useEffect} from 'react'



function showProduct(x){
  alert(x.title +' clicked.')

}

function App() {

  const [view , setView] = useState("list")
  const [inv, setInv] = useState([])
  const [page, setPage] = useState({})
  const [isFocused, setIsFocused] = useState(false) //is focused refers to if an item has been clicked on. If so, the item is focused (isfocus is true)
  const [focusedItem, setFocusedItem] = useState({})

  async function inven() {
    const res = await fetch('http://localhost:1234')
    const data = await res.json()
    setInv(data)
    console.log(inv)
  }

  useEffect( () => {
    inven()
  } ,[])

  if (isFocused == false){ //If the user is not viewing a particular product (all are being viewed), then we show all.
    return <>
          {inv.map((x) => {return <div className="items" onClick={()=> {
            showProduct(x)
            setIsFocused(isFocused => !isFocused) //When a component is clicked, the isFocused variable flips.
            setFocusedItem(x)
          }
            
          }>
          <p>{x.title}</p>
          <img src={x.image} alt={x.title} />
          <p>Price: £{x.price}</p>
          </div> } )}
    </>;
  }else{ //Here we show just the product that has been clicked on.
    return <>
      <div>
      <button onClick={()=>{
          setIsFocused(isFocused=> !isFocused)
        }} >Back</button>
      </div>
      <div className='item-container'>
        
        <p>{focusedItem.title}</p>
        <img src={focusedItem.image} alt={focusedItem.title} />
        <p>Price: £{focusedItem.price}</p>
        <p>{focusedItem.description}</p>
        <p>Category: {focusedItem.category}</p>
        <button>Delete</button>
        <button>Update</button>

      </div>
      
      
    </>
  }


}
  

export default App;

//Do npm run serv before npm start to run it properly