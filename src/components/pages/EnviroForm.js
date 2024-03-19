import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Web3 from "web3"
import Assessment from "../../abis/Assessments.json"
import * as AiIcons from 'react-icons/ai';
import Sidebar from '../Sidebar';

const Enviro = () => {

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
            const accounts = await web3.eth.getAccounts()
            setAccount(accounts[0])
            const networkId = await web3.eth.net.getId()
            const networkData = Assessment.networks[networkId]
            if (networkData) {
                //Fetch contract
                const contract = new web3.eth.Contract(Assessment.abi, networkData.address)
                setContract(contract)
                const enviroCount = await contract.methods.enviroCount().call()
                setEnviroCount(enviroCount)
                //Load Enviros
                for (var i = 1; i <= enviroCount; i++) {
                    const newEnviro = await contract.methods.enviros(i).call()
                    setEnviros(enviros =>([...enviros, newEnviro]))
                }
                }
            else { 
                window.alert("Assessment contract is not deployed to the detected network")
            }
        }
    loadBlockchainData()}, [])

    const {register} = useForm();
    const [contract, setContract] = useState([])
    const [account, setAccount] = useState([])        
    const [enviroCount, setEnviroCount] = useState()
    const [enviros, setEnviros] = useState([])
    const [date, setDate] = useState("")
    const [d, setD] = useState("")
    
    const [monthYear, setMonthYear] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [energy, setEnergy] = useState("")
    const [renewenergy, setRenewenergy] = useState("")
    const [water, setWater] = useState("")
    const [waterrec, setWaterrec] = useState("")
    const [material, setMaterial] = useState("")
    const [materialrec, setMaterialrec] = useState("")
    const [land, setLand] = useState("")
    const [bio, setBio] = useState("")
    const [sensitive, setSensitive] = useState("")
    const [ghg, setGhg] = useState("")
    const [waterpol, setWaterpol] = useState("")
    const [waterpoltype, setWaterpoltype] = useState("")
    const [landpol, setLandpol] = useState("")
    const [landpoltype, setLandpoltype] = useState("")
    const [air, setAir] = useState("")
    const [hazmat, setHazmat] = useState("")
    const [hazwaste, setHazwaste] = useState("")
    const [solidwaste, setSolidwaste] = useState("")
    const [solidwasterec, setSolidwasterec] = useState("")
    const [solidwastedes, setSolidwastedes] = useState("")
    const [waterwaste, setWaterwaste] = useState("")
    const [waterwasterec, setWaterwasterec] = useState("")
    const [waterwastedes, setWaterwastedes] = useState("")
    const [productrec, setProductrec] = useState("")
    const [ecolabel, setEcolabel] = useState("")
    const [product, setProduct] = useState("")
    const [envirostand, setEnvirostand] = useState("")
    const [clean, setClean] = useState("")
    const [envirosus, setEnvirosus] = useState("")
    const [suppliers, setSuppliers] = useState("")
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const monthNumber = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

    const onSubmit = async(e) =>{
        e.preventDefault()
        const enviroForm = {
            id: (parseInt(enviroCount)+1).toString(),
            energy: energy, 
            renewenergy: renewenergy,
            water: water,
            waterrec: waterrec,
            material: material,
            materialrec: materialrec,
            land: land,
            bio: bio,
            sensitive: sensitive,
            ghg: ghg,
            waterpol: waterpol,
            waterpoltype: waterpoltype,
            landpol: landpol,
            landpoltype: landpoltype,
            air: air,
            hazmat: hazmat,
            hazwaste: hazwaste,
            solidwaste: solidwaste,
            solidwasterec: solidwasterec,
            solidwastedes: solidwastedes,
            waterwaste: waterwaste,
            waterwasterec: waterwasterec,
            waterwastedes: waterwastedes,
            productrec: productrec,
            ecolabel: ecolabel,
            products: product,
            envirostand: envirostand,
            clean: clean,
            envirosus: envirosus,
            suppliers: suppliers
        }
        const document = JSON.stringify(enviroForm)
        setD("now")
        await addEnviro({date, document, month, year})
    }

    console.log(month + year)
    useEffect(() => {
        getDate()
        getMonth()
    }, [d, monthYear])

    const getDate = async () => {
        const tomonth = new Date()
        const d = await tomonth.getDate() +'-'+ (tomonth.getMonth()+1) +'-'+ tomonth.getFullYear()
        const t = await tomonth.getHours() + ":" + tomonth.getMinutes() + ":" + tomonth.getSeconds()
        const date = await d + " " + t
        setDate(date)
        console.log(date)
    }

    const getMonth = () => {
        const month = monthYear.toString().substr(-2)
        const year = monthYear.toString().substr(0,4)
        setYear(year)
        for (var i = 0; i <= 11; i++) {
        if (month === monthNumber[i]) {
            setMonth(months[i])
        }
    }}

    const addEnviro = ({date, document, month, year}) => {
        contract.methods.addEnviro(date, document, month, year).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.assign('http://localhost:3000/assessments')
        })
    }

    const handleChange = (name, checked, set) => {
        checked === true ? set((prev) => [...prev, name]) 
        : console.log("")
    }
    
    return (
        <div>
          <Sidebar/>
            <div className="LCI-container">
            <form className="LCI-form" onSubmit={onSubmit}>
                <div>
                    <h3>Enviromental Sustainability Assessment</h3>
                        <div className="center">
                            <div>
                        <label>
                            Select Month/ Year  
                            </label>
                            <input 
                                type='month' required
                                value = {monthYear} onChange={(e) => setMonthYear(e.target.value)}
                            />
                            </div>
                        </div>
                <fieldset className="monthly-kpi-env"><legend>Monthly KPI Update</legend>
                    <div className='center-form-input'>
                        <label 
                            className="form-label">
                            1 - Total amount of energy used per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {energy} onChange={(e) => setEnergy(e.target.value)}
                            /><label class="wrap_text"> kWh/ month</label> 
                            <div></div>
                            <label 
                            className="form-label">
                            2 - Total amount of renewable energy used in energy consumption per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {renewenergy} onChange={(e) => setRenewenergy(e.target.value)}
                            /><label class="wrap_text"> kWh/ month</label> 
                        <div></div> 
                        <label 
                            className="form-label">
                            3 - Total amount of water used per month 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {water} onChange={(e) => setWater(e.target.value)}
                            /> <label class="wrap_text"> m3/ month</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            4 - Total amount of recycled or reused water used in water consumption per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {waterrec} onChange={(e) => setWaterrec(e.target.value)}
                            /> <label class="wrap_text"> m3/ month</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            5 - Total amount of materials other than water used per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {material} onChange={(e) => setMaterial(e.target.value)}
                            /> <label class="wrap_text">kg/ month</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            6 - Total amount of recycled or reused materials used in material consumption per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {materialrec} onChange={(e) => setMaterialrec(e.target.value)}
                                /> <label class="wrap_text">kg/ month</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            7 - Total amount of greenhouse gas emission (CO2, CH4, N2O, HFCs, PFCs, SF6) generated per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {ghg} onChange={(e) => setGhg(e.target.value)}
                            /><label class="wrap_text"> tonnes of CO2e/ month</label>
                        <div></div>  
                       </div>
                </fieldset>
                    <div className='center-btn'>
                        <button className="btn form-input-LCI" type="submit">
                        Calculate Assessment
                        </button>
                    </div> 
                </div>
            </form>
            </div>
        </div>
      )
  }
  
  export default Enviro