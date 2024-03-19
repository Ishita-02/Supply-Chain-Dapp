import React, { useState, useEffect} from 'react'
import Web3 from "web3"
import Origin from "../../abis/Origin.json"
import AddOrder from '../AddOrder'
import Order from '../Order'
import Sidebar from '../Sidebar'
import Shipment from '../Shipment'
import AddShipment from '../AddShipment'
import Button from "../FormButton"

const Dashboard = () => {

    useEffect(() => { 
        const loadWeb3 = async () => {
          //Load ethereum or web3 object on the browser
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
                try {
                    const web3 = window.web3;
                    if (!web3) {
                        throw new Error("Web3 not found. Please make sure MetaMask or another Ethereum provider is installed.");
                    }
        
                    const accounts = await web3.eth.getAccounts();
                    setAccount(accounts[0]);
        
                    const networkId = await web3.eth.net.getId();
                    const networkData = Origin.networks[networkId];
        
                    if (networkData) {
                        const contract = new web3.eth.Contract(Origin.abi, networkData.address);
                        setContract(contract);
        
                        const orderCount = await contract.methods.orderCount().call();
                        const loadedOrders = [];
        
                        for (let i = 1; i <= orderCount; i++) {
                            const newOrder = await contract.methods.orders(i).call();
                            loadedOrders.push(newOrder);
                        }
        
                        setOrder(loadedOrders);
        
                        const shipmentCount = await contract.methods.shipmentCount().call();
                        const loadedShipments = [];
                        const loadedLatlong = [];
        
                        for (let i = 1; i <= shipmentCount; i++) {
                            const newShipment = await contract.methods.shipments(i).call();
                            loadedShipments.push(newShipment);
                            try {
                                const parsedLatlong = JSON.parse(newShipment.latlong);
                                loadedLatlong.push(parsedLatlong);
                            } catch (error) {
                                console.error("Error parsing latlong JSON:", error);
                                // Log the error and continue to the next iteration
                                continue;
                            }
                        }
        
                        setShipment(loadedShipments);
                        setLatlong(loadedLatlong);
                    } else { 
                        window.alert("Origin contract is not deployed to the detected network");
                    }
                } catch (error) {
                    console.error("Error loading blockchain data:", error.message);
                    // Add error handling logic here, such as displaying an error message to the user
                }
            };
        
            loadBlockchainData();
        }, []);
        
        
        
    
    const [contract, setContract] = useState([])
    const [account, setAccount] = useState([])        
    const [showCreateOrder, setShowCreateOrder] = useState(false)
    const [showCreateShip, setShowCreateShip] = useState(false)
    const [orders, setOrder] = useState([])
    const [shipments, setShipment] = useState([])
    const [shipType, setShipType] = useState("")
    const [latlong, setLatlong] = useState([])
    
    const newShipment = (shipments.map(t1 => ({...t1, ...latlong.find(t2 => t2.id === t1.id)})))

    //Add Order
    const addOrder = ({name, quantity, unit, date}) => {
        contract.methods.addOrder(name, quantity, unit, date).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.reload()
          })
    }

    //Add Shipment
    const addShipment = ({shipType, place, latlong, date, product, process}) => {
        contract.methods.addShipment(shipType, place, latlong, date, product, process).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.reload()
          })
    }

    return (
        <>
        <div className="main-container">
        <Sidebar/>
        <header className="dashheader">
            <div className="shipment-btns">
                <Button 
                onClick={() => {setShowCreateShip(!showCreateShip); setShipType("Shipment Sent")}}
                color="#bc6c25"
                text="Send Shipment"
                />
                <Button 
                onClick={() => {setShowCreateShip(!showCreateShip); setShipType("Shipment Received")}}
                color="#bc6c25"
                text="Receive Shipment"
                />
            </div>    
                <Button className="btn" 
                onClick= {() => {setShowCreateOrder(!showCreateOrder)}}
                color= {showCreateOrder ? "#f2f2f2" : "#283618"}
                text= {showCreateOrder ? "": <>Create Order</>}
                />
        </header>
            {showCreateOrder && <AddOrder addOrder={addOrder}
            onAdd= {() => {setShowCreateOrder(!showCreateOrder)}} />}
            {showCreateShip && <AddShipment addShipment={addShipment}
            shipType={shipType} onShipAdd= {() => {setShowCreateShip(!showCreateShip)}} />}
        <Order orders={orders} />
        <Shipment shipments = {newShipment} orders={orders} />
        </div>
        </>
    )
}

export default Dashboard;