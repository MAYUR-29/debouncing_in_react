import {useCallback, useState} from "react";

function App() {


  const [search, setSearch] = useState();

  const debounce = (func) =>{
    let timer;
    return function (...args){
      const context = this;
      if(timer) clearTimeout(timer)
      timer = setTimeout(()=>{
        timer = null;
        func.apply(context,args)
      },500)
    }
  }


  // function searchbar(e){
  //     // console.log(e.target.value);
  //     setSearch(e.target.value);

  // }

  const handleChange = (e) =>{
    const value = e.target.value;
    // console.log(value);
    fetch(`https://demo.dataverse.org/api/search?q=${value}`)
    .then(res => res.json())
    .then(json => setSearch(json.data.items));
  }


  const debouncedFunc = useCallback(debounce(handleChange), []);

  return (
    <div className="App">
      <input onChange={debouncedFunc} placeholder="Search" className="search"></input>
      {search?.length > 0 && 
      <div className="auto">
        {search?.map((el, i)=>
          <div key={i}>
            <span>{el.name}</span>
          </div>
        )}

      </div>
      }
    </div>
  );
}

export default App;
