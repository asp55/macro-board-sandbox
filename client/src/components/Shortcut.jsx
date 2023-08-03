export default (props)=>{
  const {name, action, icon, children, ...rest} = props;
  return (
<div className="shortcut" {...rest}>{children}</div>
  )
}