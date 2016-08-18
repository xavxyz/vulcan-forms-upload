# nova-upload
🏖🔭 Telescope Nova package extending `nova:forms` to upload images to Cloudinary from a drop zone.

![Screenshot](https://res.cloudinary.com/xavcz/image/upload/v1471534203/Capture_d_e%CC%81cran_2016-08-17_14.22.14_ehwv0d.png)

Want to add this to your Nova instance? Read below:

## Installation

#### 1. Meteor package
I would recommend that you clone this repo in your Nova's `/packages` folder. 

And then modify the `packages` file in `.meteor/packages`. 

*Note: You can also add it via the classic `meteor add xavcz:nova-forms-upload`, however you may encounter load order issue.*

#### 2. NPM dependency
This package depends on the awesome `react-dropzone` ([repo](https://github.com/okonet/react-dropzone)), you need to install the dependency: 
```
npm install react-dropzone
```

#### 3. Cloudinary account
Create a [Cloudinary account](https://cloudinary.com) if you don't have one. 

The upload to Cloudinary relies on **unsigned upload**:

> Unsigned upload is an option for performing upload directly from a browser or mobile application with no authentication signature, and without going through your servers at all. However, for security reasons, not all upload parameters can be specified directly when performing unsigned upload calls.

Unsigned upload options are controlled by [an upload preset](http://cloudinary.com/documentation/upload_images#upload_presets), so in order to use this feature you first need to enable unsigned uploading for your Cloudinary account from the [Upload Settings](https://cloudinary.com/console/settings/upload) page.

When creating your **preset**, you can define image transformations. I recommend to set something like 200px width & height, fill mode and auto quality. Once created, you will get a preset id.

It may look like this:

![Screenshot-Cloudinary](https://res.cloudinary.com/xavcz/image/upload/v1471534183/Capture_d_e%CC%81cran_2016-08-18_17.07.52_tr9uoh.png)

#### 4. Nova Settings
Edit your `settings.json` and add inside the `public: { ... }` block the following entries with your own credentials:

```json
public: {
  ...
  "cloudinaryCloudName": "YOUR_APP_NAME",
  "cloudinaryPresets": {
    "avatar": "YOUR_PRESET_ID"
  }
}
```

Picture upload in Nova is now enabled! Easy-peasy, right? 👯

## How to use?

This is a classic form extension with [custom fields](https://www.youtube.com/watch?v=1yTT48xaSy8) like `nova:form-tags` or `nova:embedly`.

This package extends out-of-the-box the `nova:users` package to provide avatar upload for your users (as an experiment and a demonstration).

## S3? Google Cloud?
Feel free to contribute to add new features and flexibility to this package :)

You are welcome to come chat about it [on the Telescope Slack chatroom](http://slack.telescopeapp.org)

Happy hacking! 🚀
