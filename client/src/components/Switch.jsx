import "./Switch.scss"
import {useState, useRef} from "react";

export default (props)=>{

  const [keylisteners, setKeyListeners] = useState({});
  const checkboxRef = useRef(null);

  const {style, id, children, ...rest} = props;


  const focusHandler = ()=>{
    console.log("Focused");
    setKeyListeners({
      onKeyDown: (e)=>{
        if(["Space","Enter"].includes(e.code)) checkboxRef.current.click();

        console.log("Key Down on Toggle", e)
      }
    });
  }
  const blurHandler = ()=>{
    console.log("Blurred");
    setKeyListeners({});
  }

  const changeHandler = (e)=>{
    console.log("Change", e)
  }


  return (
    <div className="switchContainer" style={style} onFocus={focusHandler} onBlur={blurHandler} {...keylisteners}>
      <label className="switch" tabIndex={0}>
        <input ref={checkboxRef} type="checkbox" id={id} {...{onChange:changeHandler, ...rest}}/>
        <span className="slider"></span>
      </label>
      <label htmlFor={id}>{children}</label>
    </div>
  )
}