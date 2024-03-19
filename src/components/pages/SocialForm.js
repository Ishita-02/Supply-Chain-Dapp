import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Web3 from "web3"
import Assessment from "../../abis/Assessments.json"
import Sidebar from '../Sidebar'

const Social = () => {
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
            const networkData = Assessment.networks['11155111']

            if (networkData) {
                //Fetch contract
                const contract = new web3.eth.Contract(Assessment.abi, networkData.address)
                setContract(contract)
                const socialCount = await contract.methods.socialCount().call()
                setSocialCount(socialCount)
            //Load Socials
            for (var i = 1; i <= socialCount; i++) {
                const newSocial = await contract.methods.socials(i).call()
                setSocials(socials =>([...socials, newSocial]))
            }
            }
            else { 
                window.alert("Assessment contract is not deployed to the detected network")
            }
        }
    loadBlockchainData()}, [])

    const [contract, setContract] = useState([])
    const [account, setAccount] = useState([])        
    const [socialCount, setSocialCount] = useState()
    const [socials, setSocials] = useState([])
    const [date, setDate] = useState("")
    const [d, setD] = useState("")

    const [monthYear, setMonthYear] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [trainh, setTrainh] = useState("")
    const [trainemp, setTrainemp] = useState("")
    const [emp, setEmp] = useState("")
    const [resemp, setResemp] = useState("")
    const [hiredemp, setHiredemp] = useState("")
    const [fullemp, setFullemp] = useState("")
    const [workh, setWorkh] = useState("")
    const [overtimeh, setOvertimeh] = useState("")
    const [empwage, setEmpwage] = useState("")
    const [minwage, setMinwage] = useState("")
    const [insurance, setInsurance] = useState("")
    const [femwage, setFemwage] = useState("")
    const [malwage, setMalwage] = useState("")
    const [fem, setFem] = useState("")
    const [male, setMale] = useState("")
    const [femboard, setFemboard] = useState("")
    const [empboard, setEmpboard] = useState("")
    const [disabled, setDisabled] = useState("")
    const [minority, setMinority] = useState("")
    const [older, setOlder] = useState("")
    const [socialstand, setSocialstand] = useState("")
    const [ilo, setIlo] = useState("")
    const [fire, setFire] = useState("")
    const [medical, setMedical] = useState("")
    const [sanitation, setSanitation] = useState("")
    const [gear, setGear] = useState("")
    const [workacc, setWorkacc] = useState("")
    const [union, setUnion] = useState("")
    const [empunion, setEmpunion] = useState("")
    const [bargain, setBargain] = useState("")
    const [discri, setDiscri] = useState("")
    const [child, setChild] = useState("")
    const [forced, setForced] = useState("")
    const [indig, setIndig] = useState("")
    const [localemp, setLocalemp] = useState("")
    const [localsup, setLocalsup] = useState("")
    const [donation, setDonation] = useState("")
    const [earning, setEarning] = useState("")
    const [corrup, setCorrup] = useState("")
    const [anticomp, setAnticomp] = useState("")
    const [socialsus, setSocialsus] = useState("")
    const [suppliers, setSuppliers] = useState("")
    const [productassess, setProductassess] = useState("")
    const [product, setProduct] = useState("")
    const [productincident, setProductincident] = useState("")
    const [privacy, setPrivacy] = useState("")
    const [leaks, setLeaks] = useState("")
    const [cuscomp, setCuscomp] = useState("")
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const monthNumber = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    
    const onSubmit = async(e) =>{
        e.preventDefault()
        const socialForm = {  
        id: (parseInt(socialCount)+1).toString(),
        trainh: trainh,
        trainemp: trainemp,
        emp: emp, 
        resemp: resemp, 
        hiredemp: hiredemp, 
        fullemp: fullemp, 
        workh: workh, 
        
        empwage: empwage, 
        
        insurance: insurance, 
      
        fem: fem,
        male: male,
        femboard: femboard,
        empboard: empboard,
        product: product,
        gear: gear,
        workacc: workacc,
        union: union,
        cuscomp: cuscomp
        
        // {/*disabled: disabled,
        // minority: minority,
        // femwage: femwage,
        // malwage: malwage,
        // minwage: minwage,
        // overtimeh: overtimeh, 
        // older: older,
        // socialstand: socialstand,
        // ilo: ilo,
        // fire: fire,
        // medical: medical,
        // sanitation: sanitation,
       
        // empunion: empunion,
        // bargain: bargain,
        // discri: discri,
        // child: child,
        // forced: forced,
        // indig: indig,
        // localemp: localemp,
        // localsup: localsup,
        // donation: donation,
        // earning: earning,
        // corrup: corrup,
        // anticomp: anticomp,
        // socialsus: socialsus,
        // suppliers: suppliers,
        // productassess: productassess, 
        
        // productincident: productincident,
        // privacy: privacy,
        // leaks: leaks,*/}
       
    } 
    const document = JSON.stringify(socialForm)
    setD("now")
    await addSocial({date, document, month, year})
    }

    useEffect(() => {
        getDate()
        getMonth()
    }, [d, monthYear])

    const getDate = async () => {
        const today = new Date()
        const d = await today.getDate() +'-'+ (today.getMonth()+1) +'-'+ today.getFullYear()
        const t = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
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
    
    const addSocial = ({date, document, month, year}) => {
        console.log(date, document, month, year)
        contract.methods.addSocial(date, document, month, year).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.assign('http://localhost:3000/assessments')
        })
    }

    const handleChange = (name, checked) => {
        checked === true ? setSocialstand((prev) => [...prev, name]) 
        : console.log("")}

        return (
            <div>
              <Sidebar/>
                  <div className="LCI-container">
                  <form className="LCI-form" onSubmit={onSubmit}>
                      <div>
                      <h3>Social Sustainability Assessment</h3>
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
                      <fieldset className="monthly-kpi"><legend>Monthly KPI Update</legend>
                          <div className='center-form-input' >
                          <label 
                          className="form-label">
                          1 - Total number of employees
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} 
                              value = {emp} onChange={(e) => setEmp(e.target.value)}
                          /> 
                      <div></div> 
                      <label 
                          className="form-label">
                          2 - Total number of full-time employees 
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} 
                              value = {fullemp} onChange={(e) => setFullemp(e.target.value)}
                          /> 
                      <div></div> 
                      <label 
                          className="form-label">
                          3 - Average weekly contractual working hours per full-time employee per month
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {workh} onChange={(e) => setWorkh(e.target.value)}
                          /> 
                      <div></div> 
                      <label 
                          className="form-label">
                          4 - Average weekly overtime hours per employee per month
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {overtimeh} onChange={(e) => setOvertimeh(e.target.value)}
                          /> 
                      <div></div> 
                      <label 
                          className="form-label">
                          5 - Average employee wage 
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {empwage} onChange={(e) => setEmpwage(e.target.value)}
                              /> <label class="wrap_text"> TL</label> 
                      <div></div> 
                      <label 
                          className="form-label">
                          6 - Total number of full-time employees earning below minimum wage
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} 
                              value = {minwage} onChange={(e) => setMinwage(e.target.value)}/>
                  <div></div> 
                      <label 
                          className="form-label">
                          7 - Total number of employees entitled for health insurance, parental leave, unemployment, disability and invalidity coverage, retirement provision 
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} 
                              value = {insurance} onChange={(e) => setInsurance(e.target.value)}/> 
                      <div></div> 
                      <label 
                          className="form-label">
                          8 - Average female employee wage
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {femwage} onChange={(e) => setFemwage(e.target.value)}
                              /> <label class="wrap_text"> TL</label> 
                      <div></div> 
                      <label 
                          className="form-label">
                          9 - Average male employee wage
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {malwage} onChange={(e) => setMalwage(e.target.value)}
                              /> <label class="wrap_text"> TL</label> 
                      <div></div> 
                      <label 
                          className="form-label">
                          10 - Total number of female employees
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} 
                              value = {fem} onChange={(e) => setFem(e.target.value)}
                          />
                      <div></div> 
                      <label 
                          className="form-label">
                          11 - Total number of male employees 
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} 
                              value = {male} onChange={(e) => setMale(e.target.value)}/> 
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
      
      export default Social