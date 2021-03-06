import React, { Component } from 'react'
import AdminSidebar from '../parts/AdminSidebar'
import { Modal } from 'reactstrap'
import api from '../parts/api'
const func = require('../parts/functions')

export class User extends Component {
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
            type:                       '',
            name:                       '',
            tab1:                       '',
            tab2:                       '',
            tab3:                       '',
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch( api.adminBasics, { headers: { "content-type": "application/json", Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token } } );
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            data:          body.data
        })
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) } 

    addModal = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('type', this.state.type)
        data.append('name', this.state.name)
        data.append('tab1', this.state.tab1)
        data.append('tab2', this.state.tab2)
        data.append('tab3', this.state.tab3)
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.createBasic, data)
        .then( res=> {
            if(res.data.success){ this.setState({ data: [...this.state.data, res.data.data ] }) }
            func.callSwal(res.data.message)
            // this.resetData()
        })
        .catch(err=>func.printError(err))
    }

    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:                true,
            id:                             i.id,
            name:                           i.name,
            type:                           i.type
        })
        if(i.tab1){ this.setState({ tab1: i.tab1 }) }
        if(i.tab2){ this.setState({ tab2: i.tab2 }) }
        if(i.tab3){ this.setState({ tab3: i.tab3 }) }
    }

    updateModal = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('id', this.state.id)
        data.append('type', this.state.type)
        data.append('name', this.state.name)
        data.append('tab1', this.state.tab1)
        data.append('tab2', this.state.tab2)
        data.append('tab3', this.state.tab3)        
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.updateBasic, data)
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
            addmodalIsOpen:             false,
            editmodalIsOpen:            false,
            id:                         '',
            type:                       '',
            name:                       '',
            tab1:                       '',
            tab2:                       '',
            tab3:                       '',
        })
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.data.slice(indexOfFirstItem, indexOfLastItem).filter((i)=>{ if(this.state.search == null) return i; else if(i.name.toLowerCase().includes(this.state.search.toLowerCase()) || i.type.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }}).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        {
                            i.type == 'MOQ'? 'Minimum Order Quantity'
                            : i.type == 'FCentre'? 'Fulfillment Centre'
                            : i.type == 'ProductType'? 'Product Type'
                            : i.type == 'DimensionType'? 'Dimension Type'
                            : i.type == 'DimensionValue'? 'Dimension Value'
                            : i.type == 'Screen'? 'App Screen'
                            : i.type == 'Languages'? 'Languages'
                            : i.type
                        }
                    </td> 
                    <td>{i.name}</td>
                    <td>{ i.type=='DimensionValue' ? i.bName : i.tab1 }</td> 
                    <td>{i.tab2}</td> 
                    <td>{i.tab3}</td> 
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
                            <h1 className="heading"><span>Admin Panel </span>(Basics)</h1>
                            <div className="btn-pag">
                                <button className="amitBtn" onClick={this.addModalOn}>Add Basic</button>
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
                                            <th>Type</th>
                                            <th>Name</th>
                                            <th>Tab1 </th>
                                            <th>Tab2 </th>
                                            <th>Tab3 </th>
                                            <th>Edit </th>
                                        </tr>
                                    </thead>
                                    <tbody>{renderItems}</tbody>
                                </table>
                            </div>
                            <ul className="page-numbers">{renderPagination}</ul>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.addmodalIsOpen} className="adminModal">
                    <div className="modal-header">
                        <h2>Add Basics Here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.addModal}>
                        <div className="row">
                            <div className={this.state.type? "col-sm-4" : "col-sm-12"}>
                                <label>Type of Basic</label>
                                <select className="form-control" required name="type" onChange={this.onChange} value={this.state.type}>
                                    <option value=''>Select Type</option>
                                    {func.basic.map((j,index2)=>(  !this.state.data.some(el => el.type == j.value && j.single)? <option value={j.value} key={index2}>{j.text}</option> : null ))}
                                </select>
                            </div>
                            {this.state.type ==='MOQ'? <div className="col-sm-8"><label>Minimum Order Quantity</label><input className="form-control" placeholder="Set MOQ Here" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="name" value={this.state.name} onChange={this.onChange}/></div> : null}
                            {this.state.type ==='Screen'? <div className="col-sm-8"><label>App Screen Name</label><input className="form-control" placeholder="Add App Screen Name Here" type="text" name="name" value={this.state.name} onChange={this.onChange}/></div> : null}
                            {this.state.type ==='Language'? <div className="col-sm-8"><label>Language</label><input className="form-control" placeholder="Set Language Here" type="text" name="name" value={this.state.name} onChange={this.onChange}/></div> : null}
                            {this.state.type ==='FCentre'? 
                                <>
                                    <div className="col-sm-4">
                                        <label>Fulfillment Centre</label>
                                        <input className="form-control" placeholder="Add Fulfillment Centre Here" type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                                    </div> 
                                    <div className="col-sm-4">
                                        <label>Location</label>
                                        <input className="form-control" placeholder="Add Location Here" type="text" name="tab1" value={this.state.tab1} onChange={this.onChange}/>
                                    </div> 
                                </>
                            : null}
                            {this.state.type ==='ProductType'? 
                                <div className="col-sm-8">
                                    <label>Product Type</label>
                                    <input className="form-control" placeholder="Add Product Type Here" type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                                </div>
                            : null}
                            {this.state.type ==='DimensionType'? 
                                <>
                                    <div className="col-sm-8">
                                        <label>Dimension Type</label>
                                        <input className="form-control" placeholder="Add Dimension Type Here" type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                                    </div>
                                </>
                            : null}
                            {this.state.type ==='DimensionValue'? 
                                <>
                                    <div className="col-sm-4">
                                        <label>Dimension Type</label>
                                        <select className="form-control" required name="tab1" onChange={this.onChange} value={this.state.tab1}>
                                            <option value=''>Select Dimension Type</option>
                                            {this.state.data.filter(i=>i.type=='DimensionType').map((j,index2)=>( <option value={j.id} key={index2}>{j.name}</option> ))}
                                        </select>
                                    </div> 
                                    <div className="col-sm-4">
                                        <label>Dimension Value</label>
                                        <input className="form-control" placeholder="Add Dimension Value Here" type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                                    </div> 
                                </>
                            : null}
                            <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                        </div>
                    </form>
                </Modal>
                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <div className="modal-header">
                        <h2>Update Basics Here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.updateModal}>
                        <div className="row">
                            <div className="col-sm-4">
                                <label>Type of Basic</label>
                                <select className="form-control" required name="type" onChange={this.onChange} value={this.state.type} readOnly>
                                    <option>{this.state.type}</option>
                                </select>
                            </div>
                            {this.state.type ==='MOQ'? <div className="col-sm-8"><label>Minimum Order Quantity</label><input className="form-control" placeholder="Set MOQ Here" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="name" value={this.state.name} onChange={this.onChange}/></div> : null}
                            {this.state.type ==='Screen'? <div className="col-sm-8"><label>App Screen Name</label><input className="form-control" placeholder="Add App Screen Name Here" type="text" name="name" value={this.state.name} onChange={this.onChange}/></div> : null}
                            {this.state.type ==='Language'? <div className="col-sm-8"><label>Language</label><input className="form-control" placeholder="Set Language Here" type="text" name="name" value={this.state.name} onChange={this.onChange}/></div> : null}
                            {this.state.type ==='FCentre'? 
                                <>
                                    <div className="col-sm-4">
                                        <label>Fulfillment Centre</label>
                                        <input className="form-control" placeholder="Add Fulfillment Centre Here" type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                                    </div> 
                                    <div className="col-sm-4">
                                        <label>Location</label>
                                        <input className="form-control" placeholder="Add Location Here" type="text" name="tab1" value={this.state.tab1} onChange={this.onChange}/>
                                    </div> 
                                </>
                            : null}
                            {this.state.type ==='ProductType'? 
                                <div className="col-sm-8">
                                    <label>Product Type</label>
                                    <input className="form-control" placeholder="Add Product Type Here" type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                                </div>
                            : null}
                            {this.state.type ==='DimensionType'? 
                                <>
                                    <div className="col-sm-8">
                                        <label>Dimension Type</label>
                                        <input className="form-control" placeholder="Add Dimension Type Here" type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                                    </div>
                                </>
                            : null}
                            {this.state.type ==='DimensionValue'? 
                                <>
                                    <div className="col-sm-4">
                                        <label>Dimension Type</label>
                                        <select className="form-control" required name="tab1" onChange={this.onChange} value={this.state.tab1}>
                                            <option value=''>Select Dimension Type</option>
                                            {this.state.data.filter(i=>i.type=='DimensionType').map((j,index2)=>( <option value={j.id} key={index2}>{j.name}</option> ))}
                                        </select>
                                    </div> 
                                    <div className="col-sm-4">
                                        <label>Dimension Value</label>
                                        <input className="form-control" placeholder="Add Dimension Value Here" type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                                    </div> 
                                </>
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