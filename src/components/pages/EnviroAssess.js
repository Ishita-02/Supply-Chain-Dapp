import React, { useState, useEffect} from 'react'
import Assessment from "../../abis/Assessments.json"
import Web3 from "web3"
import * as GiIcons from 'react-icons/gi';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as GrIcons from 'react-icons/gr';
import * as FaIcons from 'react-icons/fa';
import Sidebar from '../Sidebar';
import { useLocation } from 'react-router-dom';

const AssessList = ({assessments, energy, material}) =>
assessments.map(a => (
    <tr key={a.id}>
        <table className='LCI-table'>
        <caption>Enviromental Sustainability Assessment for 
        {a.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? " Supplier#1":
        a.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? " Supplier#2":
        a.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? " Supplier#3":
        a.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? " Supplier#4":
        a.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? " Company": a.account}
        </caption>
        <caption className='captwo'>{"For the period " + a.month + " " + a.year}</caption>
        <thead>
            <th>Categories</th>
            <th>Indicators</th>
            <th>Measurements</th>
            <th>Values</th>
            <th>Units</th>
        </thead>
        <tbody>
                <tr>
                    <th rowspan='16' className='category'>Natural Resources</th>
                    <th rowspan='1'>Energy consumption <GiIcons.GiElectric/></th>
                    <th>Amount of energy used per month</th>
                    <td>{a.energy}</td>
                    <td>kWh/ month</td>
                </tr>
                <tr>
                    <th rowspan="2">Energy efficiency <MdIcons.MdPowerOff/></th>
                    <th>Amount of energy reduced per month</th>
                    <td>{a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? (energy[a.id-2] - energy[a.id-1]) : null}</td>
                    <td>kWh/ month</td>
                </tr>
                <tr>
                    <th>Percentage of energy reduced per month</th>
                    <td>{(a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? ((energy[a.id-2] - energy[a.id-1])*100/energy[a.id-2]) : null) % 1 !== 0 ? 
                    (a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? ((energy[a.id-2] - energy[a.id-1])*100/energy[a.id-2]) : null).toFixed(1): 
                    (a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? ((energy[a.id-2] - energy[a.id-1])*100/energy[a.id-2]) : null)}</td>
                    <td>%</td>
                </tr> 
                <tr>
                    <th rowspan='2'>Renewable energy <GiIcons.GiWindTurbine/></th>
                    <th>Amount of renewable energy used per month</th>
                    <td>{a.renewenergy}</td>
                    <td>kWh/ month</td>
                </tr> 
                <tr>
                    <th>Percentage of renewable energy used per month</th>
                    <td>{(a.renewenergy*100/a.energy) % 1 !== 0 ? (a.renewenergy*100/a.energy).toFixed(1): (a.renewenergy*100/a.energy)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='1'>Water consumption <GiIcons.GiWaterDrop/></th>
                    <th>Amount of water used per month</th>
                    <td>{a.water}</td>
                    <td>m3/ month</td>
                </tr>
                <tr>
                    <th rowspan='2'>Recycled or reused water <GiIcons.GiWaterRecycling/></th>
                    <th>Amount of recycled or reused water used per month</th>
                    <td>{a.waterrec}</td>
                    <td>m3/ month</td>
                </tr>
                <tr>
                    <th>Percentage of recycled or reused water per month</th>
                    <td>{(a.waterrec*100/a.water) % 1 !== 0 ? (a.waterrec*100/a.water).toFixed(1): (a.waterrec*100/a.water)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='1'>Material consumption <AiIcons.AiFillGold/><AiIcons.AiFillGold/></th>
                    <th>Amount of materials other than water used per month</th>
                    <td>{a.material}</td>
                    <td>kg/ month</td>
                </tr>
                <tr>
                    <th rowspan='2'>Material efficiency <AiIcons.AiFillGold/></th>
                    <th>Amount of materials reduced per month</th>
                    <td>{a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? (material[a.id-2] - material[a.id-1]) : null}</td>
                    <td>kg/ month</td>
                </tr>
                <tr>
                    <th>Percentage of materials reduced per month </th>
                    <td>{(a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? ((material[a.id-2] - material[a.id-1])*100/material[a.id-2]) : null) % 1 !== 0 ? 
                    (a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? ((material[a.id-2] - material[a.id-1])*100/material[a.id-2]) : null).toFixed(1): 
                    (a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? ((material[a.id-2] - material[a.id-1])*100/material[a.id-2]) : null)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='2'>Recycled or reused materials <BiIcons.BiRecycle/></th>
                    <th>Amount of recycled or reused materials per month </th>
                    <td>{a.materialrec}</td>
                    <td>kg/ month</td>
                </tr>
                <tr>
                    <th>Percentage of recycled or reused materials per month </th>
                    <td>{(a.materialrec*100/a.material) % 1 !== 0 ? 
                    (a.materialrec*100/a.material).toFixed(1): (a.materialrec*100/a.material)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='18' className='category'>Pollution and Waste Management</th>
                    <th rowspan='1'>Greenhouse gas emission <GiIcons.GiGreenhouse/></th>
                    <th>Amount of greenhouse gas emission generated per month</th>
                    <td>{a.ghg}</td>
                    <td>tonnes of CO2e</td>
                </tr>
        </tbody>
        </table>
</tr>
))

const EnviroAssess = () => {

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
              const enviroCount = await contract.methods.enviroCount().call()
              //Load Enviros
              for (var i = 1; i <= enviroCount; i++) {
                  const newEnviro = await contract.methods.enviros(i).call()
                  setEnviros(enviros =>([...enviros, newEnviro]))
              }
              for (var i = 1; i <= enviroCount; i++) {
                  const newEnviro = await contract.methods.enviros(i).call()
                  setEnviroForm(enviros =>([...enviros, JSON.parse(newEnviro.document)]))
              }
              for (var i = 1; i <= enviroCount; i++) {
                const newenviro = await contract.methods.enviros(i).call()
                const parse = JSON.parse(newenviro.document)
                setMaterial(enviros =>([...enviros, (parse.material)]))
            }
              }
          else { 
              window.alert("Assessment contract is not deployed to the detected network")
          }
      }
      loadBlockchainData()}, [])
    
    const [account, setAccount] = useState([])        
    const [date, setDate] = useState()        
    const [enviros, setEnviros] = useState([])
    const [enviroform, setEnviroForm] = useState([])
    const [material, setMaterial] = useState([])

    const location = useLocation();
    const dateState = location.state.date;
    const accountState = location.state.account;

    useEffect(() => {
        setDate(dateState)
        setAccount(accountState)
    }, [dateState, accountState])

    const Emerge = (enviros.map(t1 => ({...t1, ...enviroform.find(t2 => t2.id === t1.id)})))
    const env = Emerge.filter(obj => obj.date.includes(date)).map(obj => (obj));
    const energy = Emerge.filter(obj => obj.account.includes(account)).map(obj => (obj.energy))
    console.log(energy)

  return (
    <>
    <Sidebar/>
    <div className='margin'>
    <table className="assess-table">
         <AssessList assessments={env} energy={energy} material={material}/>
         {env === "" ? <h2> No Assessment Found</h2> : null}
    </table>
    </div>
    </>
  )
}

export default EnviroAssess
