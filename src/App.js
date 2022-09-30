import './App.css';
import React, {useState, useEffect,onChange} from 'react'
import { getElementError } from '@testing-library/react';

function App() {

  const [inv, setInv] = useState([])
  const [filteredInv, setFilteredInv] = useState([])
  const [isFocused, setIsFocused] = useState(false) //is focused refers to if an item has been clicked on. If so, the item is focused (isfocus is true)
  const [focusedItem, setFocusedItem] = useState({})

  const [darkm, setDarkm] = useState(true)

  const [isAddingItem, setIsAddingItem] = useState(false) //Use this state to determine if a user is adding an item or not.

  const [isUpdatingItem, setIsUpdatingItem] = useState(false)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')

  const [edTitle, setEdTitle] = useState(focusedItem.title)
  const [edPrice, setEdPrice] = useState(focusedItem.price)
  const [edDescription, setEdDescription] = useState(focusedItem.description)
  const [edCategory, setEdCategory] = useState(focusedItem.category)
  const [edImage, setEdImage] = useState(focusedItem.image)
  const [edId, setEdId] = useState(focusedItem.id)


  function darkmo() {
    setDarkm(!darkm)
    var element = document.body;
    element.classList.toggle("dmodebody");
  }

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

    setIsAddingItem(!isAddingItem)
    alert(payload.title);

    
  }

  const handleSubmit2 = async(event) => {
    event.preventDefault();
   
    let payload = {
      title: edTitle,
      price: edPrice,
      description: edDescription,
      category: edCategory,
      image: edImage
    }

    await fetch('http://localhost:1234/update/'+ edId,
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
       
      }
    )
      
    inven()

    setIsUpdatingItem(!isUpdatingItem)
    
  }

  async function inven() {
    const res = await fetch('http://localhost:1234')
    const data = await res.json()
    setInv(data)
    setFilteredInv(data)
  }

  async function delitem(x) {
    await fetch('http://localhost:1234/delete/'+x, {method:"DELETE"})
    console.log("Deleted")
    inven()
  }

  function onChangeHandler(e) {
    let filteredItems = inv.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()))  
    setFilteredInv(filteredItems)

  }

  //Fetch the array from the fetch use onchange input bar etc

  useEffect(() => {
    inven()
  } ,[])

  if (isAddingItem == true){
    return <>
      <div className='add-item-btn'>
      <button className={!darkm ? "back-to-all" : "dmode back-to-all"} onClick={()=>{
                setIsAddingItem(isAddingItem=> !isAddingItem)
        }} >Back to all</button>
        <button className={!darkm ? "" : "dmode"} onClick={() => {darkmo()} }>Toggle colour mode</button>
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
          <button className={!darkm ? "" : "dmode"}  type='submit'>Add item</button>
        </form>
      </div>
      
    </>
  }

  if (isUpdatingItem == true){
    return <>
      <div className='update-item-btn'>
      <button className={!darkm ? "back-to-all" : "dmode back-to-all"} onClick={()=>{
                setIsUpdatingItem(isUpdatingItem=> !isUpdatingItem)
        }} >Back</button>
        <button className={!darkm ? "" : "dmode"} onClick={() => {darkmo()} }>Toggle colour mode</button>
    </div>
      
      <div className='form-container'>
        <form>
          <br></br>
          Name: <input placeholder='Product name..' name='name' value={edTitle} onChange={
             (ev) => setEdTitle(ev.target.value)
             }></input><br></br><br></br>
          Price: <input placeholder='Product price..' name='price' value={edPrice} onChange={
            (ev)=> setEdPrice(ev.target.value)
          } ></input><br></br><br></br>
          <textarea placeholder='Product description..' name='description' rows={4} value={edDescription} onChange={
            (ev)=> setEdDescription(ev.target.value)
          }></textarea><br></br><br></br>
          Category: <input placeholder='Product category..' name='category' value={edCategory} onChange={
            (ev)=> setEdCategory(ev.target.value)
          } ></input><br></br><br></br>
          Image <input placeholder='Image link..' name='image' value={edImage} onChange={
            (ev)=> setEdImage(ev.target.value)
          } ></input><br></br><br></br>
          <button className={!darkm ? "" : "dmode"}  type='submit' onClick={handleSubmit2}>Update item</button>
        </form>
      </div>
      
    </>
  }

  if (!isFocused){ //If the user is not viewing a particular product (all are being viewed), then we show all.
    return <div>
          <div>
    <div id="seofl">  <div className='add-item-btn'>
  <button className={!darkm ? "" : "dmode"}  onClick={()=>{
    setIsAddingItem((isAddingItem)=> !isAddingItem)
  }}>Add new item</button>
  </div>
  <button className={!darkm ? "" : "dmode"} onClick={() => {darkmo()} }>Toggle colour mode</button>
   <input type="text" id="seo" placeholder="Search" onChange={onChangeHandler} /></div>
    <h1 id={!darkm ? "logo": "darklogo"} >Inventory App</h1>
    </div>
    <div id="container">
        

          {filteredInv.map((x) => {return <div className={!darkm ? "items" : "dmodeitems"} onClick={()=> {
            setIsFocused(isFocused => !isFocused) //When a component is clicked, the isFocused variable flips.
            setFocusedItem(x)
            setEdTitle(x.title)
            setEdCategory(x.category)
            setEdDescription(x.description)
            setEdPrice(x.price)
            setEdImage(x.image)
            setEdId(x.id)
          }
            
          }>
          <p><b>{x.title}</b></p>
          <img src={x.image} alt={x.title} />
          <p>Price: £{x.price}</p>
          </div> } )}
    </div></div>;
  }else{ //Here we show just the product that has been clicked on.
    return (<div>
    <h1 id={!darkm ? "logo": "darklogo"} >Inventory App</h1>
      <div id="container">
      <div className='item-container'>
        <div className='button-container'>
          <button className={!darkm ? "" : "dmode"} onClick={() => {darkmo()} }>Toggle colour mode</button>
          <button className={!darkm ? "" : "dmode"}  onClick={()=>{
              setIsFocused(isFocused=> !isFocused)
            }} >Back to all</button>
        </div>
        <h2>{focusedItem.title}</h2>
        <img src={focusedItem.image} alt={focusedItem.title} />
        <p><b>Price</b>: £{focusedItem.price}</p>
        <p><b>Description: </b>{focusedItem.description}</p>
        <p><b>Category: </b>{focusedItem.category}</p>
        <button className={!darkm ? "" : "dmode"}  onClick={() => {delitem(focusedItem.id)
        setIsFocused(!isFocused)
        }}>Delete</button> {/*Here we can add logic for deleting item.*/}
        <button className={!darkm ? "" : "dmode"} onClick={()=>{setIsUpdatingItem((isUpdatingItem)=> !isUpdatingItem);console.log(focusedItem.id)}} >Update</button> {/*Here we can add logic for updating item.*/}

      </div>
      </div>
    </div>)
  }


}
  
export default App;


//Do npm run serv before npm start to run it properly