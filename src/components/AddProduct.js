import React, { useState, useEffect } from 'react'
import * as AiIcons from 'react-icons/ai';
import Web3 from 'web3';
import Origin from '../abis/Origin.json'


const AddProduct = ({ addProduct, onAdd}) => {
    
    const [product, setProducts] = useState("")

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
            const networkId = await web3.eth.net.getId()
            console.log(networkId)
            const networkData = Origin.networks[networkId]
            console.log(networkData)
            if (networkData) {
                //Fetch contract
                const contract = new web3.eth.Contract(Origin.abi, networkData.address)
                const productCount = await contract.methods.productCount().call()
                console.log(productCount)
                //Load products
                for (var i = 1; i <= productCount; i++) {
                    const newProduct = await contract.methods.products(i).call()
                    setProducts(products =>([...products, newProduct]))
                }
                }
            else { 
                window.alert("Origin contract is not deployed to the detected network")
            }
        }
    loadBlockchainData()}, [])
    
    const [name, setName] = useState("")
    const [processes, setProcesses] = useState([""])
    const [date, setDate] = useState("")
    const [d, setD] = useState("")

    useEffect(() => {
        getDate()
    }, [d])
    
    const getDate = async () => {
        const today = new Date()
        const d = await today.getDate() +'-'+ (today.getMonth()+1) +'-'+ today.getFullYear()
        const t = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const date = await d + " " + t
        setDate(date)
        console.log(date)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log("submitting...")
        const process = await JSON.stringify(processes)
        console.log(process)
        setD("now")
        addProduct({name, process, date})
    }

    const handleAddField = () => {
        setProcesses([...processes, ""])
    }

    const handleChangeInput = (id, event) => {
        const values = [...processes];
        values[id] = event.target.value;
        setProcesses(values);
      }

    const handleRemoveField = (id) => {
        const values  = [...processes];
        values.splice(id, 1);
        setProcesses(values);   
     }

    return (
        <div className="center">
            <form className="product-form" onSubmit={onSubmit}>
            <div className="product-form-header">
                <h2>Add Product</h2>
                <button className="btn form-close" style= {{background:"red", fontSize:"14px"}} onClick={onAdd}>X</button>
            </div>
            <div className="product-center-form">
                <div></div>                
                <div className="form-inputs">
                    <label>Product Name</label>
                    <input 
                        type="text"
                        className="product" required
                        placeholder="Enter Product Name"
                        value = {name} onChange={(e) => setName(e.target.value)}
                        />
                </div>
                <h3>Product Production Processes</h3>
                {processes.map((c, id) => {
                    return(
                <div className="form-inputs" key={id}>
                    <input
                        name='process'
                        className="process-add" required
                        placeholder="Enter Product Production Process"
                        value= {c} onChange={(e) => handleChangeInput(id, e)}
                        /><AiIcons.AiOutlinePlusCircle className="add" onClick= {handleAddField}/>
                        {processes.length !== 1 ? <AiIcons.AiOutlineMinusCircle className="add" onClick= {() => handleRemoveField(id)}/> : null}

                </div>
                )})}
                <div></div>
                <button className="btn product-input-btn" type="submit">
                    Add
                </button>
            </div>
            </form>
        </div>
    )
}

export default AddProduct

    
