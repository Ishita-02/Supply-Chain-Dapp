import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import Web3 from "web3"
import Assessment from "../../abis/Assessments.json"
import Button from "../FormButton"
import Enviro from '../EnviroIndicators'
import Social from '../SocialIndicators'
import LCI from '../LCIIndicators'

const Assessments = () => {

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
              try {
                  const web3 = window.web3;
                  const networkId = await web3.eth.net.getId();
                  const networkData = Assessment.networks[networkId];
                  if (networkData) {
                      const contract = new web3.eth.Contract(Assessment.abi, networkData.address);
                      const LCICount = await contract.methods.LCICount().call();
                      const enviroCount = await contract.methods.enviroCount().call();
                      const socialCount = await contract.methods.socialCount().call();
      
                      // Load LCIs
                      for (let i = 1; i <= LCICount; i++) {
                          try {
                              const newLCI = await contract.methods.LCIs(i).call();
                              setLCIs(LCIs =>([...LCIs, newLCI]));
                              try {
                                  const parsedLCI = JSON.parse(newLCI.document);
                                  setLCIForm(LCIs =>([...LCIs, parsedLCI]));
                              } catch (error) {
                                  console.error("Error parsing LCI document:", error);
                                  // Handle error parsing LCI document
                              }
                          } catch (error) {
                              console.error("Error loading LCI data:", error);
                              // Handle error loading LCI data
                          }
                      }
      
                      // Load Enviros
                      for (let i = 1; i <= enviroCount; i++) {
                          try {
                              const newEnviro = await contract.methods.enviros(i).call();
                              setEnviros(enviros =>([...enviros, newEnviro]));
                              try {
                                  const parsedEnviro = JSON.parse(newEnviro.document);
                                  setEnviroForm(enviros =>([...enviros, parsedEnviro]));
                              } catch (error) {
                                  console.error("Error parsing Enviro document:", error);
                                  // Handle error parsing Enviro document
                              }
                          } catch (error) {
                              console.error("Error loading Enviro data:", error);
                              // Handle error loading Enviro data
                          }
                      }
      
                      // Load Socials
                      for (let i = 1; i <= socialCount; i++) {
                          try {
                              const newSocial = await contract.methods.socials(i).call();
                              setSocials(socials =>([...socials, newSocial]));
                              try {
                                  const parsedSocial = JSON.parse(newSocial.document);
                                  setSocialForm(socials =>([...socials, parsedSocial]));
                              } catch (error) {
                                  console.error("Error parsing Social document:", error);
                                  // Handle error parsing Social document
                              }
                          } catch (error) {
                              console.error("Error loading Social data:", error);
                              // Handle error loading Social data
                          }
                      }
                  } else { 
                      window.alert("Assessment contract is not deployed to the detected network");
                  }
              } catch (error) {
                  console.error("Error loading blockchain data:", error);
                  // Handle error loading blockchain data
              }
          };
      
          loadBlockchainData();
      }, []);
      
      

    const [LCIs, setLCIs] = useState([]) 
    const [LCIform, setLCIForm] = useState([])       
    const [enviros, setEnviros] = useState([])
    const [enviroform, setEnviroForm] = useState([])
    const [socials, setSocials] = useState([])  
    const [socialform, setSocialForm] = useState([])

    const merge = (LCIs.map(t1 => ({...t1, ...LCIform.find(t2 => t2.id === t1.id)})))
    const Emerge = (enviros.map(t1 => ({...t1, ...enviroform.find(t2 => t2.id === t1.id)})))
    const Smerge = (socials.map(t1 => ({...t1, ...socialform.find(t2 => t2.id === t1.id)})))
    
    let navigate = useNavigate(); 
    const routeLCI = () =>{ 
      let path = '/forms/lci'; 
      navigate(path);}
    const routeS = () =>{ 
      let path = '/forms/social'; 
      navigate(path);}
    const routeE = () =>{ 
      let path = '/forms/enviro'; 
      navigate(path);}

    return (
      <div className="main-container">
      <header className="assess-dashheader">
                  <Button className="btn" 
                  onClick={routeE}
                  color="#bc6c25"
                  text="Environmental Assessment"
                  />
                  <Button className="btn" 
                  onClick={routeS}
                  color="#bc6c25"
                  text="Social Assessment"
                  />
                  <Button className="btn" 
                  onClick={routeLCI}
                  color="#283618"
                  text="Life Cycle Inventory"
                  />
      </header>
      <Enviro Emerge={Emerge}/>
      <Social Smerge={Smerge}/>
      <LCI assessments={merge}/>
      <Sidebar/>
      </div>
    )
}

export default Assessments