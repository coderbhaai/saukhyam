import React, { Component } from 'react'
import AdminSidebar from '../parts/AdminSidebar'
import api from '../parts/api'
const func = require('../parts/functions')
import { ExportReactCSV } from '../parts/ExportReactCSV'

export class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage:                1,
            itemsPerPage:               100,
            data:                       [],
            type:                       [],
            loading:                    true,
            sortActive:                 'Clear',
            sortType:                   'Clear',
            sortLang:                   'Clear',
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch( api.adminProducts, { headers: { "content-type": "application/json", Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token } } );
        const body = await response.json();
        console.log(`body`, body)
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            data:                       body.data,
            type:                       body.type,
            loading:                    false
        })
    }

    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    sortActive=(e)=>{ this.setState({ sortActive: e.target.value })}
    sortType=(e)=>{ this.setState({ sortType: e.target.value })}
    sortLang=(e)=>{ this.setState({ sortLang: e.target.value })}

    changeStatus=(i, value)=>{
        if(value == 1){ var status = 0 }else{ var status = 1}
        const data={
            id:                         i.id,
            status:                     status
        }
        const token = JSON.parse(localStorage.getItem('user')).token; axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.changeProductStatus, data)
        .then( res=>{
            if(res.data.success){ this.setState({ data: this.state.data.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) }) }
            func.callSwal(res.data.message)
        })
        .catch(err=>func.printError(err))
    }

    render() {
        console.log(`this.state`, this.state)
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const data =  this.state.data
            .filter((i)=>{ if(this.state.search == null) return i; else if(i.name.toLowerCase().includes(this.state.search.toLowerCase()) || i.productType.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i } })
            .filter((i)=>{ if(this.state.sortActive == null || this.state.sortActive == 'Clear') return i; else if(i.status == parseInt(this.state.sortActive) ){ return i } })
            .filter((i)=>{ if(this.state.sortType == null || this.state.sortType == 'Clear') return i; else if(i.type == parseInt(this.state.sortType) ){ return i } })
            .filter((i)=>{ if(this.state.sortLang == null || this.state.sortLang == 'Clear') return i; else if(JSON.parse(i.language).includes(parseInt(this.state.sortLang)) ){ return i } })

        const renderItems =  data.slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{i.productType}</td>
                    <td>{i.name}</td>
                    <td>{i.price}</td> 
                    <td><img className="previewImg" src={func.imgPath+'product/'+JSON.parse(i.images)[0]}/></td> 
                    <td>
                        <div className="onoffswitch">
                            <input type="checkbox" name="statusSwitch" className="onoffswitch-checkbox" id={'Switch-'+i.id} onChange={(e)=>this.changeStatus(i, e.target.value)} value={i.status} checked={i.status==1? true : false}/>
                            <label className="onoffswitch-label" htmlFor={'Switch-'+i.id}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                        </div>
                    </td>
                    <td className="editIcon text-center"><a href={func.base+"updateProduct/"+i.id}><img src="/images/icons/edit.svg"/></a></td>
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
                            <h1 className="heading"><span>Admin Panel </span>(Products)</h1>
                            {this.state.loading? <div className="loading"><img src={func.base+"images/logo.png"}/></div> :<>
                                <div className="sortBy">
                                    <select className="form-control" required name="sortActive" value={this.state.sortActive} onChange={this.sortActive}>
                                        <option value="Clear">Sort By Status</option> 
                                        <option value="0">Not Active</option>
                                        <option value="1">Active</option>
                                        <option value="Clear">Clear Sorting</option> 
                                    </select>
                                </div>
                                <div className="sortBy">
                                    <select className="form-control" required name="sortType" value={this.state.sortType} onChange={this.sortType}>
                                        <option value="Clear">Sort By Type</option>
                                        {this.state.type.filter(i=>i.type=='ProductType').map((i,index)=>(<option value={i.id} key={index}>{i.name}</option> ))}
                                        <option value="Clear">Clear Sorting</option> 
                                    </select>
                                </div>
                                <div className="sortBy">
                                    <select className="form-control" required name="sortLang" value={this.state.sortLang} onChange={this.sortLang}>
                                        <option value="Clear">Sort By Language</option>
                                        {this.state.type.filter(i=>i.type=='Language').map((i,index)=>(<option value={i.id} key={index}>{i.name}</option> ))}
                                        <option value="Clear">Clear Sorting</option> 
                                    </select>
                                </div>

                                <div className="btn-pag">
                                    <a className="amitBtn" href={func.base+"addProduct"}>Add Product</a>
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
                                                <th>Price</th>
                                                <th>Image</th>
                                                <th>Status</th>
                                                <th>Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>{renderItems}</tbody>
                                    </table>
                                    <ExportReactCSV csvData={data} fileName={'Products -'+func.time+'.xls'}/>
                                </div>
                                <ul className="page-numbers">{renderPagination}</ul>
                            </>}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default User