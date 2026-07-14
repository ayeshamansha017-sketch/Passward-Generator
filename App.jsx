import { useCallback, useState ,useEffect ,useRef} from 'react'

//import './App.css'

function App() {
  const [lenght, setLenght] = useState(8)
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [passward, setPassward] = useState('')

  //Ref hook
const passwardRef = useRef(null);

  const passwardGenerator = useCallback (() => 
  {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$'
    if (number) str+= '0123456789'
    if (character) str+= '@#$[]{}$%^&*()_+~`|:;<>?,./-='
    for(let i = 1; i <=lenght; i++)  
    {
      let char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
    }
    setPassward(pass)

  },[ lenght,number,character,setPassward])
  const copyPasswardToClipboard = useCallback(() => {
    passwardRef.current.select();
    passwardRef.current.setSelectionRange(0, 99999); // For mobile devices
    window.navigator.clipboard.writeText(passward)
  }, [passward]);

  useEffect(() => {
    passwardGenerator();
  }, [lenght, number, character, passwardGenerator]);

  return (
    <>
       
       <div className=' w-full max-w-xl mx-auto  mt-15 shadow-md rounded-lg px-4 py-6 mb-4 bg-pink-50 text-white text-centre'> 
    
          <h1 className = "text-2xl font-bold text-orange-500 text-center mb-4" > passward Generator</h1>
         <div className = 'flex-shadow rounded-lg overflow-hiden mb-4 text-center'> 
          <input 
           type= "text"
          value ={passward}
          className=' text-center bg-white  text-orange-800 text-2xl font-bold py-4 px-6'
          placeholder='passward'
          readonly
          ref = {passwardRef}
             />
             <button 
             onClick = {copyPasswardToClipboard}
             className = 'outline-none bg-blue-700 text-white font-bold py-5 px-6 '>Copy</button>
              </div>    
              <div className = 'flex text-sm gap-x-2 items-center justify-center mb-4 py-4  text-2xl font-bold text-orange-500'>
              <div className = 'flex items-center gap-x-1'>
               < input
               type = "range" 
               min = {6}
               max = {20}
               value = {lenght}
               className = 'cursor-pointer'
               onChange = {(e) => setLenght(e.target.value)}
               />
               <label >  lenght = {lenght}</label> 
                </div> 
                <div className = 'flex items-center gap-x-1'>
                  <input
                    type = "checkbox"
                    defaultChecked = {number}
                    id = "number"
                    onChange = {( ) => {
                      setNumber((prev) => !prev);
                    }}
                    />
                    <label htmlFor="number">Include Numbers</label>

                </div>
                <div className = 'flex items-center gap-x-1'>
                  <input
                    type = "checkbox"
                    defaultChecked = {character}
                    id = "character"
                    onChange = {( ) => {
                      setCharacter((prev) => !prev);
                    }}
                    />
                    <label htmlFor="character">Include  Characters</label>
                </div>
         </div>
       </div>
    </>
  )
}

export default App
