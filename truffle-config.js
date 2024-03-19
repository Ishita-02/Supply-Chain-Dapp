const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/abis"),
  networks: {
    develop: {
      port: 7545,
      host: "127.0.0.1",
      network_id: "*"
    }
  }
  
};

// origin contract address: 0x057e1c52C989a3338694Ee04189C040064Fd074A

    // const getLocation = () => {      
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(getCoordinates,  handleError, {enableHighAccuracy: true})
    //     }    
    // }

    // const handleError = () => {
    //     alert("Geolocation API is not supported in your browser. Please enable Geolocation")
    // }
  
    // const getCoordinates = async(position) => {
    //     const accuracy = await position.coords.accuracy
    //     console.log("accuracy: ", accuracy)
    //     const lat  = await position.coords.latitude.toString()
    //     const long = await position.coords.longitude.toString()
    //     console.log(lat)
    //     console.log(long)
    //     setLatitude(lat)
    //     setLongitude(long)
    //     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyA1NTVyRpS9yu9w8Otq1K3r-SwMJMvrhNY`;
    //     console.log(url)
    //     fetch(url)
    //     .then(response => response.json())
    //     .then(data => {
    //         const address = data.results[0].formatted_address
    //         console.log(address) 
    //         setPlace(address)
    //     })     
          
    // }