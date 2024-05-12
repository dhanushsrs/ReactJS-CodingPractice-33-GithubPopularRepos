// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {
    isSelected,
    languageFilter,
    setSelectedLanguageFilterAndGetRepositories,
  } = props

  const btnClassName = isSelected
    ? 'language-btn selected-language-btn'
    : 'language-btn'

  const onClickBtnLanguageFilter = () => {
    setSelectedLanguageFilterAndGetRepositories(languageFilter.id)
  }

  return (
    <li>
      <button
        type="button"
        className={btnClassName}
        onClick={onClickBtnLanguageFilter}
      >
        {languageFilter.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
