import React, { Component } from 'react'
import AdminSidebar from '../parts/AdminSidebar'
import api from '../parts/api'
import moment from "moment"
const func = require('../parts/functions')
import { ExportReactCSV } from '../parts/ExportReactCSV'

export class Adminrating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage:                1,
      itemsPerPage:               100,
      data:                       [],
      search:                     '',
      loading:                    true
    }
  }
  componentDidMount(){
    window.scrollTo(0, 0)
    this.callApi()
  }

  callApi = async () => {
      const response = await fetch( api.adminRating, { headers: { "content-type": "application/json", Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token } } );
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      this.setState({
          data:                       body.data,
          loading:                    false
      })
  }

  render() {
    const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const data =  this.state.data.filter((i)=>{ 
            if(this.state.search == null) return i; else if(i.review.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }
        })
        const renderItems =  data.slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{i.name}</td>
                    <td>{i.rate}</td>
                    <td>{i.review}</td>
                    <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                </tr>
        )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.data.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
    return (
      <div className="container-fluid">
          <div className="row">
              <AdminSidebar/>
              <div className="col-sm-10 admin">
                  <h1 className="heading"><span>Admin Panel </span>(Orders)</h1>
                  {this.state.loading? <div className="loading"><img src={func.base+"images/logo.png"}/></div> :<>
                      <div className="btn-pag">
                          <div className="flex-h">
                              <input type="text" placeholder="Search here" className="form-control" onChange={(e)=>this.searchSpace(e)} style={{width:'400px'}}/>
                              <select className="form-control" required value={itemsPerPage} onChange={(e)=>this.changeitemsPerPage(e)}>
                                  <option>{itemsPerPage}</option>
                                  <option value="10">10</option> 
                                  <option value="25">25</option> 
                                  <option value="50">50</option> 
                                  <option value="100">100</option> 
                              </select>
                          </div>
                          <ul className="page-numbers">{renderPagination}</ul>
                      </div>
                      <div className="table-responsive">
                          <table className="table table-hover">
                              <thead>
                                  <tr>
                                      <th>Sl No.</th>
                                      <th>User</th>
                                      <th>Rating</th>
                                      <th>Message</th>
                                      <th>Date</th>
                                  </tr>
                              </thead>
                              <tbody>{renderItems}</tbody>
                          </table>
                          <ExportReactCSV csvData={data} fileName={'Contact -'+func.time+'.xls'}/>
                      </div>
                      <ul className="page-numbers">{renderPagination}</ul>
                  </>}
              </div>
          </div>
      </div>
    )
  }
}

export default Adminrating