import React, { Component } from 'react'
import AdminSidebar from '../parts/AdminSidebar'
import api from '../parts/api'
const func = require('../parts/functions')
import CKEditor from 'ckeditor4-react'
import { Dropdown } from 'semantic-ui-react'

export class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:                       [],
            langOptions:                [],
            selectedLang:               [],
            type:                       '',
            name:                       '',
            status:                     '',
            distype:                    '',
            discount:                   '',
            dimension:                  [],
            images:                     null,
            short_description:          '',
            long_description:           '',
            wprice:                     '',
            dprice:                     '',
            mov:                     '',
        }
        this.handleChange1 = this.handleChange1.bind( this )
        this.handleChange2 = this.handleChange2.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
		this.onEditorChange2 = this.onEditorChange2.bind( this )
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch( api.addProductOptions, { headers: { "content-type": "application/json", Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token } } );
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            data:               body.data,
            langOptions:        body.langOptions
        })
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) }
    onEditorChange1( evt1 ) { this.setState( { short_description: evt1.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { short_description: changeEvent1.target.value } ) }
    onEditorChange2( evt2 ) { this.setState( { long_description: evt2.editor.getData() } ) }
    handleChange2( changeEvent2 ) { this.setState( { long_description: changeEvent2.target.value } ) }
    multipleImage = (e) =>{ this.setState({ images: e.target.files }) }
    addDimensions=()=>{ this.setState({ dimension: [ ...this.state.dimension, {text: '', value: ''} ] }) }
    changeDimensionType=(index, value)=>{ this.state.dimension[index].text = value; this.setState({ dimension: this.state.dimension }) }
    changeDimensionValue=(index, value)=>{ this.state.dimension[index].value = value; this.setState({ dimension: this.state.dimension }) }
    langSelected = (e, {value}) => { this.setState({ selectedLang: value }) }

    addModal = (e) => {
        e.preventDefault()
        const data = new FormData()
        if(this.state.images){ for(const f of this.state.images){ data.append('images[]', f) } }
        data.append('type', this.state.type)
        data.append('name', this.state.name)
        data.append('wprice', this.state.wprice)
        data.append('dprice', this.state.dprice)
        data.append('status', this.state.status)
        data.append('distype', this.state.distype)
        data.append('discount', this.state.discount)
        data.append('mov', this.state.mov)
        data.append('short_description', this.state.short_description)
        data.append('long_description', this.state.long_description)
        data.append('dimension', JSON.stringify(this.state.dimension))
        data.append('language', JSON.stringify(this.state.selectedLang))
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.createProduct, data)
        .then( res=> {
            if(res.data.success){
                localStorage.setItem('message', res.data.message)
                window.location.href = func.base+'adminProducts'
            }
            func.callSwal(res.data.message)
        })
        .catch(err=>func.printError(err))
    }

    render() {
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <AdminSidebar/>
                        <div className="col-sm-10 admin">
                            <h1 className="heading"><span>Admin Panel </span>(Add Product)</h1>
                            <form className="modal-form container-fluid" encType="multipart/form-data" onSubmit={this.addModal}>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label>Product Type</label>
                                        <select className="form-control" required name="type" onChange={this.onChange} value={this.state.type}>
                                            <option value=''>Select Product Type</option>
                                            {this.state.data.filter(i=>i.type=='ProductType').map((i,index)=>(<option value={i.id} key={index}>{i.name}</option>))}
                                        </select>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Product Name</label>
                                        <input className="form-control" placeholder="Product Name" type="text" name="name" required value={this.state.name} onChange={this.onChange}/>
                                    </div> 
                                    <div className="col-sm-4">
                                        <label>Status of Product</label>
                                        <select className="form-control" required name="status" onChange={this.onChange} value={this.state.status}>
                                            <option value=''>Product Status</option>
                                            <option value="1">Show</option>
                                            <option value="0">Hide</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Wholesale Price</label>
                                        <input className="form-control" placeholder="Wholesale Price" type="number" required onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="wprice" value={this.state.wprice} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>MRP</label>
                                        <input className="form-control" placeholder="MRP" type="number" required onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="dprice" value={this.state.dprice} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Discount Type</label>
                                        <select className="form-control" required name="distype" onChange={this.onChange} value={this.state.distype}>
                                            <option value=''>Discount Type</option>
                                            <option value="1">Value Base</option>
                                            <option value="2">Percentage base</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Discount</label>
                                        <input className="form-control" placeholder="Product Discount" type="number" required onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="discount" value={this.state.discount} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Images</label>
                                        <input type="file" className="form-control" required multiple onChange={this.multipleImage}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>MOV</label>
                                        <input className="form-control" placeholder="Product Discount" type="number" required onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="1" name="mov" value={this.state.mov} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-12 mt-3">
                                        <button onClick={this.addDimensions} className="amitBtn">Add Dimensions</button>
                                        {this.state.dimension.map((i,index)=>(
                                            <div className="row mb-3" key={index}>
                                                <div className="col-sm-6">
                                                    <label>Dimension Type</label>
                                                    <select className="form-control" required onChange={(e)=>this.changeDimensionType(index, e.target.value)} value={i.text}>
                                                        <option value=''>Select Dimension Type</option>
                                                        {this.state.data.filter(i=>i.type=='DimensionType').map((j,index)=>(<option value={j.id} key={index}>{j.name}</option>))}
                                                    </select>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label>Dimension Value</label>
                                                    <input className="form-control" placeholder="Product Name" required type="text" onChange={(e)=>this.changeDimensionValue(index, e.target.value)} value={i.value}/>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-6">
                                        <label>Short Description</label>
                                        <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } content= {this.state.short_description} onChange={this.onEditorChange1}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Long Description</label>
                                        <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } content= {this.state.long_description} onChange={this.onEditorChange2}/>
                                    </div>
                                    <div className="col-sm-12 compare label-down mb-5">
                                        <label>Product visible in languages</label>
                                        <Dropdown placeholder='Select Languages' multiple fluid search selection onChange={this.langSelected} options={this.state.langOptions}/>
                                    </div>
                                    <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default User