import './App.css'

import React, {Component} from 'react'

import Select from 'react-select';
import Welcome from './components/welcome.js'
import Product from './components/product.js'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
    category_data : [],
    model_data : [],
    oem_data : [],
    oem : "",
    model : "",
    datalist : [],
    is_data : false
    }
    
    this.getoem();
    
     }

// get data from server
     getdataList(oem,cat,model){
      let url = "http://127.0.0.1:5000/getdata";
      let that = this;
      fetch(url,{
        method : 'POST',
  
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',             
        },
  
        body: JSON.stringify({oem : oem,cat :cat,model :model})
  
      }).then(response => response.json())
      .then(data => {
        that.setState({datalist : data,is_data : true})
      });
    }
  
  getcat(oemval){
    let url = "http://127.0.0.1:5000/getcategory";
    let that = this;
    fetch(url,{
      method : 'POST',

      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',             
      },

      body: JSON.stringify({oem : oemval})

    }).then(response => response.json())
    .then(data => { 
      this.setState({category_data : data})
      
    });
  }

  getmodel(oem,cat){
    let url = "http://127.0.0.1:5000/getmodel";
    fetch(url,{
      method : 'POST',

      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',             
      },

      body: JSON.stringify({oem : oem,cat :cat})

    }).then(response => response.json())
    .then(data => {
      
      this.setState({model_data : data})
    });
  }


  getoem(){
    let url = "http://127.0.0.1:5000/getoem";
    let that = this;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      
      this.setState({oem_data : data})
      
    });
  }

 
handleChangeModel(e) {
  this.setState({ model : e.target.value});
}
handleChangeOem(e) {
  this.setState({oem: e.target.value});
  this.getcat(e.target.value);
  
}

handleChangeCategory(e) {
  this.setState({category: e.target.value});
  this.getmodel(this.state.oem,e.target.value);
}

handleSubmit(e){
    e.preventDefault();   
    //console.log("model: " + this.state.model);
	  //console.log("category: " + this.state.category);
    //console.log("oem : " + this.state.oem);
  this.getdataList(this.state.oem,this.state.category,this.state.model);
  }

 
  render() {
    
    let catList  = this.state.category_data.map((cat)=>{
      
      return (
        <option  value={cat.Category}>{cat.Category}</option>
              )
    });

    let oemList  = this.state.oem_data.map((oemd)=>{
      
      return (
        <option  value={oemd.OEM}>{oemd.OEM}</option>
              )
    });
    let modelList  = this.state.model_data.map((modl)=>{
      
      return (
        <option  value={modl.Model}>{modl.Model}</option>
              )
    });
    const greeting = 'chandan';
    const is_data  = this.state.is_data;

    let ProductList  = (is_data) ? this.state.datalist.map((prd)=>{
      
      return (
        <Product  category={prd.Category}   mrp={prd.Retail_Price} model={prd.Model} />
              )
    }) : "" ;
   

	return (
        
    <div>
          
          
         
	<div className="container">
  <div className="row form-group"></div>
    <form onSubmit={this.handleSubmit.bind(this)} method="post" >
 
<div className="row form-group">

<div className="col-md-3 ">
<label>
    OEM   
  </label>
  </div>

<div className="col-md-3">
      <select  className="form-control" onChange={this.handleChangeOem.bind(this)} >
      {oemList}
      </select>
    </div>

<div className="col-md-3 ">
  <label>
    Category  
    </label>
</div>
  <div className="col-md-3">
  <select name="category" className="form-control" onChange={this.handleChangeCategory.bind(this)}>
    <option value="">Select..</option>
  {catList}
  </select>
  </div>

    
</div>
<div className="row form-group">

<div className="col-md-3 ">
  <label>
  Model  
  </label>
</div>
  <div className="col-md-3">
      <select className="form-control" name="model" onChange={this.handleChangeModel.bind(this)} value={this.state.model} >
      <option value="">Select..</option>
      {modelList}
  </select>
  </div>

    
  </div>
<div className="row form-group">
       <input className="btn btn-info" type="submit" value="Submit" />
   </div>
    </form></div>

		 

    <div className="container">
     <div className="row">
        
            {ProductList}
            </div>
    </div>
    
    </div>


/// starts 



/// ends
		
      )

  }
}




export default App
