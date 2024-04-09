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
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io';

import Sidebar from '../Sidebar';
import { useLocation } from 'react-router-dom';

const AssessList = ({assessments, energy, material}) =>
assessments.map(a => (
    <tr key={a.id}>
        <table className='LCI-table'>
        <caption>Enviromental Sustainability Assessment for 
        {a.account === "0x6886D731Be74158Cc496684989eb833050B81259" ? " Supplier#1":
        a.account === "0xEF91Fad8797FBFa70a3E123e16291b6efcCe8ceF" ? " Supplier#2":
        a.account === "0x5F1E74274E3903744d025d05e971160F293AC83D" ? " Supplier#3":
        a.account === "0x71bE63f3384f5fb98995898A86B02Fb2426c5788" ? " Supplier#4":
        a.account === "0x2d6b1b27DC86F77297b467b8D59F2137f3b1773D" ? " Company": a.account}
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
                    <th>Amount of solid waste recycled or reused per month </th>
                    <td>{a.solidwasterec}</td>
                    <td>kg/ month</td>
                </tr>
                <tr>
                    <th>Percentage of solid waste recycled or reused per month </th>
                    <td>{(a.solidwasterec*100/a.solidwaste) % 1 !== 0 ? 
                    (a.solidwasterec*100/a.solidwaste).toFixed(1): (a.solidwasterec*100/a.solidwaste)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th>Type of solid waste destination </th>
                    <td>{(a.solidwastedes + " ").replace(/,/g, ', ')}</td>
                    <td></td>
                </tr>
                <tr>
                    <th rowspan='4'>Waste water<GiIcons.GiTrashCan/></th>
                    <th>Amount of waste water generated per month </th>
                    <td>{a.waterwaste}</td>
                    <td>m3/ month</td>
                </tr>
                <tr>
                    <th>Amount of waste water recycled or reused per month </th>
                    <td>{a.waterwasterec}</td>
                    <td>m3/ month</td>
                </tr>
                <tr>
                    <th>Percentage of waste water recycled or reused per month </th>
                    <td>{(a.waterwasterec*100/a.waterwaste) % 1 !== 0 ? 
                    (a.waterwasterec*100/a.waterwaste).toFixed(1): (a.waterwasterec*100/a.waterwaste)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th>Type of waste water destination </th>
                    <td>{(a.waterwastedes + " ").replace(/,/g, ', ')}</td>
                    <td></td>
                </tr>
                <tr>
                    <th rowspan='5' className='category'>Operations Management and Performance Measurement</th>
                    <th rowspan='1'>Environmental management system<GrIcons.GrCertificate/></th>
                    <th>Existence of external certifications regarding environmental standards</th>
                    <td>{a.envirostand}</td>
                    <td></td>
                </tr>
                <tr>
                    <th rowspan='1'>Product recyclability<RiIcons.RiRecycleFill/></th>
                    <th>Percentage of recyclable or reusable products produced per month</th>
                    <td>{(a.productrec*100/a.products) % 1 !== 0 ? 
                    (a.productrec*100/a.products).toFixed(1): (a.productrec*100/a.products)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='1'>Green packaging and labeling<BiIcons.BiPackage/></th>
                    <th>Percentage of eco-friendly packaged and labeled products per month</th>
                    <td>{(a.ecolabel*100/a.products) % 1 !== 0 ? 
                    (a.ecolabel*100/a.products).toFixed(1): (a.ecolabel*100/a.products)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='1'>Cleaner technology<FaIcons.FaSeedling/></th>
                    <th>Type of clean technology used</th>
                    <td>{(a.clean + " ").replace(/,/g, ', ')}</td>
                    <td></td>
                </tr>
                <tr>
                    <th rowspan='1'>Supplier sustainability assessment<MdIcons.MdOutlineAssessment/></th>
                    <th>Percentage of suppliers monitored on environmental sustainability per year</th>
                    <td>{(a.envirosus*100/a.suppliers) % 1 !== 0 ? (a.envirosus*100/a.suppliers).toFixed(1): (a.envirosus*100/a.suppliers)}</td>
                    <td>%</td>
                </tr>
        </tbody>
        </table>
</tr>
))

const SocialList = ({assessments}) =>
assessments.map(a => (
    <tr key={a.id}>
        <table className='LCI-table'>
      <caption>Social Sustainability Assessment for 
      {a.account === "0x6886D731Be74158Cc496684989eb833050B81259" ? " Supplier#1":
        a.account === "0xEF91Fad8797FBFa70a3E123e16291b6efcCe8ceF" ? " Supplier#2":
        a.account === "0x5F1E74274E3903744d025d05e971160F293AC83D" ? " Supplier#3":
        a.account === "0x71bE63f3384f5fb98995898A86B02Fb2426c5788" ? " Supplier#4":
        a.account === "0x2d6b1b27DC86F77297b467b8D59F2137f3b1773D" ? " Company": a.account}
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
    <th rowspan='17' className='category'>Labor Practices</th>
    <th rowspan='2'>Employee training and development <MdIcons.MdOutlineSchool/></th>
      <th>Average training hours per employee per year</th>
      <td>{(a.trainh/a.trainemp) % 1 !== 0 ? (a.trainh/a.trainemp).toFixed(1): (a.trainh/a.trainemp)}</td>
      <td>hours/ year</td>
    </tr>
    <tr>
    <th rowspan='1'>Anti-competitive behavior<GiIcons.GiPodiumWinner/></th>
      <th>Legal actions pending or completed regarding anti-competitive behavior per year</th>
      <td>{a.anticomp}</td>
      <td>legal actions/ year</td> 
    </tr>
    <tr>
    <th rowspan='1'>Supplier sustainability assessment<MdIcons.MdOutlineAssessment/></th>
      <th>Percentage of suppliers monitored on social sustainability per year</th>
      <td>{(a.socialsus*100/a.suppliers) % 1 !== 0 ? (a.socialsus*100/a.suppliers).toFixed(1): (a.socialsus*100/a.suppliers)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='5' className='category'>Customer Responsibility</th>
    <th rowspan='2'>Customer health and safety<MdIcons.MdHealthAndSafety/></th>
      <th>Percentage of products and services for which health and safety impacts are assessed</th>
      <td>{(a.productassess*100/a.product) % 1 !== 0 ? (a.productassess*100/a.product).toFixed(1): (a.productassess*100/a.product)}</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Health and safety incidents concerning products and services per year</th>
      <td>{a.productincident}</td>
      <td>incidents/ year</td>
    </tr>
    <tr>
    <th rowspan='2'>Respect for privacy<MdIcons.MdOutlinePrivacyTip/></th>
      <th>Customer privacy complaints per year</th>
      <td>{a.privacy}</td>
      <td>complaints/ year</td>
    </tr>
    <tr>
      <th>Leaks, thefts, or losses of customer data per year</th>
      <td>{a.leaks}</td>
      <td>leaks, thefts, or losses/ year</td>
    </tr>
    <tr>
    <th rowspan='1'>Customer satisfaction<AiIcons.AiOutlineLike/></th>
      <th>Customer complaints per month</th>
      <td>{a.cuscomp}</td>
      <td>complaints/ month</td>
    </tr>
      </tbody>
        </table>
        </tr>
))

const AssessES = () => {

    const [accountData, setAccountData] = useState()        
    const [enviros, setEnviros] = useState([])
    const [enviroform, setEnviroForm] = useState([])
    const [socials, setSocials] = useState([])  
    const [energy, setEnergy] = useState([])
    const [material, setMaterial] = useState([])
    const [socialform, setSocialForm] = useState([])

    const location = useLocation();
    const accountD = location.state;

    useEffect(() => {
        setAccountData(accountD)
        console.log(accountD)
    }, [accountD])

    const Emerge = (enviros.map(t1 => ({...t1, ...enviroform.find(t2 => t2.id === t1.id)})))
    const Smerge = (socials.map(t1 => ({...t1, ...socialform.find(t2 => t2.id === t1.id)})))

    const supp = Emerge.filter(obj => obj.account.includes(accountData)).map(obj => (obj));
    const suppS = Smerge.filter(obj => obj.account.includes(accountData)).map(obj => (obj));
    const lastSupp = supp.slice(-1)
    const lastSuppS = suppS.slice(-1)

    console.log(lastSuppS)
    
  return (
    <>
    <Sidebar/>
    <div className='margin'>
    <table className="assess-table">
         <AssessList assessments={lastSupp} energy={energy} material={material} account={accountData} />
         <SocialList assessments={lastSuppS} Data={accountData} />
         {lastSuppS.length === 0 ? <h3 style={{marginTop: "30px"}}> No Social Assessment Found</h3> : null}
         {lastSupp.length === 0 ? <h3> No Environmental Assessment Found</h3> : null}
    </table>
    </div>
    </>
  )
}

export default AssessES