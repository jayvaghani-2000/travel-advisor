import React,{useState, useEffect} from "react";
import Header from "./Component/Header/Header";
import Map from "./Component/Map/Map";
import List from "./Component/List/List";
import { getPlacesData } from "./Api";

import { CssBaseline,Grid } from "@material-ui/core";


const App = () => {

  const [place,setPlace]=useState([])
  const [coordinates,setCoordinates]=useState({})
  const [bounds,setBounds]=useState(null)
  const [childClicked,setChildClicked] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const [rating,setRating] = useState('')
  const [type,setType] = useState('restaurants')


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
      setCoordinates({lat:position.coords.latitude,lng:position.coords.longitude})
    });
  },[])

  useEffect(()=>{
    if(bounds){
      setIsLoading(true)
      getPlacesData(type,bounds).then((data)=>{
        setPlace(data?.filter(data=>data.name ))
        setIsLoading(false)
      })}
  },[bounds,type])
 
  return ( 
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{width:"100%"}}>
        <Grid item xs={12} md={4}>
          <List 
            place={place} 
            childClicked={childClicked} 
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
          places={place}
          setBounds={setBounds}
          setCoordinates={setCoordinates}
          coordinates={coordinates}
          setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
