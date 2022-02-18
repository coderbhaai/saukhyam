import React, { Component } from 'react'
import AdminSidebar from '../parts/AdminSidebar'
import { Modal } from 'reactstrap'
import api from '../parts/api'
const func = require('../parts/functions')
import { ExportReactCSV } from '../parts/ExportReactCSV'

export class Videos extends Component {
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
            language:                   '',
            image:                      '',
            oldImage:                   '',
            link:                       '',
            status:                     '',
            langOptions:                [],
            loading:                    true,
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch( api.adminVideos, { headers: { "content-type": "application/json", Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token } } );
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        console.log('body.data', body.data)
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
    uploadImage = (e) =>{ this.setState({ image: e.target.files[0] }) }

    addModal = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('language', this.state.language)
        data.append('link', this.state.link)
        data.append('status', this.state.status)
        data.append('file', this.state.image)
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.createVideo, data)
        .then( res=> {
            if(res.data.success){ this.setState({ data: [ res.data.data, ...this.state.data ] }) }
            func.callSwal(res.data.message)
            this.resetData()
        })
        .catch(err=>func.printError(err))
    }

    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:                true,
            id:                             i.id,
            language:                       i.language,
            link:                           i.link,
            status:                         i.status,
            oldImage:                       i.image,
        })
    }

    updateModal = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('id', this.state.id)
        data.append('language', this.state.language)
        data.append('link', this.state.link)
        data.append('status', this.state.status)
        data.append('file', this.state.image)
        data.append('oldImage', this.state.oldImage)
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.updateVideo, data)
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
            language:                   '',
            link:                       '',
            image:                      '',
            oldImage:                   '',
            status:                     '',
        })
    }

    changeStatus=(i, value)=>{
        if(value == 1){ var status = 0 }else{ var status = 1}
        const data={
            id:                         i.id,
            status:                     status
        }
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.changeVideoStatus, data)
        .then( res=>{
            if(res.data.success){ this.setState({ data: this.state.data.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) }) }
            func.callSwal(res.data.message)
        })
        .catch(err=>func.printError(err))
    }

    render() {
        console.log('this.state.image :>> ', this.state.image);
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const data =  this.state.data
            .filter((i)=>{ 
                if(this.state.search == null) return i; else if(i.link.toLowerCase().includes(this.state.search.toLowerCase()) || i.language.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }
            })
        const renderItems =  data.slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{i.language}</td>
                    <td><img className="previewImg" src={func.imgPath+'video/'+i.image}/></td>
                    <td>{i.link}</td> 
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
                            <h1 className="heading"><span>Admin Panel </span>(Videos)</h1>
                            {this.state.loading? <div className="loading"><img src={func.base+"images/logo.png"}/></div> :<>
                                <div className="btn-pag">
                                    <button className="amitBtn" onClick={this.addModalOn}>Add Video</button>
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
                                                <th>Language</th>
                                                <th>Image</th>
                                                <th>Link</th>
                                                <th>Status </th>
                                                <th>Edit</th>
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
                    <div className="modal-header">
                        <h2>Add Video Here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.addModal}>
                        <div className="row">
                            <div className="col-sm-4">
                                <label>Select Language</label>
                                <select className="form-control" required name="language" onChange={this.onChange} value={this.state.language}>
                                    <option value=''>Select Language</option>
                                    {func.langOptions.map((j,index2)=>( <option value={j.value} key={index2}>{j.text}</option> ))}
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <label>Image</label>
                                <input className="form-control" type="file" onChange={this.uploadImage} required/>
                            </div>
                            <div className="col-sm-4">
                                <label>Status</label>
                                <select className="form-control" required name="status" onChange={this.onChange} value={this.state.status}>
                                    <option value=''>Select Status</option>
                                    <option value='1'>Active</option>
                                    <option value='0'>Not Active</option>
                                </select>
                            </div>
                            <div className="col-sm-12">
                                <label>Link</label>
                                <input className="form-control" placeholder="Add Link Here" type="text" name="link" value={this.state.link} onChange={this.onChange} required/>
                            </div>
                            <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                        </div>
                    </form>
                </Modal>
                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <div className="modal-header">
                        <h2>Update Videos Here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.updateModal}>
                        <div className="row">
                            <div className="col-sm-4">
                                <label>Select Language</label>
                                <select className="form-control" required name="language" onChange={this.onChange} value={this.state.language}>
                                    <option value=''>Select Language</option>
                                    {func.langOptions.map((j,index2)=>( <option value={j.value} key={index2}>{j.text}</option> ))}
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <label>Image</label>
                                <input className="form-control" type="file" onChange={this.uploadImage}/>
                                {this.state.oldImage ? <img className="previewImg" src={func.imgPath+'video/'+this.state.oldImage}/> : null }
                            </div>
                            <div className="col-sm-4">
                                <label>Status</label>
                                <select className="form-control" required name="status" onChange={this.onChange} value={this.state.status}>
                                    <option value=''>Select Status</option>
                                    <option value='1'>Active</option>
                                    <option value='0'>Not Active</option>
                                </select>
                            </div>
                            <div className="col-sm-12">
                                <label>Link</label>
                                <input className="form-control" placeholder="Add Link Here" type="text" name="link" value={this.state.link} onChange={this.onChange} required/>
                            </div>
                            <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                        </div>
                    </form>
                </Modal>
            </>
        )
    }
}
export default Videos