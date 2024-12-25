import { useCallback, useState , useEffect , useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // Here we need some feature so that the page get loaded then password variable get allocated to some value 

  // Here since the passwordGenerator function will be called multiple times so we need 
  // any hook to optimize this type of functions 
  // This hook is called  ' useCallback ' -- It caches a function definition between re-renders 
  // SYNTAX - useCallback( fn , dependencies ) 
  // Dependencies is the array containing all the variables which we say dependencies   
  // It also re-runs the function when any dependecies changes


  

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (numAllowed) {
      str += "00000111112222233333444445555566666777778888899999"
    }

    if (charAllowed) {
      str += "%%%%%%!!!!!#####&&&&&+++++~~~~~$$$$$@@@@@"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])


  // useEffect hook 
  // SYNTAX -- useEffect( fn , [....] ) 
  // Whenever we want to do something whenever any changes occur in any variables or functions the useEffect is used. 
  // So whenever changes occur in length or in numAllowed or in charAllowed or even in passwordGenerator function then we will call passwordGenerator function.

  useEffect( ()=>{
    passwordGenerator()
  } , [ length , numAllowed , charAllowed , passwordGenerator ] )

  // In above if we will not use useCallback for passwordGenerator function then 
  // passwordGenerator function will be called infinite times because as we call pg function then again 
  // our useEffect will call pg function due to which useEffect again call pg and it will happen again and again.
  // To avoid it we can also remove pg from dependency of useEffect . 
  // So it is for re-run and Memoization 

  // Copy to clip board function 
  // useRef HOOK 
  // The useRef Hook allows you to persist values between renders.
  // It can be used to store a mutable value that does not cause a re-render when updated.
  // It can be used to access a DOM element directly.

  const passwordRef = useRef(null)  

  const copyToClipboard = useCallback( ()=>{
    // The question mark below shows that we are doing optional select means if passwordRef.current is empty then we do not select any thing 
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password) 
  } , [ password] ) 



  return (
    <>
      <div className=' w-full max-w-md mx-auto
    shadow-md-rounded-lg  px-4 my-8 text-orange-500 bg-gray-800 '>
        <p className='text-md my-2'>Password Generator</p>
        <div className=' flex'>
          <input
            type="text"
            value={password}
            className='outline-none text-white w-full mb-2 py-1 px-3 bg-violet-800 rounded-lg'
            placeholder='Password'
            readOnly
            ref = {passwordRef}
          />
          <button
            onClick={ copyToClipboard }
            className="outline-none bg-violet-800  text-white mx-1 mb-2 px-3 py-0.5 shrink-0 ">copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label> Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}

            />
            <label>numberInput</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}

            />
            <label>characterInput</label>
          </div>


        </div>

      </div>
    </>
  )
}

export default App
