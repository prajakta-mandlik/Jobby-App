import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

class JobItemDetails extends Component {
  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authentication: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    const data = await response.json()
    console.log(data)
  }

  render() {
    return (
      <>
        <Header />
      </>
    )
  }
}

export default JobItemDetails
