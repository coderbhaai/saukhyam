import React, { Component } from 'react'
import AdminSidebar from '../parts/AdminSidebar'
import { Modal } from 'reactstrap'
import api from '../parts/api'
const func = require('../parts/functions')
import { ExportReactCSV } from '../parts/ExportReactCSV'
import CKEditor from 'ckeditor4-react'

export class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage:                1,
            itemsPerPage:               100,
            editmodalIsOpen:            false,
            addmodalIsOpen:             false,
            data:                      [],
            search:                     '',
            id:                         '',
            answer:                     '',
            question:                   '',
            status:                     '',
            loading:                    true
        }
        this.handleChange1 = this.handleChange1.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch( api.adminFaqs, { headers: { "content-type": "application/json", Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token } } );
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
    onEditorChange1( evt1 ) { this.setState( { answer: evt1.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { answer: changeEvent1.target.value } ) }
    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) }

    addHandler = (e) => {
        e.preventDefault()
        const data ={
            question :          this.state.question,
            status :            this.state.status,
            answer :            this.state.answer
        }
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.faqAdd, data)
        .then( res=> {
            if(res.data.success){ this.setState({ data: [...this.state.data, res.data.data ] }) }
            func.callSwal(res.data.message)
        })
        .catch(err=>func.printError(err))
        this.resetData()
    }

    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:                true,
            id:                             i.id,
            question:                       i.question,
            answer:                         i.answer,
            status:                         i.status,
        })
    }

    updateHandler = (e) => {
        e.preventDefault()
        const data ={
            id :                this.state.id,
            question :          this.state.question,
            status :            this.state.status,
            answer :            this.state.answer
        }
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.faqAnswer, data)
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
            question:                   '',
            status:                     '',
            answer:                     ''
        })
    }

    changeStatus=(i, value)=>{
        if(value == 1){ var status = 0 }else{ var status = 1}
        const data={
            id:                         i.id,
            status:                     status
        }
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.changeFaqStatus, data)
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
        const data =  this.state.data.filter((i)=>{ 
            if(this.state.search == null) return i; else if(i.question.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }
        })
        const renderItems =  data.slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{i.name}<br/>
                        {
                            i.role=='Admin'? 'Admin'
                            : i.role=='Manager'? 'Production Center In Charge'
                            : i.role=='Manager'? 'Production Center In Charge'
                            : i.role
                        }
                    </td>
                    <td>{i.question}</td>
                    <td>{i.answer? 'Answered': 'Not Answered'}</td>
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
                            <h1 className="heading"><span>Admin Panel </span>(FAQ)</h1>
                            {this.state.loading? <div className="loading"><img src={func.base+"images/logo.png"}/></div> :<>
                                <div className="btn-pag">
                                    <button className="amitBtn" onClick={this.addModalOn}>Add FAQ</button>
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
                                                <th>Question</th>
                                                <th>Answer</th>
                                                <th>Status</th>
                                                <th>Edit </th>
                                            </tr>
                                        </thead>
                                        <tbody>{renderItems}</tbody>
                                    </table>
                                    <ExportReactCSV csvData={data} fileName={'Basics -'+func.time+'.xls'}/>
                                </div>
                                <ul className="page-numbers">{renderPagination}</ul>
                            </>}
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.addmodalIsOpen} className="adminModal">
                    <div className="modal-header"><h2>Add Question Here</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                    <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.addHandler}>
                        <div className="row">
                            <div className="col-sm-3">
                                <label>Status</label>
                                <select className="form-control" required name="status" onChange={this.onChange} value={this.state.status}>
                                    <option value=''>Select Status</option>
                                    <option value='1'>Active</option>
                                    <option value='0'>Not Active</option>
                                </select>
                            </div>
                            <div className="col-sm-9">
                                <label>Question</label>
                                <input className="form-control" placeholder="Add Question Here" type="text" name="question" value={this.state.question} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-12">
                                <label>Answer</label>
                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } content= {this.state.answer} data={this.state.answer} onChange={this.onEditorChange1}/>
                            </div>
                            <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                        </div>
                    </form>
                </Modal>
                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <div className="modal-header"><h2>Update FAQ Here</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                    <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.updateHandler}>
                        <div className="row">
                            <div className="col-sm-4">
                                <label>Status</label>
                                <select className="form-control" required name="status" onChange={this.onChange} value={this.state.status}>
                                    <option value="">Select Status</option>
                                    <option value="0">Hide</option>
                                    <option value="1">Show</option>
                                </select>
                            </div>
                            <div className="col-sm-8">
                                <label>Question</label>
                                <input className="form-control" placeholder="Question" type="text" name="question" value={this.state.question} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-12">
                                <label>Answer</label>
                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } content= {this.state.answer} data={this.state.answer} onChange={this.onEditorChange1}/>
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