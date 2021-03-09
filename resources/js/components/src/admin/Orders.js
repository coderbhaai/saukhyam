import React, { Component } from 'react'
import AdminSidebar from '../parts/AdminSidebar'
import moment from "moment"
import api from '../parts/api'
const func = require('../parts/functions')
import { ExportReactCSV } from '../parts/ExportReactCSV'
import { Modal } from 'reactstrap'

export class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage:                1,
            itemsPerPage:               100,
            basic:                      [],
            data:                       [],
            search:                     '',
            editmodalIsOpen:            false,
            id:                         '',
            status:                     '',
            remarks:                    '',
            shipping:                   '',
            loading:                    true
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch( api.adminOrders, { headers: { "content-type": "application/json", Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token } } );
        const body = await response.json();
        console.log('body', body)
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            data:                       body.data,
            basic:                      body.basic,
            loading:                    false
        })
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }

    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:                true,
            id:                             i.id,
            status:                         i.status,
            shipping:                       i.shipping,
            remarks:                        i.remarks,
            centre:                         i.centre,
        })
    }

    updateModal = (e) => {
        e.preventDefault()
        const data={
            id:                     this.state.id,
            status:                 this.state.status,
            shipping:               this.state.shipping,
            remarks:                this.state.remarks,
            centre:                 this.state.centre,
        }
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.updateOrder, data)
        .then( res=> {
            if(res.data.success){ 
                this.setState({ data: this.state.data.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
            }
            func.callSwal(res.data.message)
        })
        .catch(err=>func.printError(err))
        this.resetData()
    }

    resetData = ()=>{
        this.setState({
            editmodalIsOpen:                false,
            id:                             '',
            status:                         '',
            shipping:                       '',
            remarks:                        '',
            centre:                         '',
        })
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const data =  this.state.data.filter((i)=>{ 
            if(this.state.search == null) return i; else if(i.name.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }
        })
        const renderItems =  data.slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{i.name}<br/>{i.email}<br/>{i.phone}</td>
                    <td>
                        {JSON.parse(i.order).map((j,index2)=>(
                            <div key={index2}>
                                {/* <img src={func.imgPath+'product/'+j[3]} className="previewImg"/> */}
                                {j[2]} X {j[1]}
                            </div>
                        ))}
                    </td> 
                    <td>{i.status}</td> 
                    <td>{i.discount}</td> 
                    <td>{i.payment}</td> 
                    <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                    <td className="editIcon text-center" onClick={()=>this.editModalOn(i)}><img src="/images/icons/edit.svg"/></td>
                </tr>
        )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.data.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <AdminSidebar/>
                        <div className="col-sm-10 admin">
                            <h1 className="heading"><span>Admin Panel </span>(Orders)</h1>
                            {this.state.loading? <div className="loading"><img src={func.base+"/images/logo.png"}/></div> :<>
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
                                                <th>Order By</th>
                                                <th>Order</th>
                                                <th>Status</th>
                                                <th>Discount</th>
                                                <th>Payment</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>{renderItems}</tbody>
                                    </table>
                                    <ExportReactCSV csvData={data} fileName={'Orders -'+func.time+'.xls'}/>
                                </div>
                                <ul className="page-numbers">{renderPagination}</ul>
                            </>}
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <div className="modal-header"><h2>Update Order Here</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                    <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.updateModal}>
                        <div className="row">
                            <div className="col-sm-3">
                                <label>Order Status</label>
                                <select className="form-control" required name="status" onChange={this.onChange} value={this.state.status}>
                                    <option value="">Select Status</option>
                                    <option value="Ordered">Ordered</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Under shiping">Under shiping</option>
                                    <option value="Processing">Processing</option>
                                </select>
                            </div>
                            <div className="col-sm-3">
                                <label>Fulfillment Centre</label>
                                <select className="form-control" required name="centre" onChange={this.onChange} value={this.state.centre}>
                                    <option value=''>Select Fulfillment Centre</option>
                                    {this.state.basic.filter(i=>i.type=='FCentre').map((j,index2)=>( <option value={j.id} key={index2}>{j.name}</option> ))}
                                </select>
                            </div> 
                            <div className="col-sm-6">
                                <label>Shipping</label>
                                <input className="form-control" placeholder="Add Shipping Details Here" type="text" name="shipping" value={this.state.shipping} onChange={this.onChange}/>
                            </div> 
                            <div className="col-sm-12">
                                <label>Remarks</label>
                                <textarea className="form-control" placeholder="Remarks" type="text" name="remarks" value={this.state.remarks} onChange={this.onChange}/>
                            </div>
                            <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                        </div>
                    </form>
                </Modal>
            </>
        )
    }
}
export default User