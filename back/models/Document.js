const BaseModel = require('./BaseModel')

class Document extends BaseModel {
  static get tableName() {
    return 'documents'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['file'],

      properties: {
        id: { type: 'integer' },
        file: { type: 'string' },
        isTransmitted: { type: 'boolean' },
      },
    }
  }

  static get relationMappings() {
    return {}
  }
}

module.exports = Document
