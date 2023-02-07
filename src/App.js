import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios'; 

function App() {
  const[options,setOptions]=useState([])
  const [to,setTo]=useState("en");
  const [from,setFrom]=useState("en");
  const [input,setInput]=useState("");
  const [output,setOutput]=useState("");

  const params=new URLSearchParams();
  params.append('q',input);
  params.append('source',from);
  params.append('target',to);
  params.append('api_key','xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

  const translate =()=>{
    axios.post('https://libretranslate.de/translate',params,
    {
      headers:{
    'accept':'application/json',
    'Content-Type':'application/x-www-form-urlencoded'
  },
  }).then(res=>{
    //console.log(res);
    setOutput(res.data.translatedText)
  })
  }


  useEffect(()=>{
    axios.get('https://libretranslate.com/languages',
    {headers:{'accept':'application/json'}}).then(res=>{
      //console.log(res);
      setOptions(res.data);
    })
  },[])

  //curl -X 'GET' ''-H 'accept: '

  return (
    <div className="App">
      <nav>
        <img src="logo.png" width={'50px'} alt="" />
      <h1>TransLator</h1>
      </nav>
      <div className='Lang'>
        <div className="fromlang">
        <h3>From ({from}):</h3>
        <select onChange={e=>setFrom(e.target.value)}>
        {options.map(opt=><option key={opt.code} value={opt.code}>{opt.name}</option>)}
        </select>
        </div>
        <div className="tolang">
        <h3>To({to}):</h3>
        <select onChange={e=>setTo(e.target.value)}>
        {options.map(opt=><option key={opt.code} value={opt.code}>{opt.name}</option>)}
        </select>
        </div>
      </div>
      <div className="container">
      <div className='inputArea'>
        <h2>InPut:</h2>
        <textarea  cols="50" rows="10" placeholder='Enter Input' onInput={(e)=>setInput(e.target.value)}></textarea>
      </div>
      <div className='OutputArea'>
        <h2>OutPut:</h2>
        <textarea  cols="50" rows="10" placeholder='Output will Be Displayed Here' defaultValue={output}></textarea>
      </div>
      </div>
      <div>
        <button onClick={e=>translate()} className='btn'>Translate</button>
      </div>
    </div>
  );
}

export default App;
