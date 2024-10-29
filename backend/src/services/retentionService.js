// src/services/retentionService.js
const  db  = require("../config/database");
const  SQL  = require("../constants/queries");
const { DatabaseError } = require("../utils/errors");

class RetentionService {
  static async getMonthlyRetention(referenceDate, endDate) {
    try {
      return await this.executeRetentionQuery(referenceDate, endDate);
    } catch (error) {
      throw new DatabaseError(
        `Failed to fetch retention data: ${error.message}`,
        error
      );
    }
  }

  static async executeRetentionQuery(referenceDate, endDate) {
    return new Promise((resolve, reject) => {
      db.all(
        SQL.MONTHLY_RETENTION,
        [referenceDate, referenceDate, endDate],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });
  }
}

module.exports = { retentionService: RetentionService };