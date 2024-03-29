import React, { Component } from 'react'
import AdminSidebar from '../parts/AdminSidebar'
import api from '../parts/api'
const func = require('../parts/functions')
import CKEditor from 'ckeditor4-react'
import { Dropdown } from 'semantic-ui-react'

export class UpdateProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:                       [],
            langOptions:                [],
            selectedLang:               [],
            langData:                   [],
            id:                         '',
            type:                       '',
            name:                       '',
            wprice:                     '',
            dprice:                     '',
            status:                     '',
            distype:                    '',
            discount:                   '',
            mov:                        1,
            dimension:                  [],
            images:                     null,
            oldImages:                  [],
            short_description:          '',
            long_description:           '',
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
            const response = await fetch( api.getProduct+this.state.id, { headers: { "content-type": "application/json", Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token } } );
            const body = await response.json();
            this.setState({
                langOptions:                body.langOptions,
                data:                       body.data,
                type:                       body.product.type,
                name:                       body.product.name,
                wprice:                     body.product.wprice,
                dprice:                     body.product.dprice,
                status:                     body.product.status,
                distype:                    body.product.distype,
                discount:                   body.product.discount,
                mov:                        body.product.mov,
                oldImages:                  JSON.parse(body.product.images),
                short_description:          body.product.short_description,
                long_description:           body.product.long_description,
                dimension:                  JSON.parse(body.product.dimension),
                langData:                   JSON.parse(body.product.langData),
            })
        }
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
    arrayLangRemove(index){ this.state.langData.splice(index, 1); this.setState({langData: this.state.langData}) }

    addModal = (e) => {
        e.preventDefault()
        const langList = []; this.state.langData.forEach(i => { langList.push(i.value) });
        var finalLang = Array.from(new Set( [...langList, ...this.state.selectedLang]));
        const data = new FormData()
        if(this.state.images){ for(const f of this.state.images){ data.append('images[]', f) } }
        data.append('id', this.state.id)
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
        data.append('language', JSON.stringify(finalLang))
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.updateProduct, data)
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
                                        <input className="form-control" placeholder="Product Name" type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                                    </div> 
                                    <div className="col-sm-4">
                                        <label>Wholesale Price</label>
                                        <input className="form-control" placeholder="Wholesale Price" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="wprice" value={this.state.wprice} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>MRP</label>
                                        <input className="form-control" placeholder="MRP" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="dprice" value={this.state.dprice} onChange={this.onChange}/>
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
                                        <label>Discount Type</label>
                                        <select className="form-control" required name="distype" onChange={this.onChange} value={this.state.distype}>
                                            <option value=''>Discount Type</option>
                                            <option value="1">Value Base</option>
                                            <option value="2">Percentage base</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Discount</label>
                                        <input className="form-control" placeholder="Product Discount" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" name="discount" value={this.state.discount} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Images</label>
                                        <input type="file" className="form-control" multiple onChange={this.multipleImage}/>
                                        {this.state.oldImages.map((i,index)=>(<img key={index} className="previewImg" src={func.imgPath+'product/'+i}/>))}
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
                                        <CKEditor onInstanceReady={this.ckEditorReady()} onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.short_description} content= {this.state.short_description} onChange={this.onEditorChange1}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Long Description</label>
                                        <CKEditor onInstanceReady={this.ckEditorReady()} onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.long_description} content= {this.state.long_description} onChange={this.onEditorChange2}/>
                                    </div>
                                    <div className="col-sm-12 compare label-down mb-5">
                                        <label>Product visible in languages</label>
                                        <div className="update-treat">
                                            { this.state.langData.length ? 
                                                <>
                                                    { this.state.langData.map(( i, index)=><span className="ui label mr-3" key={index}>{i.text}<i aria-hidden="true" className="delete icon"  onClick={()=>this.arrayLangRemove(index)}></i></span>, ) }
                                                </>
                                            : null }
                                        </div>
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
export default UpdateProduct