'use strict';

var mongoose = require('mongoose'),
  Resource = mongoose.model('Resource'),
  _ = require('lodash');


exports.resource = function(req, res, next, id) {
  Resource.load(id, function(err, resource) {
    if (err) return next(err);
    if (!resource) return next(new Error('Failed to load resource ' + id));
    req.resource = resource;
    next();
  });
};

exports.create = function(req, res) {
  var resource = new Resource(req.body);
  resource.user = req.user;

  resource.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the resource'
      });
    }
    res.json(resource);

  });
};

exports.update = function(req, res) {
  var resource = req.resource;

  resource = _.extend(resource, req.body);

  resource.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the resource'
      });
    }
    res.json(resource);

  });
};

exports.destroy = function(req, res) {
  var resource = req.resource;

  resource.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the resource'
      });
    }
    res.json(resource);

  });
};

exports.show = function(req, res) {
  res.json(req.resource);
};

exports.all = function(req, res) {
  Resource.find().sort('-created').populate('user', 'name username').exec(function(err, resources) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the resources'
      });
    }
    res.json(resources);

  });
};

