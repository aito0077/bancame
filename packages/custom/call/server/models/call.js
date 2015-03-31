'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var CallSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  context: { //Plano
    type: String,
    required: true,
    trim: true
  },
  stages: {
    share_resource: {
        start_date: { type: Date },
        end_date: { type: Date },
        active: { type: Boolean}
    }, 
    apply_project: {
        start_date: { type: Date },
        end_date: { type: Date },
        active: { type: Boolean}
    }, 
    evaluation: {
        start_date: { type: Date },
        end_date: { type: Date },
        active: { type: Boolean}
    }, 
    show_results: {
        start_date: { type: Date },
        end_date: { type: Date },
        active: { type: Boolean}
    } 
  },
    status: { //OPEN - CLOSE - REMOVE
        type: String,
        trim: true
    },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }

//Proyectos
//Recursos
});

CallSchema.path('name').validate(function(name) {
  return !!name;
}, 'Name cannot be blank');

CallSchema.path('context').validate(function(context) {
  return !!context;
}, 'Context cannot be blank');

CallSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Call', CallSchema);
