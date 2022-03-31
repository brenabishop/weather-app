import './App.css';
import React, { useEffect, useState } from "react";

function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [streetAddress, setStreetAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zipcode, setZipcode] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    console.log("Latitude is:", lat)
    console.log("Longitude is:", long)
  }, [lat, long]);

  const handleSubmit= (e) => {
    e.preventDefault();
    
    let benchmark = 'Public_AR_Current';
    let format = 'json';
    
    fetch(`https://geocoding.geo.census.gov/geocoder/locations/address?street=${streetAddress}&city=${city}&state=${state}&zip=${zipcode}&benchmark=${benchmark}&format=${format}`)
       .then(res => res.json())
       .then(result =>{console.log(result)})
  }

  return (
    <div className="App">
      <form onSubmit={e => {handleSubmit(e)}}>
        <label>
          Address Form
        </label>
        <br />
        <label>
          Street Address:
          <input
          name='streetAddress'
          type='text'
          onChange={e => setStreetAddress(e.target.value)}
          />
          {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
        </label>
        <br />
        <label>
          City:
          <input
          name='city'
          type='text'
          onChange={e => setCity(e.target.value)}
          />
          {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
        </label>
        <br />
        <label>
          State:
          <input
          name='state'
          type='text'
          onChange={e => setState(e.target.value)}
          />
          {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
        </label>
        <br />
        <label>
          Zipcode:
          <input
          name='zipcode'
          type='text'
          onChange={e => setZipcode(e.target.value)}
          />
          {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
        </label>
        <br />
        <input 
          className='submitButton'
          type="submit" 
          value="Submit" 
        />
      </form>
    </div>
  );
}

export default App;
