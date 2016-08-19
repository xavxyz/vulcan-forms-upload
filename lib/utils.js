import Telescope from 'meteor/nova:lib';

// function used to avoid bug and block the usage of the package: return false if settings are invalid
const checkSettings = () => typeof Telescope.settings.get('cloudinaryCloudName') === 'string' && typeof Telescope.settings.get('cloudinaryPresets') === 'object';

export default checkSettings;