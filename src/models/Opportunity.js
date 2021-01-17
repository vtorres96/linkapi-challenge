const { Schema, model } = require('mongoose');

const OpportunitySchema = new Schema(
  {
    number: {
      type: String,
      required: true,
    },
    orderId: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    orgName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Opportunity', OpportunitySchema);
