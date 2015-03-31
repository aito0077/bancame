'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var ResourceSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  picture_path: {
    type: String,
    trim: true
  },
  resource_type: {
    type: String,
    required: true,
    trim: true
  },
  cost: {
    unit_type: {
        type: String,
        trim: true
    },
    unit_amount: {
        type: Number
    },
    unit_value: {
        type: Number
    }
  },
  organization_owner: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

ResourceSchema.path('name').validate(function(name) {
  return !!name;
}, 'Name cannot be blank');

ResourceSchema.path('description').validate(function(description) {
  return !!description;
}, 'Context cannot be blank');

ResourceSchema.path('description').validate(function(description) {
  return !!description;
}, 'Context cannot be blank');

ResourceSchema.path('organization_owner').validate(function(organization_owner) {
  return !!organization_owner;
}, 'Organization cannot be blank');

ResourceSchema.path('resource_type').validate(function(resource_type) {
  return !!resource_type;
}, 'Resource Type cannot be blank');



ResourceSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Resource', ResourceSchema);

