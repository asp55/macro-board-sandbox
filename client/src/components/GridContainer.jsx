export default (props)=>{
  const {rows, columns, preview, style, children} = props;

  return <>

  { preview && <><div key="previewColumns" className="gridContainer preview column" style={{
    ...style,
    gridTemplateColumns: `repeat(${columns}, var(--gap) 1fr) var(--gap)`,
  }}>
    {(repeat=>{let previewCells = []; for(let i=0; i<repeat; i++) previewCells.push(<div key={`previewColumnn${i}`} className="previewCell"></div>); return previewCells})((columns*2)+1)}
    </div>
    <div key="previewRows" className="gridContainer preview row" style={{
    ...style,
    gridTemplateRows: `repeat(${rows}, var(--gap) 1fr) var(--gap)`,
  }}>
    {(repeat=>{let previewCells = []; for(let i=0; i<repeat; i++) previewCells.push(<div key={`previewRow${i}`} className="previewCell"></div>); return previewCells})((rows*2)+1)}
    </div>
    </>
  }
  <div key="grid" className="gridContainer" style={{
    ...style,
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
  }}>
    {children}
  </div>
  </>

}