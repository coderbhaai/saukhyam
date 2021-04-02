import React, { Component } from 'react'
import AdminSidebar from '../parts/AdminSidebar'
import { Modal } from 'reactstrap'
import api from '../parts/api'
const func = require('../parts/functions')
import { ExportReactCSV } from '../parts/ExportReactCSV'

export class ProductionCentre extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage:                1,
            itemsPerPage:               100,
            data:                      [],
            search:                     '',
            addmodalIsOpen:             false,
            editmodalIsOpen:            false,
            id:                         '',
            name:                       '',
            state:                      '',
            city:                       '',
            address:                    '',
            pin:                        '',
            team:                       [],
            loading:                    true
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch( api.adminCentres, { headers: { "content-type": "application/json", Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token } } );
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            data:                       body.data,
            loading:                    false
        })
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) } 
    addTeam=()=>{ this.setState({ team: [ ...this.state.team, ['', '', 0] ] }) }
    changeTeamName=(index, value)=>{ this.state.team[index][0] = value; this.setState({ team: this.state.team }) }
    changeTeamPhone=(index, value)=>{
        if(value.length<=10){
            this.state.team[index][1] = value; this.setState({ team: this.state.team }) 
        }else{
            func.callSwal('Phone number of 10 digits only')
        }
    }
    
    changeTeamDisplay=(index, value)=>{
        if(value == 1){ var status = 0 }else{ var status = 1}
        this.state.team[index][2] = status; this.setState({ team: this.state.team })
    }
    arrayTeamRemove(index){ this.state.team.splice(index, 1); this.setState({team: this.state.team}) }

    addModal = (e) => {
        e.preventDefault()
        const data={
            name:                           this.state.name,
            state:                          this.state.state,
            city:                           this.state.city,
            address:                        this.state.address,
            pin:                            this.state.pin,
            team:                           JSON.stringify(this.state.team),
        }
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.createCentre, data)
        .then( res=> {
            if(res.data.success){ this.setState({ data: [...this.state.data, res.data.data ] }) }
            func.callSwal(res.data.message)
            this.resetData()
        })
        .catch(err=>func.printError(err))
    }

    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:                true,
            id:                             i.id,
            name:                           i.name,
            state:                          i.state,
            city:                           i.city,
            pin:                            i.pin,
            address:                        i.address,
            team:                           JSON.parse(i.team),
        })
    }

    updateModal = (e) => {
        e.preventDefault()
        const data={
            id:                             this.state.id,
            name:                           this.state.name,
            state:                          this.state.state,
            city:                           this.state.city,
            pin:                            this.state.pin,
            address:                        this.state.address,
            team:                           JSON.stringify(this.state.team),
        }
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.updateCentre, data)
        .then( res=> {
            if(res.data.success){ this.setState({ data: this.state.data.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) }) }
            func.callSwal(res.data.message)
        })
        .catch(err=>func.printError(err))
        this.resetData()
    }

    resetData = ()=>{
        this.setState({
            addmodalIsOpen:             false,
            editmodalIsOpen:            false,
            id:                         '',
            name:                       '',
            state:                      '',
            city:                       '',
            pin:                        '',
            address:                    '',
            team:                       [],
        })
    }

    pinChange = (e) => {
        if(e.target.value.length<=6){
            this.setState({ [e.target.name]: e.target.value }) 
        }else{
            func.callSwal('PIN should be of 6 digits only')
        }
    }   

    render() {
        console.log(`this.state.team`, this.state.team)
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const data =  this.state.data
            .filter((i)=>{ 
                if(this.state.search == null) return i; else if(i.name.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }
            })
        const renderItems =  data.slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td> 
                    <td>{i.name}</td>
                    <td>{i.address}, {i.city}, {i.state}, PIN - {i.pin}</td>
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
                            <h1 className="heading"><span>Admin Panel </span>(Production Centre)</h1>
                            {this.state.loading? <div className="loading"><img src={func.base+"/images/logo.png"}/></div> :<>
                                <div className="btn-pag">
                                    <button className="amitBtn" onClick={this.addModalOn}>Add Production Centre</button>
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
                                                <th>Address</th>
                                                <th>Edit </th>
                                            </tr>
                                        </thead>
                                        <tbody>{renderItems}</tbody>
                                    </table>
                                    <ExportReactCSV csvData={data} fileName={'Masters -'+func.time+'.xls'}/>
                                </div>
                                <ul className="page-numbers">{renderPagination}</ul>
                            </>}
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.addmodalIsOpen} className="adminModal">
                    <div className="modal-header"><h2>Add Production Centre Here</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                    <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.addModal}>
                        <div className="row">
                            <div className="col-sm-3">
                                <label>Name of Centre</label>
                                <input className="form-control" placeholder="Add Production Centre Here" type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-3">
                                <label>State</label>
                                <input className="form-control" placeholder="Add State Here" type="text" name="state" value={this.state.state} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-3">
                                <label>District</label>
                                <input className="form-control" placeholder="Add City Here" type="text" name="city" value={this.state.city} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-3">
                                <label>PIN</label>
                                <input className="form-control" placeholder="Add PIN Here" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="pin" value={this.state.pin} onChange={this.pinChange}/>
                            </div>
                            <div className="col-sm-12">
                                <label>Address</label>
                                <input className="form-control" placeholder="Add Address Here" type="text" name="address" value={this.state.address} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-12 mt-3">
                                <p onClick={this.addTeam} className="amitBtn">Add Support Team Member</p>
                                {this.state.team.map((i,index)=>(
                                    <div className="row mb-3" key={index}>
                                        <div className="col-sm-6">
                                            <label>Name</label>
                                            <input className="form-control" placeholder="Add Name Here" type="text" value={i[0]} onChange={(e)=>this.changeTeamName(index, e.target.value)}/>
                                        </div>
                                        <div className="col-sm-4">
                                            <label>Mobile Phone</label>
                                            <input className="form-control" placeholder="Add Mobile Phone Here" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" value={i[1]} onChange={(e)=>this.changeTeamPhone(index, e.target.value)}/>
                                        </div>
                                        <div className="col-sm-2" style={{display: 'flex'}}>
                                            <div className="onoffswitch">
                                                <input type="checkbox" name="statusSwitch" className="onoffswitch-checkbox" id={'Switch-'+index} onChange={(e)=>this.changeTeamDisplay(index, e.target.value)} value={i[2]} checked={i[2]==1? true : false}/>
                                                <label className="onoffswitch-label" htmlFor={'Switch-'+index}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                                            </div>
                                            <div className="arrayRemove">
                                                <img src="/images/icons/wrong.svg"  onClick={()=>this.arrayTeamRemove(index)}/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                        </div>
                    </form>
                </Modal>
                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <div className="modal-header"><h2>Update Production Centre Here</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                    <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.updateModal}>
                        <div className="row">
                            <div className="col-sm-3">
                                <label>Name of Centre</label>
                                <input className="form-control" placeholder="Add Production Centre Here" type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-3">
                                <label>State</label>
                                <input className="form-control" placeholder="Add State Here" type="text" name="state" value={this.state.state} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-3">
                                <label>District</label>
                                <input className="form-control" placeholder="Add City Here" type="text" name="city" value={this.state.city} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-3">
                                <label>PIN</label>
                                <input className="form-control" placeholder="Add PIN Here" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="pin" value={this.state.pin} onChange={this.pinChange}/>
                            </div>
                            <div className="col-sm-12">
                                <label>Address</label>
                                <input className="form-control" placeholder="Add Address Here" type="text" name="address" value={this.state.address} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-12 mt-3">
                                <p onClick={this.addTeam} className="amitBtn">Add Support Team Member</p>
                                {this.state.team.map((i,index)=>(
                                    <div className="row mb-3" key={index}>
                                        <div className="col-sm-6">
                                            <label>Name</label>
                                            <input className="form-control" placeholder="Add Name Here" type="text" value={i[0]} onChange={(e)=>this.changeTeamName(index, e.target.value)}/>
                                        </div>
                                        <div className="col-sm-4">
                                            <label>Mobile Phone</label>
                                            <input className="form-control" placeholder="Add Mobile Phone Here" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" value={i[1]} onChange={(e)=>this.changeTeamPhone(index, e.target.value)}/>
                                        </div>
                                        <div className="col-sm-2" style={{display: 'flex'}}>
                                            <div className="onoffswitch">
                                                <input type="checkbox" name="statusSwitch" className="onoffswitch-checkbox" id={'Switch-'+index} onChange={(e)=>this.changeTeamDisplay(index, e.target.value)} value={i[2]} checked={i[2]==1? true : false}/>
                                                <label className="onoffswitch-label" htmlFor={'Switch-'+index}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                                            </div>
                                            <div className="arrayRemove">
                                                <img src="/images/icons/wrong.svg"  onClick={()=>this.arrayTeamRemove(index)}/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                        </div>
                    </form>
                </Modal>
            </>
        )
    }
}
export default ProductionCentre