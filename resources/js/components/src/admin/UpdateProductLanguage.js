import React, { Component } from 'react'
import AdminSidebar from '../parts/AdminSidebar'
import api from '../parts/api'
const func = require('../parts/functions')
import CKEditor from 'ckeditor4-react'

export class UpdateProductLanguage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productName:                '',
            langName:                   '',
            short_description:          '',
            long_description:           '',
            status:                     '',
            loading:                    true
        }
        this.handleChange1 = this.handleChange1.bind( this )
        this.handleChange2 = this.handleChange2.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
		this.onEditorChange2 = this.onEditorChange2.bind( this )
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        const id = window.location.href.split("/").pop();
        this.setState({ id: id })
    }

    ckEditorReady=()=>{ this.callApi() }
    timeout=(delay)=>{ return new Promise( res => setTimeout(res, delay) ); }

    callApi = async () => {
        await this.timeout(2000);
        if(this.state.loading && this.state.id){
            this.setState({ loading: false })
            const response = await fetch( api.getProductLanguage+this.state.id, { headers: { "content-type": "application/json", Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token } } );
            const body = await response.json();
            this.setState({
                productName:                body.data.productName,
                langName:                   body.data.langName,
                short_description:          body.data.short_description,
                long_description:           body.data.long_description,
                status:                     body.data.status,
            })
        }
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    onEditorChange1( evt1 ) { this.setState( { short_description: evt1.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { short_description: changeEvent1.target.value } ) }
    onEditorChange2( evt2 ) { this.setState( { long_description: evt2.editor.getData() } ) }
    handleChange2( changeEvent2 ) { this.setState( { long_description: changeEvent2.target.value } ) }
    addModal = (e) => {
        e.preventDefault()
        const data ={
            id:                                 this.state.id,
            status:                             this.state.status,
            short_description:                  this.state.short_description,
            long_description:                   this.state.long_description,
        }
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.updateProductLanguage, data)
        .then( res=> {
            if(res.data.success){
                localStorage.setItem('message', res.data.message)
                window.location.href = func.base+'adminProductLanguage'
            }
            func.callSwal(res.data.message)
        })
        .catch(err=>func.printError(err))
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <AdminSidebar/>
                    <div className="col-sm-10 admin">
                        <h1 className="heading"><span>Admin Panel </span>(Add Product)</h1>
                        <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.addModal}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label>Product</label>
                                    <input className="form-control" value={this.state.productName} readOnly/>
                                </div>
                                <div className="col-sm-4">
                                    <label>Language</label>
                                    <input className="form-control" value={this.state.langName} readOnly/>
                                </div>
                                <div className="col-sm-4">
                                    <label>Status of Product</label>
                                    <select className="form-control" required name="status" onChange={this.onChange} value={this.state.status}>
                                        <option value=''>Product Status</option>
                                        <option value="1">Show</option>
                                        <option value="0">Hide</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-6">
                                    <label>Short Description</label>
                                    <CKEditor onInstanceReady={this.ckEditorReady()} onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.short_description} content= {this.state.short_description} onChange={this.onEditorChange1}/>
                                </div>
                                <div className="col-sm-6">
                                    <label>Long Description</label>
                                    <CKEditor onInstanceReady={this.ckEditorReady()} onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.long_description} content= {this.state.long_description} onChange={this.onEditorChange2}/>
                                </div>
                                <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateProductLanguage
