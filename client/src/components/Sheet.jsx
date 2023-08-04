import GridContainer from "./GridContainer";
import Shortcut from "./Shortcut";

export default (props)=>{
  const defaults = {
    rows: 1,
    columns: 1,
    edit: false
  }

  const {name, key, rows, columns, shortcuts, edit} = {...defaults, ...props};
  return (
    <div className="sheet">
      <GridContainer rows={rows} columns={columns} preview={edit}>
        {shortcuts.map((shortcut, i)=><Shortcut key={`${key}_shortcut${i}`} {...shortcut}>{JSON.stringify(shortcut)}</Shortcut>)}
      </GridContainer>
      
    </div>
  )
}