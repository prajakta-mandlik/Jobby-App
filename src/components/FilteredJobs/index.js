import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILED',
}

class FilteredJobs extends Component {
  state = {profileDetails: [], apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },

      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        name: data.profile_details.name,
        profileImgUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileDetails: formattedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {name, profileImgUrl, shortBio} = profileDetails

    return (
      <>
        <div className="filtered-data-container">
          <div className="profile-container">
            <img src={profileImgUrl} alt="profile" className="profile-pic" />
            <h1 className="profile-name">{name}</h1>
            <p className="profile-bio">{shortBio}</p>
          </div>
        </div>
      </>
    )
  }

  renderEmploymentType = () => (
    <div className="filtered-data-container">
      <h1 className="employment-heading">Type of Employment</h1>
      {employmentTypesList.map(each => {
        const {changeEmployment} = this.props

        const onClickChange = () => {
          changeEmployment(each.employmentTypeId)
        }

        return (
          <li className="employment-type" onClick={onClickChange}>
            <input type="checkBox" id={each.employmentTypeId} />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </li>
        )
      })}
    </div>
  )

  renderSalaryRange = () => (
    <div className="filtered-data-container">
      <h1 className="employment-heading">Employment Type</h1>
      {salaryRangesList.map(each => {
        const {changePackage} = this.props

        const onChangeSalary = () => {
          changePackage(each.salaryRangeId)
        }

        return (
          <li className="employment-type" onClick={onChangeSalary}>
            <input type="radio" id={each.label} />
            <label htmlFor={each.label}>{each.label}</label>
          </li>
        )
      })}
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderProfileView()
      case 'IN_PROGRESS':
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        {this.renderAllViews()}
        <hr />
        {this.renderEmploymentType()}
        <hr />
        {this.renderSalaryRange()}
      </div>
    )
  }
}

export default FilteredJobs
