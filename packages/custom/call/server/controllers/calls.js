'use strict';

var mongoose = require('mongoose'),
  Call = mongoose.model('Call'),
  _ = require('lodash');


exports.call = function(req, res, next, id) {
  Call.load(id, function(err, call) {
    if (err) return next(err);
    if (!call) return next(new Error('Failed to load call ' + id));
    req.call = call;
    next();
  });
};

exports.create = function(req, res) {
  var call = new Call(req.body);
  call.user = req.user;

  call.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the call'
      });
    }
    res.json(call);

  });
};

exports.update = function(req, res) {
  var call = req.call;

  call = _.extend(call, req.body);

  call.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the call'
      });
    }
    res.json(call);

  });
};

exports.destroy = function(req, res) {
  var call = req.call;

  call.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the call'
      });
    }
    res.json(call);

  });
};

exports.show = function(req, res) {
  res.json(req.call);
};

exports.all = function(req, res) {
  Call.find().sort('-created').populate('user', 'name username').exec(function(err, calls) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the calls'
      });
    }
    res.json(calls);

  });
};
