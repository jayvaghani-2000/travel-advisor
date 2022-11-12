import React,{ useState,useEffect,createRef } from 'react'
import { Typography,Select,MenuItem,CircularProgress,Grid,InputLabel,FormControl } from '@material-ui/core'
import useStyle from './style'
import PlaceDetails from '../PlaceDetails/PlaceDetails'

const List = ({place,childClicked,isLoading,type,setType,rating,setRating}) => {
  const classes = useStyle()
  const [elRefs,setElRefs] = useState([])

  useEffect(()=>{
    const refs = Array(place?.length).fill().map((_,index)=>elRefs[index]||createRef())
    setElRefs(refs)
  },[place])

  return (
    <div className={classes.container}>
      <Typography variant='h4'>Restaurants, Hotels and Attraction</Typography>
      {isLoading?<CircularProgress size='5rem'/>:<><FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e)=>{setType(e.target.value)}}>
          <MenuItem value='restaurants'>Restaurants</MenuItem>
          <MenuItem value='hotels'>Hotels</MenuItem>
          <MenuItem value='attractions'>Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e)=>{setRating(e.target.value)}}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {place?.map((place,index)=>{
          return (<Grid ref={elRefs[index]} item key={index} xs={12}>
            <PlaceDetails place={place} selected={Number(childClicked)===index} refProp={elRefs[index]}/>
          </Grid>)
        })}
      </Grid></>}
    </div>
  )
}

export default List