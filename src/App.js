import React, { Component } from 'react'
  import '../styles/App.css'
 
  
 const  MovieBox=({title,backgroundPath,onHandleChange})=> (
  <div className="movie" >
          <span className="help-span">
         </span>
          <span className="span-header">
           <h3 className="movie-header" >{title}</h3>
           </span>
           <img src={"https://image.tmdb.org/t/p/original"+backgroundPath}/>
        <button onClick={onHandleChange} className="movie-btn">Buy</button>
     
    <div >

    </div>
   </div>
);
 class App extends Component { 

 state={
   movies:[],
   MoviesCost:[],
  currentChose:null,
  NumberofChosenTickets:0 
  };
 costChange=(id)=>{ 
  let movie=this.state.MoviesCost[id];
   this.setState({currentChose:movie});
    
  }
 onSubmitHandle=()=>{
   let NumberofChosenTickets=this.state.NumberofChosenTickets;
   this.setState((state)=>({NumberofChosenTickets:0}));
    this.state.currentChose.seatsLeft=this.state.currentChose.seatsLeft-NumberofChosenTickets;
    alert(`you have ordered:${NumberofChosenTickets} with total cost:${NumberofChosenTickets*150} have a nice day`);
  }

 increase=()=>{
  this.setState({
    NumberofChosenTickets:this.state.NumberofChosenTickets+1});
 
 
  }
  componentDidMount(){
    fetch('https://api.themoviedb.org/3/trending/all/day?api_key=5c64a97f1851e0487355db16409d3286')
    .then(res=>res.json())
    .then((data)=>(
      
     setTimeout(()=> { 
 
      this.setState(state=>({movies: data.results})) 
      let MoviesCost=this.state.MoviesCost;
      for(let i=0;i<this.state.movies.length;i++)
      {
         MoviesCost.push({
          cost:150,
          seatsLeft:50, 
          name:this.state.movies[i].title||this.state.movies[i].original_name});
  
        }
      this.setState((state)=>({MoviesCost:MoviesCost})); 
    }),10000)
      )
   
     .catch(err=>console.log(err))
  } 
  
  render() {
   
  return (
    <div className="app">  
        <div className="movies">  {
        this.state.movies.map((movie,index)=>
        ( <MovieBox
        index={index}
       onHandleChange={()=>(this.costChange(index))}
      key={index}
      title={movie.title||movie.original_name}
       backgroundPath={movie.backdrop_path}
        
      />
 
  ))
      }
  
      </div>  
          <div className="wraper"> 
            { this.state.currentChose&&<div className="modal" 
            >
         
       <div className="modal-box">
                  <div className="modal-inside">  
           
                 <div className="amount-of-tickets">
                  <span className="span-increase"
                   onClick={this.increase}
                   > + </span>                 
                  <span className="cost">{this.state.currentChose.cost*this.state.NumberofChosenTickets} </span>
                 <span className="span-decrease"  onClick={()=>{  
   this.state.NumberofChosenTickets<=0?this.setState({NumberofChosenTickets:0}):
   this.setState({NumberofChosenTickets:this.state.NumberofChosenTickets-1})
                 }} >-</span>                 
           </div>
              <h2 className="modal-text">
             {
               this.state.currentChose.name+":"+
               (this.state.currentChose.seatsLeft-this.state.NumberofChosenTickets) 
               }
              
              <div> 
                  <button className="subbmit-btn" onClick={this.onSubmitHandle}>Subbmit</button>
                  <button className="close-btn" onClick={()=>(this.setState({currentChose:null}))}>Close</button>
       </div>
              </h2>  
     </div>
     </div>
       </div> }
     
         </div>
        </div>
    )
  }
}

export default App;


















 






// Продолжение верха
// class Hello extends
// React.Component {
// state={
// TotalPrice:400,
// TicketNumber:0,
// seatsnNumber:50
// };   
// onHandleClick=()=>{
// this.setState((state)=>({
// seatsnNumber:(this.state.seatsnNumber-this.state.TicketNumber)
// }));
// this.setState((state)=>({
// TicketNumber:0
// }))
// }
// onDecrease=()=>{
// this.setState( (state)=>({TicketNumber:this.state.TicketNumber-1}))

// }

// onIncrease=()=>{
// this.setState( (state)=>({TicketNumber:this.state.TicketNumber+1}))
// }
// render() {
//     return <div className="app">
//       <div className="wrapper"> 
//       <div class="total-amount">
//        <span onClick={
//        this.onIncrease
//        } >+</span>
//        <span>   {this.state.TotalPrice*this.state.TicketNumber}
//      </span>
//        <span onClick={this.onDecrease}>-</span>
//        </div>
//     <button 
//    onClick={this.onHandleClick} className="btn">Click</button>
// {this.state.seatsnNumber}
// </div></div>;
//   }
// }

// ReactDOM.render(
//   <Hello name="World" />,
//   document.getElementById('container')
// );



