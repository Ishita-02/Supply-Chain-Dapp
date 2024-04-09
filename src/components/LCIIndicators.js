import React from 'react'
import { FcDocument } from "react-icons/fc";
import { Link } from 'react-router-dom';

const AssessList = ({assessments}) =>
assessments.sort((a,b) => b.id - a.id)
.map(a => (
    <tr key={a.id}>
    <td className="p-name">
      <Link to="lci" state={a.date} style={{ textDecoration: 'none', color: "black"}}>
      <FcDocument style={{ fontSize: "30px", cursor: "pointer" }}/> 
      </Link>
      </td>
    <td className="p-comp">{a.product}</td>
    <td className="p-comp">{a.process}</td>
    <td className="p-comp">{a.month + " " + a.year}</td>
    <td className="p-comp">
        {a.account === "0x6886D731Be74158Cc496684989eb833050B81259" ? "Supplier#1":
        a.account === "0xEF91Fad8797FBFa70a3E123e16291b6efcCe8ceF" ? "Supplier#2":
        a.account === "0x2d6b1b27DC86F77297b467b8D59F2137f3b1773D" ? "Company":
        a.account === "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec" ? "Customer": a.account}
    </td>  
    <td className="p-comp">{a.date}</td>
    </tr>
))

const LCIIndicators = ({assessments}) => {

  return (
    <>
    <h3 className="table-title">Life Cycle Inventories</h3>
        <table className="assess-table">
          <tr>
            <th  className='LCI-assess'>Assessment</th>
            <th className='LCI-product'>Product</th>
            <th>Process</th>
            <th className='LCI-period'>Period (Month  Year)</th>
            <th >User</th>
            <th>Date  Time Added</th>
          </tr>
          <AssessList assessments={assessments}/>
      </table>
    </>
  )
}

export default LCIIndicators