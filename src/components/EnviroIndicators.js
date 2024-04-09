import React from 'react'
import { FcDocument } from "react-icons/fc";
import { Link } from 'react-router-dom';

const AssessList = ({assessments}) =>
assessments.sort((a,b) => b.id - a.id)
.map(a => (
    <tr key={a.id}>
    <td className="p-name">
      <Link to="enviro" state={{date: a.date, account: a.account}} style={{ textDecoration: 'none', color: "black"}}>
      <FcDocument style={{ fontSize: "30px", cursor: "pointer" }}/> 
      </Link>
    </td>
    <td className="p-comp">
        {a.account === "0x6886D731Be74158Cc496684989eb833050B81259" ? "Supplier#1":
        a.account === "0xEF91Fad8797FBFa70a3E123e16291b6efcCe8ceF" ? "Supplier#2":
        a.account === "0x5F1E74274E3903744d025d05e971160F293AC83D" ? "Supplier#3":
        a.account === "0x71bE63f3384f5fb98995898A86B02Fb2426c5788" ? "Supplier#4":
        a.account === "0x2d6b1b27DC86F77297b467b8D59F2137f3b1773D" ? "Company":
        a.account === "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec" ? "Customer": a.account}
    </td> 
    <td className="p-comp">{a.month + " " + a.year}</td>
    <td className="p-comp">{a.date}</td> 
    </tr>
))

 const Enviro = ({Emerge}) => {
    
return (
    <>
    <h3 className="table-title">Environmental Sustainability Assessments</h3>
      <table className="assess-table">
          <tr>
            <th className='assess'>Assessment</th>
            <th className='user'>User</th>
            <th className='period'>Period (Month  Year)</th>
            <th>Date  Time Added</th>
          </tr>
          <AssessList assessments={Emerge} />
      </table>
    </>
 )
}

 export default Enviro
