import Sheet from "./Sheet";

import {useState} from 'react';
import Switch from "./Switch";

const Main = (props) => {


  const defaults = {
    sheets: [],
  }

  const {sheets, ...rest } = {...defaults, ...props};

  const [edit, setEdit] = useState(true);
  const [activeSheet, updateSheet] = useState(0);

  const renderSheet = sheet=><Sheet 
       key={`sheet_${sheet.id}`}
       name={sheet.display_name}
       rows={sheet.rows}
       columns={sheet.columns}
       shortcuts={sheet.shortcuts}
       edit={edit}
       {...rest}
      />

  let _sheet;

  let _activeSheet = activeSheet;
  if(_activeSheet >= sheets.length) {
    _activeSheet = sheets.length-1;
    updateSheet(_activeSheet);
  }
  if(sheets.length>0 && _activeSheet<0) {
    _activeSheet=0;
    updateSheet(_activeSheet);
  }
  if(_activeSheet < sheets.length && _activeSheet >= 0) {
    console.log(sheets[_activeSheet]);
    _sheet = renderSheet(sheets[_activeSheet]);
  }

  const toggleEdit=()=>{
    console.log(edit);
    setEdit(!edit);
  }
  
  return (
    <>
      {_sheet}
      <Switch key="editSwitch" checked={edit} onChange={toggleEdit} style={{position: "absolute", bottom: "1rem", right: "1rem"}} id="editmode">Edit</Switch>
    </>
  )
};

export default Main;