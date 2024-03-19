import React, { useState, useEffect} from 'react'
import Assessment from "../../abis/Assessments.json"
import Web3 from "web3"
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as GrIcons from 'react-icons/gr';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io';
import Sidebar from '../Sidebar';
import { useLocation } from 'react-router-dom';

const SocialList = ({assessments}) =>
assessments.map(a => (
    <tr key={a.id}>
        <table className='LCI-table'>
      <caption>Social Sustainability Assessment for 
      {a.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? " Supplier#1":
        a.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? " Supplier#2":
        a.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? " Supplier#3":
        a.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? " Supplier#4":
        a.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? " Company": a.account}
      </caption>
      <caption className='captwo'>{"For period " + a.month + " " + a.year}</caption>
      <thead>
          <th>Categories</th>
          <th>Indicators</th>
          <th>Measurements</th>
          <th>Values</th>
          <th>Units</th>
      </thead>
      <tbody>
    <tr>
    <th rowspan='2'>Full and part-time employees<GrIcons.GrUserWorker/></th>
      <th>Percentage of full-time employees</th>
      <td>{(a.fullemp*100/a.emp) % 1 !== 0 ? (a.fullemp*100/a.emp).toFixed(1): (a.fullemp*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Percentage part-time employees</th>
      <td>{((a.emp-a.fullemp)*100/a.emp) % 1 !== 0 ? ((a.emp-a.fullemp)*100/a.emp).toFixed(1): ((a.emp-a.fullemp)*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='2'>Hours of work<AiIcons.AiOutlineClockCircle/></th>
      <th>Average weekly contractual working hours per employee per month</th>
      <td>{a.workh}</td>
      <td>hours/ month</td>
    </tr>
    <tr>
      <th>Average weekly overtime hours per employee per month</th>
      <td>{a.overtimeh}</td>
      <td>hours/ month</td>
    </tr>
    <tr>
    <th rowspan='2'>Fair wage<MdIcons.MdAttachMoney/></th>
      <th>Percentage of employee wage to the minimum wage</th>
      <td>{(a.empwage*100/4250) % 1 !== 0 ? (a.empwage*100/4250).toFixed(1): (a.empwage*100/4250)}</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Percentage of full-time employees earning below minimum wage</th>
      <td>{(a.minwage*100/a.emp) % 1 !== 0 ? (a.minwage*100/a.emp).toFixed(1): (a.minwage*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Social benefits and security<MdIcons.MdSecurity/></th>
      <th>Percentage of employees entitled for health insurance, parental leave, unemployment, disability and invalidity coverage, retirement provision</th>
      <td>{(a.insurance*100/a.emp) % 1 !== 0 ? (a.insurance*100/a.emp).toFixed(1): (a.insurance*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='3'>Gender diversity<BsIcons.BsGenderAmbiguous/></th>
      <th>Wage diversity of genders</th>
      <td>{(a.femwage/a.malwage) % 1 !== 0 ? (a.femwage/a.malwage).toFixed(1): (a.femwage/a.malwage)}</td>
      <td>female wage/ male wage</td>
    </tr>
    <tr>
      <th>Employee gender diversity</th>
      <td>{(a.fem/a.male) % 1 !== 0 ? (a.fem/a.male).toFixed(1): (a.fem/a.male)}</td>
      <td>female employees/ male employees</td>
    </tr>
      </tbody>
        </table>
        </tr>
))

const SocialAssess = () => {
    
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
                const socialCount = await contract.methods.socialCount().call()
                //Load Socials
                for (var i = 1; i <= socialCount; i++) {
                    const newSocial = await contract.methods.socials(i).call()
                    setSocials(socials =>([...socials, newSocial]))
                }
                for (var i = 1; i <= socialCount; i++) {
                    const newSocial = await contract.methods.socials(i).call()
                    setSocialForm(socials =>([...socials, JSON.parse(newSocial.document)]))
                }
                }
            else { 
                window.alert("Assessment contract is not deployed to the detected network")
            }
        }
        loadBlockchainData()}, [])


    const [socials, setSocials] = useState([])  
    const [socialform, setSocialForm] = useState([])
    const [date, setDate] = useState()        

    const location = useLocation();
    const dateState = location.state;

    useEffect(() => {
        setDate(dateState)
        console.log(dateState)
    }, [dateState])

    const Smerge = (socials.map(t1 => ({...t1, ...socialform.find(t2 => t2.id === t1.id)})))
    const social = Smerge.filter(obj => obj.date.includes(date)).map(obj => (obj));
    
  return (
    <>
    <Sidebar/>
    <div className='margin'>
    <table className="assess-table">
         <SocialList assessments={social} />
         {social === "" ? <h2> No Assessment Found</h2> : null}
    </table>
    </div>
    </>
  )
}

export default SocialAssess
