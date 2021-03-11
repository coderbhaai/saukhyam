import React, { Component } from 'react'
import AdminSidebar from '../parts/AdminSidebar'
import { Modal } from 'reactstrap'
import api from '../parts/api'
const func = require('../parts/functions')
import { ExportReactCSV } from '../parts/ExportReactCSV'

export class Network extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage:                1,
            itemsPerPage:               100,
            basic:                      [],
            data:                       [],
            user:                       [],
            id:                         '',
            role:                       '',
            search:                     '',
            editmodalIsOpen:            false,
            fCentre:                     '',
            loading:                    true
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch( api.adminUsers, { headers: { "content-type": "application/json", Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token } } );
        const body = await response.json();
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
    updateUser=(i)=>{
        // if(data.role=='Amrtiya' || data.role=='Vijaya'){
            this.setState({
                editmodalIsOpen:            true,
                user:                       i,
                id:                         i.id,
                role:                       i.role,
                fCentre:                    i.fCentre
            })
        // }
    }

    resetData = ()=>{
        this.setState({
            editmodalIsOpen:            false,
            user:                       [],
            id:                         '',
            role:                       '',
        })
    }
    changeRole=(e)=>{
        this.setState({ 
            role:                       e.target.value
        })
    }

    submitHandler= (e) => {
        e.preventDefault()
        const data ={
            id:                         this.state.id,
            role:                       this.state.role,
            fCentre:                    this.state.fCentre,
        }
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.updateUser, data)
        .then( res=> {
            if(res.data.success){
                this.setState({ data: this.state.data.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
            }
            func.callSwal(res.data.message)
            this.resetData()
        })
        .catch(err=>func.printError(err))
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
                    <td>{i.name}</td>
                    <td>
                        {
                            i.role=='Admin'? 'Area Manager'
                            : i.role=='Manager'? 'Production Center In Charge'
                            : i.role=='Manager'? 'Production Center In Charge'
                            : i.role
                        }
                    </td> 
                    <td>{i.fCentre}</td>
                    <td></td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" onClick={()=>this.updateUser(i)}/></td>
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
                            <h1 className="heading"><span>Admin Panel </span>(Network)</h1>
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
                                                <th>Name</th>
                                                <th>Role</th>
                                                <th>Centre</th>
                                                <th>Area Manager</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>{renderItems}</tbody>
                                    </table>
                                    <ExportReactCSV csvData={data} fileName={'Users -'+func.time+'.xls'}/>
                                </div>
                                <ul className="page-numbers">{renderPagination}</ul>
                            </>}
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <div className="modal-header"><h2>Update User Here</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                    <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.submitHandler}>
                        <div className="row">
                            <div className="col-sm-4">
                                <label>User</label>
                                <input className="form-control" type="text" value={this.state.user.name} readOnly/>
                            </div>
                            <div className={this.state.role=='Amrita' || this.state.role=='Vijaya' || this.state.role=='Manager'? "col-sm-4" :"col-sm-8"} >
                                <label>Change Role</label>
                                <select className="form-control" required name="role" onChange={this.changeRole} value={this.state.role}>
                                    <option value=''>Select Role</option>
                                    {func.roles.map((j,index2)=>( <option value={j.value} key={index2}>{j.text}</option> ))}
                                </select>
                            </div>
                            {this.state.role=='Amrita' || this.state.role=='Vijaya' || this.state.role=='Manager'?
                                <div className="col-sm-4">
                                    <label>Allot Production Centre</label>
                                    <select className="form-control" required name="fCentre" onChange={this.onChange} value={this.state.fCentre}>
                                        <option value=''>Select Production Centre</option>
                                        {this.state.basic.map((j,index2)=>( <option value={j.id} key={index2}>{j.name}</option> ))}
                                    </select>
                                </div>
                            : null}
                            <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                        </div>
                    </form>
                </Modal>
            </>
        )
    }
}
export default Network