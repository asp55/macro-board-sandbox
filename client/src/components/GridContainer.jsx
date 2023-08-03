export default (props)=>{
  const {rows, columns, preview, style, children} = props;

  return <>

  { preview && <><div className="gridContainer preview column" style={{
    ...style,
    gridTemplateColumns: `repeat(${columns}, var(--gap) 1fr) var(--gap)`,
  }}>
    {(repeat=>{let previewCells = []; for(let i=0; i<repeat; i++) previewCells.push(<div className="previewCell"></div>); return previewCells})((columns*2)+1)}
    </div>
    <div className="gridContainer preview row" style={{
    ...style,
    gridTemplateRows: `repeat(${rows}, var(--gap) 1fr) var(--gap)`,
  }}>
    {(repeat=>{let previewCells = []; for(let i=0; i<repeat; i++) previewCells.push(<div className="previewCell"></div>); return previewCells})((rows*2)+1)}
    </div>
    </>
  }
  <div className="gridContainer" style={{
    ...style,
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
  }}>
    {children}
  </div>
  </>

}