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
  const [isAdmin, setIsAdmin] = useState(true) //Admin is automatically assumed for testing purposes only.
  const [isAddingItem, setIsAddingItem] = useState(false) //Use this state to determine if a user is adding an item or not.

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')


  const handleSubmit = async(event) => {
    event.preventDefault();

   
    let payload = {
      title: name,
      price: price,
      description: description,
      category: category,
      image: image
    }

    await fetch('http://localhost:1234/add',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
       
      }
    )
      
    inven()

    alert(payload.title);

    
  }

  async function inven() {
    const res = await fetch('http://localhost:1234')
    const data = await res.json()
    setInv(data)
    console.log(inv)
  }

  useEffect( () => {
    inven()
  } ,[])


  if (isAddingItem == true){
    return <>
      <div className='add-item-btn'>
      <button className='back-to-all' onClick={()=>{
                setIsAddingItem(isAddingItem=> !isAddingItem)
        }} >Back to all</button>
    </div>
      
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <br></br>
          Name: <input placeholder='Product name..' name='name' value={name} onChange={
             ev => setName(ev.target.value)
             }></input><br></br><br></br>
          Price: <input placeholder='Product price..' name='price' value={price} onChange={
            ev=> setPrice(ev.target.value)
          } ></input><br></br><br></br>
          <textarea placeholder='Product description..' name='description' rows={4} value={description} onChange={
            ev=> setDescription(ev.target.value)
          }></textarea><br></br><br></br>
          Category: <input placeholder='Product category..' name='category' value={category} onChange={
            ev=> setCategory(ev.target.value)
          } ></input><br></br><br></br>
          Image <input placeholder='Image link..' name='image' value={image} onChange={
            ev=> setImage(ev.target.value)
          } ></input><br></br><br></br>
          <button type='submit'>Add item</button>
        </form>
      </div>

      
    </>
  }

  if (isFocused == false){ //If the user is not viewing a particular product (all are being viewed), then we show all.
    return <>

        <div className='add-item-btn'>
          <button onClick={()=>{
            console.log('clicked')
            setIsAddingItem((isAddingItem)=> !isAddingItem)
          }}>Add new item</button>
        </div>

        <div className='container'>
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
        </div>
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