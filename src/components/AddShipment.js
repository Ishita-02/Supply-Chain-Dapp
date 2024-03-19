import React, { useEffect, useState } from 'react';
import Web3 from "web3"
import Origin from "../abis/Origin.json"

const AddShipment = ({addShipment, shipType, onShipAdd}) => {

    useEffect(() => { 
        const loadWeb3 = async () => {
            if(window.ethereum) {
              window.web3 = new Web3(window.ethereum)
              await window.ethereum.enable()
            } if (window.web3) {
              window.web3 = new Web3(window.web3.currentProvider)
            } else {
              window.alert("Please use Metamask!")
            }
        }
        loadWeb3()}, [])

    useEffect(() => { 
        const loadBlockchainData = async () => {
            const web3 = window.web3
            //Load account
            const accounts = await web3.eth.getAccounts()
            setAccount(accounts[0])
            console.log(Origin.abi)
            const networkId = await web3.eth.net.getId()
            // console.log(networkId)
            const networkData = Origin.networks[networkId]
            // console.log(networkData)
            if (networkData) {
                //Fetch contract
                const contract = new web3.eth.Contract(Origin.abi, networkData.address)
                const productCount = await contract.methods.productCount().call()
                const shipmentCount = await contract.methods.shipmentCount().call()
                const orderCount = await contract.methods.orderCount().call()
                setShipmentCount(shipmentCount)
                //Load products
                for (var i = 1; i <= productCount; i++) {
                    const newProduct = await contract.methods.products(i).call()
                    setProducts(products =>([...products, newProduct]))
                }
                for (var i = 1; i <= orderCount; i++) {
                    const neworder = await contract.methods.orders(i).call()
                    setOrders(orders =>([...orders, neworder]))
                }
                }
            else { 
                window.alert("Origin contract is not deployed to the detected network")
            }
        }
    loadBlockchainData()}, [])

    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [account, setAccount] = useState([])        
        
    const [date, setDate] = useState("")
    const [d, setD] = useState(true)   
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [place, setPlace] = useState()
    const [product, setProduct] = useState("")
    const [process, setProcess] = useState("")
    const [shipmentCount, setShipmentCount] = useState([])
    
    const orderName = orders.filter(obj=> obj.id.includes(product)).map(order => order.name)

    useEffect(() => { 
        getDate()
    }, [d])

    const getDate = async () => {
        const today = new Date()
        const d = await today.getDate() +'-'+ (today.getMonth()+1) +'-'+ today.getFullYear()
        const t = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const date = await d + " " + t
        setDate(date)
    }

  
    const onSubmit = async (e) => {
        e.preventDefault();
        setD(!d);
    
        const lat = "30.3165";
        const long = "78.0322";

        const setLatlong = JSON.stringify({ latitude: lat, longitude: long });
    
        // Get the shipment location from the input box
        const shipmentLocation = e.target.elements.shipmentLocation.value;
    
        // Call the addShipment function with the shipment location
        await addShipment({ shipType, place: shipmentLocation, latlong: setLatlong, date, account, product, process });
    }
    
    return (
        <div className='center'>
            <form className="ship-form" onSubmit={onSubmit}>
                <div className="form-header">
                    <h2>{shipType === "Shipment Sent" ? "Send Shipment" : "Receive Shipment"}</h2>
                    <button className="btn form-close" style={{ background: "#e63946", fontSize: "12px" }} onClick={onShipAdd}>X</button>
                </div>
                <div className="product-center-form">
                    <div className="form-inputs">
                        <label className='order-label'>Select Order</label>
                        <select
                            className="order-product" required
                            value={product} onChange={(e) => setProduct(e.target.value)}
                        >
                            <option value="" disabled selected hidden></option>
                            {orders.map(order => {
                                return <option value={order.id}>ORDER # {order.id}: {order.name} </option>
                            })}
                        </select>
                    </div>
                    <div className="form-inputs">
                        <label className='order-label'>Select Production Process</label>
                        <select
                            className="order-product" required
                            value={process} onChange={(e) => setProcess(e.target.value)}
                        >
                            <option value="" disabled selected hidden></option>
                            {product !== "" ? products.filter(obj => obj.name.includes(orderName)).map(product => product.process).map(a => JSON.parse(a).map(process =>
                                <option value={process}>{process} </option>
                            )) : null}
                        </select>
                    </div>
                    {/* Add input box for shipment location */}
                    <div className="form-inputs">
                        <label className='order-label'>Shipment Location</label>
                        <input
                            className="order-product"
                            type="text"
                            name="shipmentLocation"
                            placeholder="Enter shipment location"
                            required
                        />
                    </div>
                    <button className="btn order-input-btn" type="submit">
                        {shipType === "Shipment Sent" ? "Send" : "Receive"}
                    </button>
                </div>
            </form>
        </div>
    )
    
}

export default AddShipment
