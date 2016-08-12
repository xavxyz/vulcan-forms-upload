Package.describe({
  name: "xavcz:nova-forms-upload",
  summary: "Telescope upload to S3 input/dropzone package",
  version: "0.26.5-nova",
  git: 'https://github.com/xavcz/nova-forms-upload.git'
});

Package.onUse( function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:core@0.26.5-nova',
    'nova:forms@0.26.5-nova'
  ]);

  api.mainModule("lib/export.js", ["client", "server"]);

});
