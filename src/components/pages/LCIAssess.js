import React, { useState, useEffect} from 'react'
import Assessment from "../../abis/Assessments.json"
import Web3 from "web3"
import * as GiIcons from 'react-icons/gi';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import * as AiIcons from 'react-icons/ai';
import Sidebar from '../Sidebar';
import { useLocation } from 'react-router-dom';

const AssessList = ({assessments}) =>
assessments.map(a => (
    <tr key={a.id}>
      <table className='LCI-table'>
      <caption>Life Cycle Inventory of {a.process} of an {a.product}</caption>
      <caption className='captwo'>{"For the period " + a.month + " " + a.year + " by "} 
      {a.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? " Supplier#1":
      a.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? " Supplier#2":
      a.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? " Supplier#3":
      a.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? " Supplier#4":
      a.account === "0x2d6b1b27DC86F77297b467b8D59F2137f3b1773D" ? " Company": a.account}</caption>
      <thead>
          <th>Categories</th>
          <th>Indicators</th>
          <th>Measurements</th>
          <th>Values</th>
          <th>Units</th>
      </thead>
      <tbody>
            <tr>
                <th rowspan='9' className='category'>Natural Resources</th>
                <th rowspan='1'>Energy consumption <GiIcons.GiElectric/></th>
                <th>Amount of energy used per unit of product</th>
                <td>{(a.energy/a.batch) % 1 !== 0 ? (a.energy/a.batch).toFixed(2): (a.energy/a.batch)}</td>
                <td>kWh/ unit of product</td>
            </tr>
            <tr>
                <th rowspan='2'>Renewable energy <GiIcons.GiWindTurbine/></th>
                <th>Amount of renewable energy used in energy consumption per unit of product</th>
                <td>{(a.renewenergy/a.batch) % 1 !== 0 ? (a.renewenergy/a.batch).toFixed(2): (a.renewenergy/a.batch)}</td>
                <td>kWh/ unit of product</td>
            </tr> 
            <tr>
                <th>Percentage of renewable energy used per unit of product</th>
                <td>{(a.renewenergy*100/a.energy) % 1 !== 0 ? (a.renewenergy*100/a.energy).toFixed(2): (a.renewenergy*100/a.energy)}</td>
                <td>%</td>
            </tr>
            <tr>
                <th rowspan='1'>Water consumption <GiIcons.GiWaterDrop/></th>
                <th>Amount of water used per unit of product</th>
                <td>{(a.water/a.batch) % 1 !== 0 ? (a.water/a.batch).toFixed(2): (a.water/a.batch)}</td>
                <td>m3/ unit of product</td>
            </tr>
            <tr>
                <th rowspan='2'>Recycled or reused water <GiIcons.GiWaterRecycling/></th>
                <th>Amount of recycled or reused water used in water consumption per unit of product</th>
                <td>{ (a.waterrec/a.batch) % 1 !== 0 ? (a.waterrec/a.batch).toFixed(2): (a.waterrec/a.batch)}</td>
                <td>m3/ unit of product</td>
            </tr>
            <tr>
                <th>Percentage of recycled or reused water per unit of product</th>
                <td>{(a.waterrec*100/a.water) % 1 !== 0 ? (a.waterrec*100/a.water).toFixed(2): (a.waterrec*100/a.water)}</td>
                <td>%</td>
            </tr>
            <tr>
                <th rowspan='1'>Material consumption <AiIcons.AiFillGold/><AiIcons.AiFillGold/></th>
                <th>Amount of materials other than water used per unit of product</th>
                <td>{(a.material/a.batch) % 1 !== 0 ? (a.material/a.batch).toFixed(2): (a.material/a.batch)}</td>
                <td>kg/ unit of product</td>
            </tr>
            <tr>
                <th rowspan='2'>Recycled or reused materials <BiIcons.BiRecycle/></th>
                <th>Amount of recycled or reused materials used in material consumption per unit of product</th>
                <td>{(a.materialrec/a.batch) % 1 !== 0 ? (a.materialrec/a.batch).toFixed(2): (a.materialrec/a.batch)}</td>
                <td>kg/ unit of product</td>
            </tr>
            <tr>
                <th>Percentage of recycled or reused materials per unit of product</th>
                <td>{(a.materialrec*100/a.material) % 1 !== 0 ? (a.materialrec*100/a.material).toFixed(2): (a.materialrec*100/a.material)}</td>
                <td>%</td>
            </tr>
            <tr>
                <th rowspan='18' className='category'>Pollution and Waste Management</th>
                <th rowspan='1'>Greenhouse gas emission <GiIcons.GiGreenhouse/></th>
                <th>Amount of greenhouse gas emission generated per unit of product</th>
                <td>{(a.ghg/a.batch) % 1 !== 0 ? (a.ghg/a.batch).toFixed(2): (a.ghg/a.batch)}</td>
                <td>tonnes of CO2e/ unit of product</td>
            </tr>
        </tbody>
    </table> 
</tr>
))


const LCIAssess = () => {
    
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
          const networkData = Assessment.networks[networkId]
          if (networkData) {
              //Fetch contract
              const contract = new web3.eth.Contract(Assessment.abi, networkData.address)
              const LCICount = await contract.methods.LCICount().call()
              //Load LCIs
              for (var i = 1; i <= LCICount; i++) {
                  const newLCI = await contract.methods.LCIs(i).call()
                  setLCIs(LCIs =>([...LCIs, newLCI]))
              }
              for (var i = 1; i <= LCICount; i++) {
                  const newLCI = await contract.methods.LCIs(i).call()
                  setForm(LCIs =>([...LCIs, JSON.parse(newLCI.document)]))
              }
              }
          else { 
              window.alert("Assessment contract is not deployed to the detected network")
          }
      }
      loadBlockchainData()}, [])

    const [date, setDate] = useState()        
    const [LCIs, setLCIs] = useState([])        
    const [form, setForm] = useState([])

    const location = useLocation();
    const dateState = location.state;

    useEffect(() => {
        setDate(dateState)
        console.log(dateState)
    }, [dateState])

    const merge = (LCIs.map(t1 => ({...t1, ...form.find(t2 => t2.id === t1.id)})))
    const lci = merge.filter(obj => obj.date.includes(date)).map(obj => (obj));

  return (
    <>
    <Sidebar/>
    <div className='margin'>
    <table className="assess-table">
         <AssessList assessments={lci}/>
         {lci === "" ? <h2> No Assessment Found</h2> : null}
    </table>
    </div>
    </>
  )
}

export default LCIAssess
