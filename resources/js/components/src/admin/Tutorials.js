import React, { Component } from 'react'
import AdminSidebar from '../parts/AdminSidebar'
import { Modal } from 'reactstrap'
import api from '../parts/api'
const func = require('../parts/functions')
import { ExportReactCSV } from '../parts/ExportReactCSV'

export class Tutorials extends Component {
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
            url:                        '',
            description:                '',
            status:                     '',
            image:                      null,
            oldImage:                   '',
            loading:                    true,
            sort:                       'Clear',
            sortActive:                 'Clear'
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch( api.adminTutorials, { headers: { "content-type": "application/json", Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token } } );
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
    singleImage = (e) =>{ this.setState({ image: e.target.files[0] })}
    changeSort=(e)=>{ this.setState({ sort: e.target.value }) }
    sortActive=(e)=>{ this.setState({ sortActive: e.target.value })}

    addModal = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('file', this.state.image)
        data.append('type', this.state.type)
        data.append('name', this.state.name)
        data.append('url', this.state.url)
        data.append('status', this.state.status)
        data.append('description', this.state.description)
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.createTutorial, data)
        .then( res=> {
            if(res.data.success){ this.setState({ data: [res.data.data, ...this.state.data] }) }
            func.callSwal(res.data.message)
            this.resetData()
        })
        .catch(err=>func.printError(err))
    }

    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:                true,
            id:                             i.id,
            type:                           i.type,
            name:                           i.name,
            description:                    i.description,
            status:                         i.status
        })
        if(i.type=='Doc' || i.type=='Video'){ this.setState({ oldImage: i.url }) }
    }

    updateModal = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('id', this.state.id)
        data.append('file', this.state.image)
        data.append('type', this.state.type)
        data.append('name', this.state.name)
        data.append('url', this.state.url)
        data.append('status', this.state.status)
        data.append('description', this.state.description)
        data.append('oldImage', this.state.oldImage)
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.updateTutorial, data)
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
            url:                        '',
            status:                     '',
            description:                '',
            image:                      null,
            oldImage:                   ''
        })
    }

    changeStatus=(i, value)=>{
        if(value == 1){ var status = 0 }else{ var status = 1}
        const data={
            id:                         i.id,
            status:                     status
        }
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.changeTutorialStatus, data)
        .then( res=>{
            if(res.data.success){ this.setState({ data: this.state.data.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) }) }
            func.callSwal(res.data.message)
        })
        .catch(err=>func.printError(err))
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const data =  this.state.data
        .filter((i)=>{ 
            if(this.state.search == null) return i; else if(i.name.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }
        })
        .filter((i)=>{ 
            if(this.state.sort == null || this.state.sort == 'Clear') return i; else if(i.type == this.state.sort ){ return i }
        })
        .filter((i)=>{ 
            if(this.state.sortActive == null || this.state.sortActive == 'Clear') return i; else if(i.status == parseInt(this.state.sortActive) ){ return i }
        })
        const renderItems =  data.slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        {
                            i.type == 'Doc'? 'Document'
                            : i.type == 'Iframe'? 'Youtube Link'
                            : i.type
                        }
                    </td> 
                    <td>{i.name}</td>
                    <td>
                        <div className="onoffswitch">
                            <input type="checkbox" name="statusSwitch" className="onoffswitch-checkbox" id={'Switch-'+i.id} onChange={(e)=>this.changeStatus(i, e.target.value)} value={i.status} checked={i.status==1? true : false}/>
                            <label className="onoffswitch-label" htmlFor={'Switch-'+i.id}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                        </div>
                    </td>
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
                            <h1 className="heading"><span>Admin Panel </span>(Tutorials)</h1>
                            {this.state.loading? <div className="loading"><img src={func.base+"/images/logo.png"}/></div> :<>
                                <div className="sortBy">
                                    <select className="form-control" required name="sort" value={this.state.sort} onChange={this.changeSort}>
                                        <option value="Clear">Sort By</option> 
                                        <option value="Doc">Document</option>
                                        <option value="Iframe">Youtube Link</option>
                                        <option value="Video">Video</option>
                                        <option value="Clear">Clear Sorting</option>
                                    </select>
                                </div>
                                <div className="sortBy">
                                    <select className="form-control" required name="sortActive" value={this.state.sortActive} onChange={this.sortActive}>
                                        <option value="Clear">Sort By Status</option> 
                                        <option value="0">Not Active</option>
                                        <option value="1">Active</option>
                                        <option value="Clear">Clear Sorting</option> 
                                    </select>
                                </div>
                                <div className="btn-pag">
                                    <button className="amitBtn" onClick={this.addModalOn}>Add Tutorial</button>
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
                                                <th>Status</th>
                                                <th>Edit </th>
                                            </tr>
                                        </thead>
                                        <tbody>{renderItems}</tbody>
                                    </table>
                                    <ExportReactCSV csvData={data} fileName={'Tutorials -'+func.time+'.xls'}/>
                                </div>
                                <ul className="page-numbers">{renderPagination}</ul>
                            </>}
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.addmodalIsOpen} className="adminModal">
                    <div className="modal-header"><h2>Add Tutorial Here</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                    <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.addModal}>
                        <div className="row">
                            <div className={this.state.type? "col-sm-4" : "col-sm-12"}>
                                <label>Type of Tutorial</label>
                                <select className="form-control" required name="type" onChange={this.onChange} value={this.state.type}>
                                    <option value=''>Select Type</option>
                                    <option value="Doc">Document</option>
                                    <option value="Iframe">Youtube Link</option>
                                    <option value="Video">Video</option>
                                </select>
                            </div>
                            {this.state.type?
                                <div className="col-sm-4">
                                    <label>Status of Product</label>
                                    <select className="form-control" required name="status" onChange={this.onChange} value={this.state.status}>
                                        <option value=''>Select Status</option>
                                        <option value="1">Show</option>
                                        <option value="0">Hide</option>
                                    </select>
                                </div>
                            : null}
                            {this.state.type ==='Doc'? 
                                <div className="col-sm-4">
                                    <label>Upload Document</label>
                                    <input className="form-control" placeholder="Add Location Here" type="file" onChange={this.singleImage}/>
                                </div> 
                            : null}
                            {this.state.type ==='Iframe'? 
                                <div className="col-sm-4">
                                    <label>Video Link</label>
                                    <input className="form-control" placeholder="Video URL" type="text" name="url" value={this.state.url} onChange={this.onChange}/>
                                </div>
                            : null}
                            {this.state.type ==='Video'?
                                <div className="col-sm-4">
                                    <label>Upload Video</label>
                                    <input className="form-control" placeholder="Add Location Here" type="file" onChange={this.singleImage}/>
                                </div> 
                            : null}   
                            {this.state.type? 
                            <>
                                <div className="col-sm-12">
                                    <label>Name of Document</label>
                                    <input className="form-control" placeholder="Name of Document" type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                                </div>                    
                                <div className="col-sm-12">
                                    <label>Description</label>
                                    <textarea className="form-control" placeholder="Add Description Here" name="description" onChange={this.onChange} value={this.state.description}/>
                                </div> 
                                <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                            </>
                            : null}
                        </div>
                    </form>
                </Modal>
                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <div className="modal-header"><h2>Update Tutorial Here</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                    <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.updateModal}>
                        <div className="row">
                            <div className="col-sm-4">
                                <label>Type of Tutorial</label>
                                <select className="form-control" required name="type" onChange={this.onChange} value={this.state.type} readOnly>
                                    <option>{this.state.type}</option>
                                </select>
                            </div>
                            {this.state.type?
                                <div className="col-sm-4">
                                    <label>Status of Tutorial</label>
                                    <select className="form-control" required name="status" onChange={this.onChange} value={this.state.status}>
                                        <option value=''>Select Status</option>
                                        <option value="1">Show</option>
                                        <option value="0">Hide</option>
                                    </select>
                                </div>
                            : null}
                            {this.state.type ==='Doc'? 
                                <div className="col-sm-4">
                                    <label>Upload Document</label>
                                    <input className="form-control" placeholder="Add Location Here" type="file" onChange={this.singleImage}/>
                                    {this.state.oldImage? <a href={func.imgPath+'tutorial/'+this.state.oldImage} target="_blank">Old File</a> : null }
                                </div>
                            : null}
                            {this.state.type ==='Iframe'? 
                                <div className="col-sm-4">
                                    <label>Video Link</label>
                                    <input className="form-control" placeholder="Video URL" type="text" name="url" value={this.state.url} onChange={this.onChange}/>
                                </div>
                            : null}
                            {this.state.type ==='Video'?
                                <div className="col-sm-4">
                                    <label>Upload Video</label>
                                    <input className="form-control" placeholder="Add Location Here" type="file" onChange={this.singleImage}/>
                                </div> 
                            : null}   
                            {this.state.type?<>
                                <div className="col-sm-12">
                                    <label>Name of Document</label>
                                    <input className="form-control" placeholder="Name of Document" type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                                </div>
                                <div className="col-sm-12">
                                    <label>Description</label>
                                    <textarea className="form-control" placeholder="Add Description Here" name="description" onChange={this.onChange} value={this.state.description}/>
                                </div>
                            </>: null}
                            <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                        </div>
                    </form>
                </Modal>
            </>
        )
    }
}
export default Tutorials