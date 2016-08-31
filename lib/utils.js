import Telescope from 'meteor/nova:lib';

// function used to avoid bug and block the usage of the package: return false if settings are invalid 
const checkSettings = () => Telescope.settings != "undefined" && typeof Telescope.settings.get('cloudinaryCloudName') === 'string' && typeof Telescope.settings.get('cloudinaryPresets') === 'object';

//better use this?
//const checkSettings = () => Meteor.settings && Meteor.settings.cloudinaryCloudName && Meteor.settings.cloudinaryPresets;

export default checkSettings;
