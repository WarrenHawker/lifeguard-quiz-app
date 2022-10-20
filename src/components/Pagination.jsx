export default function Pagination(props) {
  let prevStyle = {
    visibility: 'visible'
  }
  let nextStyle = {
    visibility: 'visible'
  }
  let numStyle = {
    visibility: 'visible'
  }

  if(props.totalPages == 1) {
    prevStyle.visibility = 'hidden'
    nextStyle.visibility = 'hidden'
    numStyle.visibility = 'hidden'
  } else if(props.currentPage == 1) {
    prevStyle.visibility = 'hidden'
    nextStyle.visibility = 'visible'
  } else if(props.currentPage == props.totalPages) {
    prevStyle.visibility = 'visible'
    nextStyle.visibility = 'hidden'
  }
  return (
    <div className="pagination">    
      <button id="btn-prev" onClick={props.changePage} style={prevStyle} className="btn btn-secondary">Prev page</button>    
      <h3 style={numStyle}>Page {props.currentPage} of {props.totalPages}</h3>
      <button id="btn-next" onClick={props.changePage} style={nextStyle} className="btn btn-secondary">Next page</button>
    </div> 
  )
}