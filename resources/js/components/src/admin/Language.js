import React, { Component } from 'react'
import AdminSidebar from '../parts/AdminSidebar'
import { Modal } from 'reactstrap'
import api from '../parts/api'
const func = require('../parts/functions')
import { ExportReactCSV } from '../parts/ExportReactCSV'

export class Language extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage:                1,
            itemsPerPage:               100,
            data:                       [],
            screen:                     [],
            language:                   [],
            search:                     '',
            addmodalIsOpen:             false,
            editmodalIsOpen:            false,
            id:                         '',
            screenId:                   '',
            text:                       '',
            options:                    [],
            optionList:                 [],
            loading:                    true
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch( api.adminLanguages, { headers: { "content-type": "application/json", Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token } } );
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            data:                       body.data,
            screen:                     body.screen,
            language:                   body.language,
            loading:                    false
        })
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) }
    addOption=()=>{ this.setState({ options: [ ...this.state.options, {lang: '', value: ''} ] }) }
    changeOptionLanguage=(index, val)=>{ this.state.options[index].lang = val; this.setState({ options: this.state.options }) }
    changeOptionValue=(index, val)=>{ this.state.options[index].value = val; this.setState({ options: this.state.options }) }
    optionRemove(index){ this.state.options.splice(index, 1); this.setState({options: this.state.options}) }

    addModal = (e) => {
        e.preventDefault()
        const data ={
            screenId:           this.state.screenId,
            text:               this.state.text,
            options:            JSON.stringify(this.state.options)
        }
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.createLanguage, data)
        .then( res=> {
            if(res.data.success){ this.setState({ data: [...this.state.data, res.data.data ] }) }
            func.callSwal(res.data.message)
            this.resetData()
        })
        .catch(err=>func.printError(err))
    }

    editModalOn = (i)=>{
        const xx = []
        JSON.parse(i.options).map(j=>(
            xx.push(parseInt(j.lang))
        ))
        this.setState({
            editmodalIsOpen:                true,
            id:                             i.id,
            screenId:                       i.screenId,
            text:                           i.text,
            options:                        JSON.parse(i.options),
            optionList:                     xx
        })
    }

    updateModal = (e) => {
        e.preventDefault()
        const data ={
            id:                 this.state.id,
            screenId:           this.state.screenId,
            text:               this.state.text,
            options:            JSON.stringify(this.state.options),
        }
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.updateLanguage, data)
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
            screenId:                   '',
            text:                       '',
            options:                    [],
        })
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const data =  this.state.data.filter((i)=>{ 
            if(this.state.search == null) return i; else if(i.screenName.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }
        })
        const renderItems =  data.slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{i.screenName}</td> 
                    <td>{i.text}</td>
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
                            <h1 className="heading"><span>Admin Panel </span>(Language)</h1>
                            {this.state.loading? <div className="loading"><img src={func.base+"/images/logo.png"}/></div> :<>
                                <div className="btn-pag">
                                    <button className="amitBtn" onClick={this.addModalOn}>Add Language</button>
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
                                                <th>Screen</th>
                                                <th>Text</th>
                                                <th>Edit </th>
                                            </tr>
                                        </thead>
                                        <tbody>{renderItems}</tbody>
                                    </table>
                                    <ExportReactCSV csvData={data} fileName={'Language -'+func.time+'.xls'}/>
                                </div>
                                <ul className="page-numbers">{renderPagination}</ul>
                            </>}
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.addmodalIsOpen} className="adminModal">
                    <div className="modal-header"><h2>Add Language Here</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                    <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.addModal}>
                        <div className="row">
                            <div className="col-sm-4">
                                <label>Select Screen</label>
                                <select className="form-control" required name="screenId" onChange={this.onChange} value={this.state.screenId}>
                                    <option value=''>Select Screen</option>
                                    {this.state.screen.map((i,index)=>(<option value={i.id} key={index}>{i.name}</option>))}
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label>Basic Text</label>
                                <input className="form-control" placeholder="Add Basic Text" type="text" name="text" value={this.state.text} onChange={this.onChange}/>
                            </div>
                        </div>
                        <button onClick={this.addOption} className="amitBtn my-3">Add Language</button>
                        <div>
                            {this.state.options.map((i,index)=>(
                                <div className="row mb-3" key={index}>
                                    <div className="col-sm-3">
                                        <select className="form-control" required onChange={(e)=>this.changeOptionLanguage(index, e.target.value)} value={i.lang}>
                                            <option value=''>Select Language</option>
                                            {this.state.language.map((j,index2)=>(<option value={j.id} key={index2}>{j.name}</option>))}
                                        </select>
                                    </div>
                                    <div className="col-sm-8">
                                        <input className="form-control" placeholder="Add Language Text" type="text" value={i.value} required onChange={(e)=>this.changeOptionValue(index, e.target.value)}/>
                                    </div>
                                    <div className="col-sm-1">
                                        <img src="/images/icons/wrong-red.svg" className="delIcon" onClick={()=>this.optionRemove(index)}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                    </form>
                </Modal>
                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <div className="modal-header"><h2>Update Language Here</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                    <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.updateModal}>
                        <div className="row">
                            <div className="col-sm-4">
                                <label>Select Screen</label>
                                <select className="form-control" required name="screenId" onChange={this.onChange} value={this.state.screenId}>
                                    <option value=''>Select Screen</option>
                                    {this.state.screen.map((i,index)=>(<option value={i.id} key={index}>{i.name}</option>))}
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label>Basic Text</label>
                                <input className="form-control" placeholder="Add Basic Text" type="text" name="text" value={this.state.text} onChange={this.onChange}/>
                            </div>
                        </div>
                        <button onClick={this.addOption} className="amitBtn my-3">Add Language</button>
                        <div>
                            {this.state.options.map((i,index)=>(
                                <div className="row mb-3" key={index}>
                                    <div className="col-sm-3">
                                        <select className="form-control" required onChange={(e)=>this.changeOptionLanguage(index, e.target.value)} value={i.lang}>
                                            <option value=''>Select Language</option>
                                            {this.state.language.map((j,index2)=>(<option value={j.id} key={index2}>{j.name}</option>))}
                                            {/* .filter(el=>!this.state.optionList.includes(el.id)) */}
                                        </select>
                                    </div>
                                    <div className="col-sm-8">
                                        <input className="form-control" placeholder="Add Language Text" type="text" value={i.value} required onChange={(e)=>this.changeOptionValue(index, e.target.value)}/>
                                    </div>
                                    <div className="col-sm-1">
                                        <img src="/images/icons/wrong-red.svg" className="delIcon" onClick={()=>this.optionRemove(index)}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                    </form>
                </Modal>
            </>
        )
    }
}
export default Language