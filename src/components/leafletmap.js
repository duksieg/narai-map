import React from "react";
import {  Popup, TileLayer, Marker, MapContainer } from "react-leaflet";
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as mapicon from '../components/mapicon'
class LeafletMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initcenter: [13.798995, 100.562988],
      zoomlevel: 6,
      position: {},
      value:'',
      setPosition: {},
      mapRef :React.createRef()
    }

    this.handleChange = this.handleChange.bind(this);
    this.usemapcenter = this.usemapcenter.bind(this);
    this.renderuserfromdata = this.renderuserfromdata.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  usemapcenter(event) {
    try {
      let record = this.props.user.records
      let latlng 
      record.find((element) => {
        if(element.pointlatlng != null ){
          if(element.pointno == this.state.value){
            latlng = element.pointlatlng
            console.log('found latlnh'+latlng)
          }
        }else{
          latlng = '13.798995, 100.562988'
        }
      })
      console.log('latlng = '+latlng)
      if(latlng != null){
      latlng = latlng.replace(' ', '').split(',')
      let lat = latlng[0]
      let lng = latlng[1]
      latlng = L.latLng(lat, lng)
      this.setState({ initcenter: latlng, zoomlevel: 13 })
      this.setState({position: latlng});
      const {map} = this.state;
      if (map) map.flyTo(latlng,13);
      }else{
        console.log('latlng is '+latlng)
      }
    } catch (err) {
      console.error(err)
    }
  }

  renderuserfromdata() {
    let temparry = []
    let result = this.props.user
    if (result != null) {


      result.records.forEach(record => {
        try {
          let pointlatlng
          let latlng
          if (record.pointlatlng != "" && record.pointlatlng != "#N/A") {
            pointlatlng = record.pointlatlng.replace(' ', '').split(',')
            pointlatlng[0] = pointlatlng[0].substring(0, (pointlatlng[0].indexOf('.')) + 7)
            pointlatlng[1] = pointlatlng[1].substring(0, (pointlatlng[1].indexOf('.')) + 7)
            latlng = L.latLng(pointlatlng[0], pointlatlng[1])
            if (record.status == 'before') {
              temparry.push(<Marker key={record.pointno} position={latlng} icon={mapicon.blueIcon} >
                <Popup>
                  รหัสจุดค้นที่:{record.pointno} สถานะ:{record.status}  กก.ที่รับผิดชอบ:{record.dv} รวมตรวจค้นได้:{record.totalfound}
                </Popup>
              </Marker>)
            } else if (record.status == 'after') {
              temparry.push(<Marker key={record.pointno} position={latlng} icon={mapicon.greenIcon} >
                <Popup>
                  รหัสจุดค้นที่:{record.pointno} สถานะ:{record.status} กก.ที่รับผิดชอบ:{record.dv} รวมตรวจค้นได้:{record.totalfound}
                </Popup>
              </Marker>)
            }else if (record.status == 'current') {
              temparry.push(<Marker key={record.pointno} position={latlng} icon={mapicon.yellowIcon}>
                <Popup>
                  รหัสจุดค้นที่:{record.pointno} สถานะ:{record.status}  กก.ที่รับผิดชอบ:{record.dv} รวมตรวจค้นได้:{record.totalfound}
                </Popup>
              </Marker>)
            } else if (record.status != 'before' || record.status != 'after' || record.status != 'current') {
              temparry.push(<Marker key={record.pointno} position={latlng} icon={mapicon.greyIcon} >
                <Popup>
                  รหัสจุดค้นที่:{record.pointno} สถานะ:{record.status} กก.ที่รับผิดชอบ:{record.dv} รวมตรวจค้นได้:{record.totalfound}
                </Popup>
              </Marker>)
            } 
          } else {
          }
        } catch (err) {
          // console.log(record.pointno + 'latlng not in format')
        }
      })
    }
    return temparry
  }

  render() {
    if (typeof window !== 'undefined'){
    return (
      <>
        <div className="form d-flex justify-content-center my-4">
          <div>
            <input type="text" className="form-control"  value={this.state.value} onChange={this.handleChange}
                placeholder="รหัสเป้า" />
          </div>
          <div>
          <div className="btn btn-secondary" type="submit" value="Submit" onClick={this.usemapcenter} variant="primary" >
              Search
            </div>
          </div>
        </div>
         <MapContainer center={this.state.initcenter} fullscreenControl={true} zoom={this.state.zoomlevel}  whenCreated={map => this.setState({map})} style={{ height: '100vh' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.renderuserfromdata()}
        </MapContainer>
      </>
    );
    }
  }
    

}
export default LeafletMap
