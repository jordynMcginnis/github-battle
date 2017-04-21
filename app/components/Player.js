var React = require('react');

function Player (props) {
  return (
    <div>
      <h2>{props.label}</h2>
      <h3>{props.score}</h3>
      <h3>{props.profile}</h3>
    </div>
  )
}
module.exports = Player;