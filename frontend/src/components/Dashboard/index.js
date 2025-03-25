import {Component} from "react"
import Cookies from "js-cookie"
import Header from "../Header"
import EachItem from "../EachItem"
import "./index.css"
const statusObj={
    sucess:"success",
    failed:"failed",
    loading:"loading"
}
class Dashboard extends Component{
    state={
      status:statusObj.loading,
      items:[],
      error:""
    }
    getDetails=async()=>{
        let url="https://mapapp-us5l.onrender.com/dashboard"
        let token6=Cookies.get("jwt_token")
        if (!token6) {
          this.setState({ status: statusObj.failed, error: "User not logged in" });
          return;
        }
        let options={
           method:"GET",
           headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token6}`
           }
        }
        try{
        const response=await fetch(url,options)
        const data=await response.json()
        if(response.ok){
            console.log(response)
            console.log(data)
            this.setState({items:data.cardData,status:statusObj.sucess})
        }else{
            this.setState({status:statusObj.failed,error:data.message})
        }
    }catch(e){
         this.setState({staus:statusObj.failed,error:"Something went wrong. Try again!"})
    }
    }
    componentDidMount(){
        this.getDetails()
    }
    loadingView=()=>{
        return (
            <div data-testid="loader">
    <p>.....Loading</p>
</div>
        )
    }

    failedView=()=>{
        const {error}=this.state
        return (
            <div className="not-found-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
              alt="not-found"
              className="not-found-img"
            />
            {error&&<p className="erropara">{error}</p>}
          </div>
        )
    }

    sucessview=()=>{
        const {items}=this.state
        return (
            <div className="mainContainer">
            <Header/>
            <div className="backrounditemcontainer">
             <ul className="cityItemsAll">
                 {items.map(each=>(
                    <EachItem key={each.id} itemDetails={each}/>
                 ))}
             </ul>
            </div>
         </div>
        )
    }
    render(){
        const {status}=this.state
        switch (status) {
            case statusObj.sucess:
               return  this.sucessview()
                break;
            case statusObj.loading:
              return  this.loadingView()
                break;
            default:
               return this.failedView()
                break;
        }
    
    }
}
export default Dashboard