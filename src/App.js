import './App.css';
import React, {useState, useEffect} from 'react'



function showProduct(x){ //debugging purposes (just for u pedro )
  console.log(x.title +' clicked.')
  

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
          <p><b>{x.title}</b></p>
          <img src={x.image} alt={x.title} />
          <p>Price: £{x.price}</p>
          </div> } )}
    </>;
  }else{ //Here we show just the product that has been clicked on.
    return <>
      
      
      <div className='item-container'>
        <div className='button-container'>
          <button onClick={()=>{
              setIsFocused(isFocused=> !isFocused)
            }} >Back to all</button>
        </div>
        <h2>{focusedItem.title}</h2>
        <img src={focusedItem.image} alt={focusedItem.title} />
        <p><b>Price</b>: £{focusedItem.price}</p>
        <p><b>Description: </b>{focusedItem.description}</p>
        <p><b>Category: </b>{focusedItem.category}</p>
        <button>Delete</button> {/*Here we can add logic for deleting item.*/}
        <button>Update</button> {/*Here we can add logic for updating item.*/}

      </div>
      
      
    </>
  }


}
  

export default App;

//Do npm run serv before npm start to run it properly