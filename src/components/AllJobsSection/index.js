import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import FilteredJobs from '../FilteredJobs'
import JobsCard from '../JobsCard'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILED',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstant.initial,
    employmentType: '',
    minPackage: '',
    search: '',
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const {employmentType, minPackage, search} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minPackage}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  showSearchedList = () => {
    this.getJobsDetails()
  }

  changeEmployment = employmentId => {
    this.setState({employmentType: employmentId}, this.getJobsDetails)
  }

  changePackage = minPackage => {
    this.setState({minPackage}, this.getJobsDetails)
  }

  renderJobsView = () => {
    const {jobsList} = this.state

    return (
      <ul className="jobCard-container">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search"
            className="search-bar"
            onChange={this.onChangeSearch}
          />

          <button
            type="button"
            className="icon"
            data-testid="searchButton"
            onClick={this.showSearchedList}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {jobsList.map(eachJob => (
          <JobsCard jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderAllViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderJobsView()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {employmentType, minPackage, search} = this.state
    console.log(search)

    return (
      <div className="jobs-container">
        <FilteredJobs
          employmentType={employmentType}
          minPackage={minPackage}
          searchInput={search}
          changeEmployment={this.changeEmployment}
          changePackage={this.changePackage}
        />
        {this.renderAllViews()}
      </div>
    )
  }
}

export default AllJobsSection
