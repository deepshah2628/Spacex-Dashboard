import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { Modal, Button } from "react-bootstrap";
import spacex from "./images/spacex.svg";
import { MenuItem, Select } from "@material-ui/core";


const DataList = () => {
  const [userList, setuserList] = useState([]);
  const columns = [
    { dataField: "flight_number", text: "No" },
    { dataField: "launch_date_utc", text: "Launched(UTC)" },
    { dataField: "launch_site.site_name", text: "Location" },
    { dataField: "mission_name", text: "Mission" },
    { dataField: "rocket.second_stage.payloads[0].orbit", text: "Orbit" },
    { dataField: "launch_success", text: "Launch Status" },
    { dataField: "rocket.rocket_name", text: "Rocket" },
  ];



  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    hideSizePerPage: true,
    withFirstAndLast: false,
    nextPageText: ">",
    prePageText: "<",
    alwaysShowAllBtns: true,
    onPageChange: (page, sizePerPage) => {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: (page, sizePerPage) => {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  const [filterData, setFilterData] = useState(userList)
  const [filter, setFilter] = useState(`All Launches`)
  const [modalInfo, setModalInfo] = useState([]);
  const [showModalInfo, setShowModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const rowEvents = {
    onClick: (e, row) => {
      console.log(row);
      setModalInfo(row);
      toggleTrueFalse();
    },
  };

  // useeffect for filter method

  useEffect(() => {
    setFilterData(filter===`All Launches` ? userList : userList.filter(dt=>dt.launch_success===filter))
    console.log(filter)
}, [filter]);

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };

  const ModalContent = () => {
    return (
      <>
        <Modal animation={false} show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <span className="img">
                <img
                  className={`smooth-image image-${
                    imageLoaded ? "visible" : "hidden"
                  }`}
                  src={modalInfo.links.mission_patch_small}
                  onLoad={() => setImageLoaded(true)}
                  style={{ width: 60, height: 60 }}
                  alt="none"
                />{" "}
              </span>
              <span className="mission_name"> {modalInfo.mission_name} </span>

              <p>
                {" "}
                <span className="rocket_name">
                  {" "}
                  {modalInfo.rocket.rocket_name}
                </span>
              </p>

              <p>
                <span className="details">{modalInfo.details}</span>.{" "}
                <span className="wikipedia">
                  <a href={modalInfo.links.wikipedia}>Wikipedia</a>
                </span>
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="flight_number">
              {" "}
              <span className="right"> Flight Number </span>{" "}
              <span className="left">{modalInfo.flight_number}</span>{" "}
            </div>
            <hr />
            <div className="flight_number">
              {" "}
              <span className="right"> Mission Name </span>{" "}
              <span className="left"> {modalInfo.mission_name}</span>
            </div>
            <hr />
            <div className="flight_number">
              {" "}
              <span className="right"> Rocket Type </span>{" "}
              <span className="left">{modalInfo.rocket.rocket_type}</span>{" "}
            </div>
            <hr />
            <div className="flight_number">
              {" "}
              <span className="right"> Rocket Name </span>{" "}
              <span className="left">{modalInfo.rocket.rocket_name}</span>{" "}
            </div>
            <hr />
            <div className="flight_number">
              {" "}
              <span className="right"> Manufacturer </span>{" "}
              <span className="left">
                {modalInfo.rocket.second_stage.payloads[0].manufacturer}
              </span>{" "}
            </div>
            <hr />
            <div className="flight_number">
              {" "}
              <span className="right"> Nationality </span>{" "}
              <span className="left">
                {modalInfo.rocket.second_stage.payloads[0].nationality}
              </span>{" "}
            </div>
            <hr />
            <div className="flight_number">
              {" "}
              <span className="right"> Launch Date </span>{" "}
              <span className="left" className="left">
                {modalInfo.launch_date_utc}
              </span>{" "}
            </div>
            <hr />
            <div className="flight_number">
              {" "}
              <span className="right"> Payload Type </span>{" "}
              <span className="left">
                {modalInfo.rocket.second_stage.payloads[0].payload_type}
              </span>{" "}
            </div>
            <hr />
            <div className="flight_number">
              {" "}
              <span className="right"> Orbit </span>{" "}
              <span className="left">
                {modalInfo.rocket.second_stage.payloads[0].orbit}
              </span>{" "}
            </div>
            <hr />
            <div className="flight_number">
              {" "}
              <span className="right"> Launch site </span>{" "}
              <span className="left">{modalInfo.launch_site.site_name}</span>{" "}
            </div>
            <hr />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  useEffect(() => {
    
      fetch("https://api.spacexdata.com/v3/launches/upcoming").then((response) => response.json()).then((result) => setuserList(result)).catch((error) => console.log(error));
      fetch("https://api.spacexdata.com/v3/launches").then((response) => response.json()).then((result) => setuserList(result)).catch((error) => console.log(error));
    
      
      
      
  }, []);
 
  return (
    <div className="text-center">
      <>
        <img
          className={` image-${imageLoaded ? "visible" : "hidden"}`}
          src={spacex}
          onLoad={() => setImageLoaded(true)}
          style={{ width: 455, height: 100 }}
          alt="none"
        />
         <Select labelId="demo-simple-select-label"
         id="demo-simple-select"
         style={{width:200}}
         value={filter}
         onChange={(e)=>setFilter(e.target.value)}
         >
          
          <MenuItem value={"All Launches"}>All Launches</MenuItem>
          <MenuItem value={null}>Upcoming Launches</MenuItem>
          <MenuItem value={"true"}>Successful Launches</MenuItem>
          <MenuItem value={"false"}>Failed Launches</MenuItem>
        </Select>
        <hr />
        <BootstrapTable
          keyField="id"
          columns={columns}
          data={userList}
        //  before using the filterData data={userList}
          pagination={pagination}
          rowEvents={rowEvents}
        />
       
        {show ? <ModalContent /> : null}
      </>
    </div>
    //      <div className="table-responsive">
    //          <table className="table table-hover table-borderless table-sm w-50 mx-auto my-25 ">
    //              <thead>
    //                  <tr>
    //                      <th>No</th>
    //                      <th>Launched(UTC)</th>
    //                      <th>Location</th>
    //                      <th>Mission</th>
    //                      <th>Orbit</th>
    //                      <th>Launch Status</th>
    //                      <th>Rocket</th>
    //                  </tr>
    //              </thead>
    //              <tbody>
    //                  {userList && userList.length > 0 ?
    //                      userList.map(usr =>
    //                          <tr>
    //                              <td>{usr.flight_number}</td>
    //                              <td>{usr.launch_date_utc}</td>
    //                              <td>{usr.launch_site.site_name}</td>
    //                              <td>{usr.mission_name}</td>
    //                              <td>{usr.orbit}</td>
    //                              <td>{usr.launch_success}</td>
    //                              <td>{usr.rocket.rocket_name}</td>
    //                          </tr>) : 'Loading'
    //                  }
    //              </tbody>

    //          </table>
    //      </div> */}
    //      {/* <table>
    //          <tr>
    //              <th>No</th>
    //              <th>Launched(UTC)</th>
    //              <th>Location</th>
    //              <th>Mission</th>
    //              <th>Orbit</th>
    //              <th>Launch Status</th>
    //              <th>Rocket</th>
    //          </tr>

    //          If userlist is not euals to null
    //          {userList && userList.length>0 ?
    //              userList.map(usr =>
    //                  <tr>
    //                      <td>{usr.flight_number}</td>
    //                      <td>{usr.launch_date_utc}</td>
    //                      <td>{usr.launch_site.site_name}</td>
    //                      <td>{usr.mission_name}</td>
    //                      <td>{usr.orbit}</td>
    //                      <td>{usr.launch_success}</td>
    //                      <td>{usr.rocket.rocket_name}</td>
    //                  </tr>
    //                  )   : 'Loading'
    //      }
    //  </table>
  );
};

export default DataList;
