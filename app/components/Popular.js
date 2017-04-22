var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

function SelectLanguage (props) {
  var languages = ['All','Javascript','Python','Ruby','Css'];

  return (
    <div className='langList'>
      <ul>
        {languages.map(function(lang){
          return <li className='list' onClick={props.onSelect.bind(null,lang)} key={lang} style={props.selectedLanguage === lang ? {color:'red'} : {color: 'black'}}>{lang}</li>
        },this)}
      </ul>
    </div>
  )
}
function AllRepos(props){
  return (
    <div className='allRepos'>
       {props.repos.map(function(repo){
        return (
          <ul className = 'repos1'>
            <li className='image' key={repo.owner.login}> <img className='image1' src = {repo.owner.avatar_url} alt={'Avatar for' + repo.owner.login} /> </li>
            <li key={repo.html_url}><a href ={repo.html_url}> {repo.name} </a> </li>
            <li className='userName'>@ {repo.owner.login}</li>
            <li key = {repo.stargazers_count}>{repo.stargazers_count} stars</li>
          </ul>
        )
      })}
    </div>
  )
}

class Popular extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedLanguage : 'All',
      repos: null
    }
    this.clickLanguage = this.clickLanguage.bind(this);
  }
  componentDidMount(){
    this.clickLanguage(this.state.selectedLanguage)
  }
  clickLanguage (lang) {
    this.setState(function(){
      return {
        selectedLanguage: lang,
        repos: null
      }
    });
    api.fetchPopularRepos(lang)
    .then(function(repos){
      this.setState(function(){
        return {
          repos: repos
        }
      })
    }.bind(this))
  }


  render() {
    return (
      <div className='loading'>
        <SelectLanguage onSelect={this.clickLanguage} selectedLanguage={this.state.selectedLanguage}/>
        {this.state.repos === null ? <Loading /> : <AllRepos repos = {this.state.repos}/>  }
      </div>
    )
  }

}

module.exports = Popular;