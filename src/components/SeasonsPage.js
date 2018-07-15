import React, { Component } from 'react'
import SeasonForm from './SeasonForm'
import SeasonsList from './SeasonsList'

class SeasonsPage extends Component {
  render() {
    const { latestSeason, onCreate, firstNonDeletableSeason,
            onDelete } = this.props

    return (
      <div className="container layout-children-container">
        <div className="clearfix">
          <div className="col-7 float-left">
            <SeasonsList
              latestSeason={latestSeason}
              firstNonDeletableSeason={firstNonDeletableSeason}
              onDelete={onDelete}
            />
          </div>
          <div className="col-4 float-right">
            <SeasonForm
              latestSeason={latestSeason}
              onCreate={onCreate}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SeasonsPage
