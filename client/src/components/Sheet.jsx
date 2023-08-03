import GridContainer from "./GridContainer";
import Shortcut from "./Shortcut";

export default (props)=>{
  const defaults = {
    rows: 1,
    columns: 1
  }

  const {name, rows, columns, shortcuts} = {...defaults, ...props};
  return (
    <div className="sheet">
      <GridContainer preview rows={rows} columns={columns}>
        {shortcuts.map(shortcut=><Shortcut {...shortcut}>{JSON.stringify(shortcut)}</Shortcut>)}
      </GridContainer>
      
    </div>
  )
}