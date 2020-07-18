import React from 'react';



class Zomato extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            food : []
        }
   this.renderCard =  this.renderCard.bind(this);
    }

    componentDidMount(){
        fetch('https://developers.zomato.com/api/v2.1/search?lat=28.6304&lon=77.2177&count=40&apikey=23a6a67ab0ad1c0f5338f314dc072aad')
        .then(res=> res.json())
        .then(res => {
          var h = [];
          for(var i =0;i<20;i++){
              h.push(res.restaurants[i]);
          }
            
            this.setState({
                food : h
            })

            console.log(res.restaurants[0].restaurant);
        })
    }
    
     renderCard = (food , index) => {
      var maps = (lat,long) => {
          return(
            "https://www.google.com/maps/search/?api=1&query=" + lat + "," + long
          );
      } 
        return(
            <div className="card justify-content-center pl-1 pr-1 mt-3 mb-3 col-12 col-lg-4" style={{
                width : 500
            }} key={index}>
                    <img className="card-img-top" src={food.restaurant.featured_image} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{food.restaurant.name}</h5>
                     <p className="card-text">Cuisines : {food.restaurant.cuisines} </p>
                     
                    </div>
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item">Timings : {food.restaurant.timings}</li>
                    <li className="list-group-item">Total Rating : {food.restaurant.user_rating.aggregate_rating}</li>
        <li className="list-group-item">Average Price : Rs. {food.restaurant.average_cost_for_two}</li>
                   
                    </ul>
                    <div className="card-body">
                    <a href={food.restaurant.url} className="card-link btn btn-danger" target="_blank">Zomato</a>
                    <a href={maps(food.restaurant.location.latitude,food.restaurant.location.longitude)} className="card-link btn btn-success" target="_blank">Map</a>
    </div>
    </div>
        );
}
 
    render(){

       
     
        return(
            <div className="container">
            
         <div className="jumbotron" style={{
             backgroundColor : "red",
             color : "white"
         }}>
             <h1 className="display-5">
                 Zomato APP
             </h1>
             <p className="lead">
                 Made By : Devansh Goswami
             </p>
         </div>
         <div className="row row-content">
         {this.state.food.map(this.renderCard)}
         </div>
            
   
        </div>
        );
        
          
    }
}

export default Zomato;
