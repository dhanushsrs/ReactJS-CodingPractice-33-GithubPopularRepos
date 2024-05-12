import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiUrl = 'https://apis.ccbp.in/popular-repos?language='

class GithubPopularRepos extends Component {
  state = {
    isLoading: true,
    repositoriesData: [],
    selectedLanguageFilter: 'All',
  }

  componentDidMount() {
    this.getRepositories(languageFiltersData[0].id)
  }

  setRepositories = (data, loadingStatus) => {
    this.setState({
      repositoriesData: data,
      isLoading: loadingStatus,
    })
  }

  setIsLoading = loadingStatus => {
    this.setState({isLoading: loadingStatus})
  }

  getRepositories = async selectedLanguageFilterData => {
    this.setIsLoading(true)
    const response = await fetch(`${apiUrl}${selectedLanguageFilterData}`)
    const fetchedData = await response.json()

    const updatedData = fetchedData.popular_repos.map(eachRepository => ({
      id: eachRepository.id,
      imageUrl: eachRepository.avatar_url,
      name: eachRepository.name,
      starsCount: eachRepository.stars_count,
      forksCount: eachRepository.forks_count,
      issuesCount: eachRepository.issues_count,
    }))

    this.setRepositories(updatedData, false)
  }

  renderRepositoriesList = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="repositories-cards-list-container">
        {repositoriesData.map(eachRepositoryData => (
          <RepositoryItem
            key={eachRepositoryData.id}
            repositoryData={eachRepositoryData}
          />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  setSelectedLanguageFilterAndGetRepositories = newFilterId => {
    this.setState({selectedLanguageFilter: newFilterId})
    this.getRepositories(newFilterId)
  }

  renderLanguageFiltersList = () => {
    const {selectedLanguageFilter} = this.state

    return (
      <ul className="filters-list-container">
        {languageFiltersData.map(eachLanguageFilter => (
          <LanguageFilterItem
            key={eachLanguageFilter.id}
            languageFilter={eachLanguageFilter}
            isSelected={eachLanguageFilter.id === selectedLanguageFilter}
            setSelectedLanguageFilterAndGetRepositories={
              this.setSelectedLanguageFilterAndGetRepositories
            }
          />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <div className="github-popular-repositories-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFiltersList()}
          {isLoading ? this.renderLoader() : this.renderRepositoriesList()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
