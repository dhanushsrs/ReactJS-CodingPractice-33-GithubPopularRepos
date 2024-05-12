// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryData} = props
  const {imageUrl, name, starsCount, forksCount, issuesCount} = repositoryData
  return (
    <li className="repository-card-item-container">
      <img src={imageUrl} className="card-item-image" alt={name} />
      <h1 className="card-item-name">{name}</h1>

      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="stats-icon"
          alt="stars"
        />
        <p className="stats-text">{starsCount} stars</p>
      </div>

      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="stats-icon"
          alt="forks"
        />
        <p className="stats-text">{forksCount} forks</p>
      </div>

      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="stats-icon"
          alt="open issues"
        />
        <p className="stats-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
