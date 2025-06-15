export default function Die(props){
    const styles={
        backgroundColor:props.isHeld?"#59E391":"white",
        color:props.isHeld?"white":"black"
    }

  return(
    <button 
        onClick={()=>props.hold(props.id)} 
        style={styles}
    >
    
    {props.value}
    
    </button>
  )
}