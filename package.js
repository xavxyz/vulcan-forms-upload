Package.describe({
  name: "xavcz:nova-forms-upload",
  summary: "Telescope Nova package extending nova:forms to upload images to Cloudinary from a drop zone.",
  version: "1.2.0",
  git: 'https://github.com/xavcz/nova-forms-upload.git'
});

Package.onUse( function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'vulcan:core@1.2.0',
    'vulcan:forms@1.2.0',
    'fourseven:scss'
  ]);

  api.addFiles([
    "lib/Upload.scss"
  ], "client");

  api.mainModule("lib/modules.js", ["client", "server"]);

});
