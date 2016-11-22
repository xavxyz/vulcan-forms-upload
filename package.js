Package.describe({
  name: "xavcz:nova-forms-upload",
  summary: "Telescope Nova package extending nova:forms to upload images to Cloudinary from a drop zone.",
  version: "0.27.4-nova",
  git: 'https://github.com/xavcz/nova-forms-upload.git'
});

Package.onUse( function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:core@0.27.4-nova',
    'nova:forms@0.27.4-nova',
    'fourseven:scss'
  ]);

  api.addFiles([
    "lib/components/Upload.scss"
  ], "client");

  api.mainModule("lib/export.js", ["client", "server"]);

});
