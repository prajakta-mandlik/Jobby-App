import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

class JobItemDetails extends Component {
  state = {jobDetails: [], similarProducts: []}

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
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = [data.job_details].map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        companyWebsiteUrl: eachJob.company_website_url,
        lifeAtCompany: {
          description: eachJob.life_at_company.description,
          imgUrl: eachJob.life_at_company.image_url,
        },
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
        skills: eachJob.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,

          name: eachSkill.name,
        })),
      }))

      const updatedSimilarJobs = data.similar_jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetails: updatedData[0],
        similarProducts: updatedSimilarJobs,
      })
    }
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      rating,
      title,
      location,
      packagePerAnnum,
      skills,
      lifeAtCompany,
    } = jobDetails

    console.log(lifeAtCompany)

    return (
      <div className="card-container">
        <div className="heading-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div>
            <h1 className="company-heading">{title}</h1>
            <p>{rating}</p>
          </div>
        </div>
        <div className="location-info">
          <div className="heading-container">
            <p className="location">{location}</p>
            <p className="employment-type">{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="link-bar">
          <h1 className="description-title">Description</h1>
          <a href={companyWebsiteUrl} className="visit-link">
            Visit
          </a>
        </div>
        <p className="job-description">{jobDescription}</p>

        <h1 className="skills-title">Skills</h1>
        <ul className="skills-container">
          {skills.map(eachSkill => (
            <li>
              <img src={eachSkill.imageUrl} alt={eachSkill.name} />
              <p>{eachSkill.name}</p>
            </li>
          ))}
        </ul>

        <h1 className="skills-title">Life At Company</h1>
        <div className="life-at-company-container">
          <p>{lifeAtCompany.description}</p>
          <img src={lifeAtCompany.imageUrl} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="main-container">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobItemDetails
