import React, { Component } from 'react'
import SeasonDeleteForm from './SeasonDeleteForm'

class SeasonsList extends Component {
  listItemClass = index => {
    let classes = ['d-flex flex-justify-between flex-items-center']
    if (index > 0) {
      classes = classes.concat(['border-top', 'pt-2', 'mt-2'])
    }
    return classes.join(' ')
  }

  render() {
    const { latestSeason, db, firstNonDeletableSeason, onDelete } = this.props
    const seasons = Array.from({ length: latestSeason }, (v, k) => k + 1).reverse()

    return (
      <div className="mb-4">
        <h2
          className="h2 text-normal mb-2 d-flex flex-items-center"
        >Competitive seasons</h2>
        <ul className="list-style-none">
          {seasons.map((season, i) => (
            <li
              key={season}
              className={this.listItemClass(i)}
            >
              Season {season}
              {season > firstNonDeletableSeason && i === 0 ? (
                <SeasonDeleteForm
                  season={season}
                  db={db}
                  onDelete={onDelete}
                />
              ) : ''}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default SeasonsList