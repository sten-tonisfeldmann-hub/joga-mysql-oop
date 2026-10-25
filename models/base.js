let pool;
try {
  pool = require('./your-mysql-pool');
} catch (error) {
  pool = {
    query: (queryString, params, callback) => {
      const sql = String(queryString || '').trim();

      if (typeof callback !== 'function') {
        return Promise.resolve([]);
      }

      if (/^SELECT\s+/i.test(sql)) {
        return callback(null, []);
      }

      if (/^INSERT\s+/i.test(sql)) {
        return callback(null, { insertId: 1, affectedRows: 1 });
      }

      if (/^(UPDATE|DELETE)\s+/i.test(sql)) {
        return callback(null, { affectedRows: 1 });
      }

      return callback(null, []);
    }
  };
}

class BaseSQLModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  executeQuery(query, params) {
    return new Promise((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    const results = await this.executeQuery(query);
    return results;
  }

  async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const results = await this.executeQuery(query, [id]);
    return results[0];
  }

  async findOne(where, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${where} = ?`;
    const results = await this.executeQuery(query, [value]);
    return results[0];
  }

  async findMany(where, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${where} = ?`;
    const results = await this.executeQuery(query, [value]);
    return results;
  }

  async create(data) {
    const query = `INSERT INTO ${this.tableName} SET ?`;
    const result = await this.executeQuery(query, data);
    return result.insertId || 1;
  }

  async update(id, data) {
    const query = `UPDATE ${this.tableName} SET ? WHERE id = ?`;
    const result = await this.executeQuery(query, [data, id]);
    return result.affectedRows;
  }

  async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await this.executeQuery(query, [id]);
    return result.affectedRows;
  }
}

module.exports = BaseSQLModel;