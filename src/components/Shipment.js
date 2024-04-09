import React from 'react'
import { IoLocationSharp } from 'react-icons/io5'

const ShipList = ({shipments, orders}) => 
shipments.sort((a,b) => b.id - a.id)
.map(shipment => (
    <tr className="shipments" key={shipment.id}>
        <td className="shipType">{shipment.shipType}</td>
        <td className="shipType">{shipment.product}</td>
        <td className="shipType">{orders.filter(obj => obj.id.includes(shipment.product)).map(order => order.name)}</td>
        <td className="shipType">{shipment.process}</td>
        <td className="address"> <IoLocationSharp
        /> {shipment.place}
        </td>
        <td className="map">
        <iframe 
          style={{width: "120px", height: "100px", cursor: "pointer"}}
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA1NTVyRpS9yu9w8Otq1K3r-SwMJMvrhNY&q=${shipment.latitude},${shipment.longitude}&zoom=13`} >
        </iframe>
        </td>
        <td className="date"> {shipment.date}</td>
        <td className="p-comp">
        {shipment.account === "0x6886D731Be74158Cc496684989eb833050B81259" ? "Supplier#1":
        shipment.account === "0xEF91Fad8797FBFa70a3E123e16291b6efcCe8ceF" ? "Supplier#2":
        shipment.account === "0x5F1E74274E3903744d025d05e971160F293AC83D" ? "Supplier#3":
        shipment.account === "0x71bE63f3384f5fb98995898A86B02Fb2426c5788" ? "Supplier#4":
        shipment.account === "0x2d6b1b27DC86F77297b467b8D59F2137f3b1773D" ? "Company": shipment.account}
      </td>
    </tr>
))

const Shipment = ({shipments, orders}) => {

    return (
        <>
        <h3 className="table-title">Shipments</h3>
            <table className="table">
              <tr>
                <th className="status">Shipment Status</th>
                <th className="ship-id">Shipped Order #</th>                
                <th className="ship-product">Shipped Product</th>                
                <th className="ship-process">Production Process</th>                                
                <th className="address">Shipment Location</th>
                <th className="mapview">Map View</th>
                <th className="date">Date Time Added</th>
                <th className="status">Added by</th>
              </tr>
              <ShipList shipments={shipments} orders={orders} />
          </table>
        </>)
}

export default Shipment
