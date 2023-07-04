import React from 'react'

function About(props) {
  const divStyle = {
    margin: "1em 0",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"


  }
  const infoLinkStyle = {
    textDecoration:"underline", 
    color:"inherit",
    letterSpacing: "1px"

  }
  const h1Style = {
    textAlign:"center", 
    fontSize:"1.7em",
    fontFamily: " sans-serif"
  }
  return (
    <div className='container'>
      {/* <EditModal/> */}
      <h1 style={h1Style}>Developed By <strong style={{color: '#007BFF '}}>Sufyan Siddiqui</strong> </h1>
      <div className={`sub-container bg-secondary-${props.theme}`}  style={{ margin:"2em auto", maxWidth:"50em"}}>
        <h3 style={{fontSize:"1.4em", marginBottom:"1em "}}>PERSONAL INFO</h3>
        <div style={divStyle}>
          <a className='infoLinks' style={infoLinkStyle} href="mailto:sufyansiddiqui098@gmail.com">
          <i className="fa-solid fa-at"></i>
          <i style={{marginLeft:".5em"}}>sufyansiddiqui098@gmail.com</i>
          </a>
        </div>

        <div style={divStyle}>
          <a className='infoLinks' style={infoLinkStyle} href="https://github.com/Sufyan-Siddiqui098" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github"></i>
          <i style={{marginLeft:".5em"}}>Sufyan-Siddiqui098</i>
          </a>
        </div>

        <div style={divStyle}>
          <a className='infoLinks' style={infoLinkStyle} href="tel:03431297671">
          <i className="fa-solid fa-mobile-screen-button"></i>
          <i style={{marginLeft:".5em"}} >0343-1297671</i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default About