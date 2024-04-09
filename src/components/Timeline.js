import React from 'react'
import {VerticalTimeline, VerticalTimelineElement} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Timeline = ({shipments, product}) => {

  return (
    <div className='time-margin'>
        <div className='timeline'>
        {product !== "" ? 
        <VerticalTimeline> 
            {shipments.filter(obj => obj.product.includes(product)).map(e => {
                    return(
                        <VerticalTimelineElement
                            date={e.date}
                            iconStyle={{ background: 'black', color: '#fff'}}
                            icon={e.account === "0x6886D731Be74158Cc496684989eb833050B81259" ? <GiIcons.GiCottonFlower/>:
                            e.account === "0xEF91Fad8797FBFa70a3E123e16291b6efcCe8ceF" ? <GiIcons.GiYarn/>: 
                            e.account === "0x5F1E74274E3903744d025d05e971160F293AC83D" ? <IoIcons.IoColorPaletteOutline/>:
                            e.account === "0x71bE63f3384f5fb98995898A86B02Fb2426c5788" ? <GiIcons.GiSewingMachine/>:
                            e.account === "0x2d6b1b27DC86F77297b467b8D59F2137f3b1773D" ? <AiIcons.AiOutlineShop/>: null}>
                            <div className='time-title'>
                            <h4>
                            {e.shipType === "Shipment Sent" ? e.process + " Sent" :  e.process + " Received"}
                            </h4>
                            <button className='time-title-btn'>
                              <Link to="lci" state={{process: e.process, product: product}} style={{ textDecoration: 'none', color: "black"}}>Life Cycle Inventory of {e.process}</Link>
                            </button>                                
                            </div>
                            <h4 className="subtitle">
                                {e.account === "0x6886D731Be74158Cc496684989eb833050B81259" ? "by Supplier#1":
                                e.account === "0xEF91Fad8797FBFa70a3E123e16291b6efcCe8ceF" ? "by Supplier#2":
                                e.account === "0x5F1E74274E3903744d025d05e971160F293AC83D" ? "by Supplier#3":
                                e.account === "0x71bE63f3384f5fb98995898A86B02Fb2426c5788" ? "by Supplier#4":
                                e.account === "0x2d6b1b27DC86F77297b467b8D59F2137f3b1773D" ? "by Company": null}
                            </h4>
                            <button className='as-btn'>
                              <Link to="assessments" state={e.account} style={{ textDecoration: 'none', color: "black"}}>
                              Environmental and Social Sustainability Assessment of
                              {e.account === "0x6886D731Be74158Cc496684989eb833050B81259" ? " Supplier#1":
                                e.account === "0xEF91Fad8797FBFa70a3E123e16291b6efcCe8ceF" ? " Supplier#2":
                                e.account === "0x5F1E74274E3903744d025d05e971160F293AC83D" ? " Supplier#3":
                                e.account === "0x71bE63f3384f5fb98995898A86B02Fb2426c5788" ? " Supplier#4":
                                e.account === "0x2d6b1b27DC86F77297b467b8D59F2137f3b1773D" ? " Company": null}
                              </Link>
                            </button>
                            <h4 className='description'>{e.shipType}: {e.date}</h4>               
            
                        </VerticalTimelineElement>
                    )
                })
              } 
        </VerticalTimeline> : null}
        </div>
    </div>
  )
}

export default Timeline