
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
const App = () => {
  const [length,setLength] = useState(8)
const [number,setNumber] = useState(false);
const [character,setCharacter] = useState(false);
const [password,setPassword] = useState("");
//  userref
const passwordref = useRef(null);
const copyPasswordClipBoard=useCallback(()=>{
  passwordref.current?.select()
  window.navigator.clipboard.writeText(password)
  },[password])

const passwordGenerator=useCallback(()=>{
  let pass=""
let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
if(number)str+="0123456789";
if(character)str+="!@#$%^&*()_+=-{}[]|:;<>,.?/~`";
for(let i=0;i<length;i++){
pass+=str[Math.floor(Math.random()*str.length)];
}
setPassword(pass);
},[length,number,character,setPassword])
useEffect(()=>{
  passwordGenerator();
},[length,number,character,passwordGenerator])
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-800">
      <h1 className="text-white text-center text-xl p-2">Password Generator</h1>
      <div className="flex justify-center shadow rounded-lg overflow-hidden mb-4">
      <input type="text" value={password} className="outline-none w-full py-2 px-3" placeholder="Password" readOnly ref={passwordref} />
      <button className="outline-none bg-blue-700 text-white px-3 py-1 shrink-0" onClick={copyPasswordClipBoard}>Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
      <div className="flex justify-center items-center gap-x-1">
        <input type="range" min={6} max={100} value={length} className="cursor-pointer" onChange={(e)=>{setLength(e.target.value)}} />
        <label className="flex text-xl">length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox" defaultChecked={number} id="numberInput" onChange={()=>{setNumber((prev)=>!prev)}} />
        <label htmlFor="">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox" defaultChecked={character} id="characterInput" onChange={()=>{setCharacter((prev)=>!prev)}} />
        <label htmlFor="">Character</label>
      </div>
      </div>


    </div>
  );
};

export default App;
