import * as React from "react"
import LeafletMap from "../components/leafletmap"
import {  ShimmerThumbnail } from 'react-shimmer-effects'

import 'react-bootstrap/dist/react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
const isBrowser = typeof window !== "undefined"



// markup

class IndexPage extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      loading: true,
      looptime:new Date()
    }
  }

  updatetimepage(){
    setInterval(()=>{
      window.location.reload(false);
        this.setState({looptime:new Date()})
    },180000)
}

  async componentDidMount() {
    try {
      let response = await fetch('https://operationnarai.herokuapp.com/detail')
      let jsonresponse = await response.json()
      //arrystatus = jsonresponse.records
      if (jsonresponse != null) {
        this.setState({ user: jsonresponse, loading: false })
      }
    } catch (err) {
      this.setState({ loading: false })
      console.error(err)
    }
  }

  render(){
    if (isBrowser){
      { 
        this.updatetimepage()}
     
    if (this.state.user == null) return <ShimmerThumbnail rounded></ShimmerThumbnail>
    return(<div className={'col'}>
    <LeafletMap user={this.state.user} ></LeafletMap>
    </div>)
  }
}
}


export default IndexPage
