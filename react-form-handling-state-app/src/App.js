
import { useState } from 'react'

const App = () => {

const [username,setUseranme] = useState('');

const handleSubmit = (e) =>{
  e.preventDefault();
  console.log(username);
  setUseranme('');
}
const handleChange = (e) =>{
  setUseranme(e.target.value);
}


  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={username} onChange={handleChange}/>
      <button type='Submit'>Submit</button>
    </form>
  )
}

export default App