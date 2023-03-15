import {Link} from 'react-router-dom'
import './index.css'

const JobsCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="card-link">
      <li className="card-container">
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
        <h1 className="description-title">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard
