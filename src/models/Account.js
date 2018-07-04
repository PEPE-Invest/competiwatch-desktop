import Database from './Database'
import Match from './Match'

class Account {
  static setupDatabase() {
    const db = Database.load('accounts')
    db.ensureIndex({ fieldName: 'battletag', unique: true }, err => {
      if (err) {
        console.error('failed to add accounts.battletag index', err)
      }
    })
    return db
  }

  static findAll(db) {
    return Database.findAll(db, 'account', { battletag: 1 }).
      then(rows => rows.map(data => new Account(data)))
  }

  static find(db, id) {
    return Database.find(db, id).then(data => new Account(data))
  }

  constructor(data) {
    this.battletag = data.battletag
    this._id = data._id
  }

  latestMatch(dbMatches) {
    const conditions = { accountID: this._id }
    return new Promise((resolve, reject) => {
      dbMatches.find(conditions).sort({ date: -1 }).limit(1).exec((err, rows) => {
        if (err) {
          console.error('failed to load latest match', err)
          reject(err)
        } else {
          const data = rows[0]
          if (data) {
            resolve(new Match(data))
          } else {
            resolve()
          }
        }
      })
    })
  }

  hasMatches(dbMatches) {
    const conditions = { accountID: this._id }
    return Database.count(dbMatches, conditions).then(count => count > 0)
  }

  save(db) {
    const data = { battletag: this.battletag }
    return Database.upsert(db, data, this._id, 'account').
      then(newAccount => { this._id = newAccount._id })
  }

  delete(db) {
    return Database.delete(db, this._id, 'account')
  }
}

export default Account
