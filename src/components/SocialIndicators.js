import React from 'react'
import { FcDocument } from "react-icons/fc";
import { Link } from 'react-router-dom';

const AssessList = ({assessments}) =>
assessments.sort((a,b) => b.id - a.id)
.map(a => (
    <tr key={a.id}>
        <td className="p-name">
          <Link to="social" state={a.date} style={{ textDecoration: 'none', color: "bc6c25"}}>
          <FcDocument style={{ fontSize: "30px", cursor: "pointer" }}/> 
          </Link>
        </td> 
        <td className="p-comp">
          {a.account === "0x6886D731Be74158Cc496684989eb833050B81259" ? "Supplier#1":
          a.account === "0xEF91Fad8797FBFa70a3E123e16291b6efcCe8ceF" ? "Supplier#2":
          a.account === "0x2d6b1b27DC86F77297b467b8D59F2137f3b1773D" ? "Company":
          a.account === "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec" ? "Customer": a.account}
        </td>  
        <td className="p-comp">{a.month + " " + a.year}</td>
        <td className="p-comp">{a.date}</td>
    </tr>
))

const Social = ({Smerge}) => {

  return (
    <>
    <h3 className="table-title">Social Sustainability Assessments</h3>
      <table className="assess-table">
          <tr>
            <th  className='assess'>Assessment</th>
            <th  className='user'>User</th>
            <th  className='period'>Period (Month  Year)</th>
            <th>Date  Time Added</th>
          </tr>
          <AssessList assessments={Smerge}/>
      </table>
    </>
  )
}

export default Social