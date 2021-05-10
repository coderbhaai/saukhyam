import React, { Component } from 'react'
import AdminSidebar from '../parts/AdminSidebar'
import { Modal } from 'reactstrap'
import api from '../parts/api'
const func = require('../parts/functions')
import { ExportReactCSV } from '../parts/ExportReactCSV'

export class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage:                1,
            itemsPerPage:               100,
            basic:                      [],
            data:                       [],
            user:                       [],
            manager:                    [],
            id:                         '',
            role:                       '',
            search:                     '',
            editmodalIsOpen:            false,
            fCentre:                     '',
            loading:                    true,
            sortRole:                   'Clear',
            sortCentre:                 'Clear',
            sortActive:                 'Clear',
            areaManager:                ''
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch( api.adminUsers, { headers: { "content-type": "application/json", Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token } } );
        const body = await response.json();
        console.log(`body`, body)
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            data:                       body.data,
            basic:                      body.basic,
            manager:                    body.manager,
            loading:                    false
        })
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    sortByRole=(e)=>{ this.setState({ sortRole: e.target.value }) }
    sortByCentre=(e)=>{ this.setState({ sortCentre: e.target.value }) }

    updateUser=(i)=>{
        // if(data.role=='Amrtiya' || data.role=='Vijaya'){
            this.setState({
                editmodalIsOpen:            true,
                user:                       i,
                id:                         i.id,
                role:                       i.role,
                fCentre:                    i.fCentre,
                areaManager:                i.manager
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

    submitHandler= (e) => {
        e.preventDefault()
        const data ={
            id:                         this.state.id,
            role:                       this.state.role,
            fCentre:                    this.state.fCentre,
            manager:                    this.state.areaManager
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
        console.log(`this.state`, this.state)
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const data =  this.state.data.filter((i)=>{ 
            if(this.state.search == null) return i; else if(i.name.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }
        })
        .filter((i)=>{ if(this.state.sortRole == null || this.state.sortRole == 'Clear') return i; else if(i.role == this.state.sortRole ){ return i } })
        .filter((i)=>{ if(this.state.sortCentre == null || this.state.sortCentre == 'Clear') return i; else if(i.fCentre == this.state.sortCentre ){ return i } })
        const renderItems =  data.slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{i.name}</td>
                    <td>{i.email}</td> 
                    <td>
                        {
                            i.role=='Admin'? 'Area Manager'
                            : i.role=='Manager'? 'Production Center In Charge'
                            : i.role=='Manager'? 'Production Center In Charge'
                            : i.role
                        }
                    </td>
                    <td>{i.fCentreName? <span>{i.fCentreName} ({i.fCentreLocation})</span>: null}</td>
                    <td>{i.managerName? <span>{i.managerName}</span>: null}</td>
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
                            <h1 className="heading"><span>Admin Panel </span>(Users)</h1>
                            {this.state.loading? <div className="loading"><img src={func.base+"/images/logo.png"}/></div> :<>
                                <div className="sortBy">
                                    <select className="form-control" required name="sort" value={this.state.sort} onChange={this.sortByRole}>
                                        <option value="Clear">Sort By Role</option> 
                                        {func.roles.map((i,index)=>(<option value={i.value} key={index}>{i.text}</option> ))}
                                        <option value="Clear">Clear Sorting</option> 
                                    </select>
                                </div>
                                <div className="sortBy">
                                    <select className="form-control" required name="sort" value={this.state.sort} onChange={this.sortByCentre}>
                                        <option value="Clear">Sort By Centre</option> 
                                        {this.state.basic.map((i,index)=>(<option value={i.id} key={index}>{i.name}</option> ))}
                                        <option value="Clear">Clear Sorting</option> 
                                    </select>
                                </div>
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
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Centre</th>
                                                <th>Manager</th>
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
                            <div className="col-sm-4">
                                <label>Change Role</label>
                                <select className="form-control" required name="role" onChange={this.onChange} value={this.state.role}>
                                    <option value=''>Select Role</option>
                                    {func.roles.map((j,index2)=>( <option value={j.value} key={index2}>{j.text}</option> ))}
                                </select>
                            </div>
                            {this.state.role=='Manager' || this.state.role=='Amrita' || this.state.role=='Vijaya'?
                                <div className="col-sm-4">
                                    <label>Allot Production Centre</label>
                                    <select className="form-control" required name="fCentre" onChange={this.onChange} value={this.state.fCentre}>
                                        <option value=''>Select Production Centre</option>
                                        {this.state.basic.map((j,index2)=>( <option value={j.id} key={index2}>{j.name}</option> ))}
                                    </select>
                                </div>
                            : null}
                            {this.state.role=='Amrita' || this.state.role=='Vijaya'?
                                <div className="col-sm-6">
                                    <label>Allot Area Manager</label>
                                    <select className="form-control" required name="areaManager" value={this.state.areaManager} onChange={this.onChange}>
                                        <option value=''>Select Area Manager</option>
                                        {this.state.manager.map((i,index)=>( <option value={i.id} key={index}>{i.name}</option> ))}
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
export default User