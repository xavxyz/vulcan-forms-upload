import React, { PropTypes, Component } from 'react';
import Telescope from 'meteor/nova:lib';
import Dropzone from 'react-dropzone';

class Upload extends Component {

  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);

    this.state = {
      uploading: false,
      value: props.value,
    }
  }

  onDrop(files) {
    // set the component in upload mode with the preview
    this.setState({
      value: files[0].preview,
      uploading: true,
    });

    // request url to cloudinary
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${Telescope.settings.get("cloudinaryCloudName")}/upload`;

    // request body
    const body = new FormData();
    body.append("file", files[0]);
    body.append("upload_preset", this.props.options.preset);

    // post request to cloudinary
    fetch(cloudinaryUrl, {
      method: "POST",
      body,
    })
    .then(res => res.json()) // json-ify the readable strem
    .then(body => {
      // use the https:// url given by cloudinary
      const avatarUrl = body.secure_url;
      
      // tell NovaForm to catch the value
      this.props.updateCurrentValue(this.props.name, avatarUrl);

      // set the uploading status to false
      this.setState({
        uploading: false,
        value: avatarUrl,
      });
      
    })
    .catch(err => console.log("err", err));
  }

  render() {
    // show the actual uploaded image or the preview
    const { uploading, value } = this.state;

    return (
      <div className="form-group row">
        <label className="control-label col-sm-3">{this.props.label}</label>
        <div className="col-sm-9">
          <div className="upload-field">
            <Dropzone ref="dropzone" 
              multiple={false} 
              onDrop={this.onDrop}
              accept="image/*"
              className="dropzone-base"
              activeClassName="dropzone-active"
              rejectClassName="dropzone-reject"
            >
              <div>Drop an image here, or click to select an image to upload.</div>
            </Dropzone>
            
            {value ? 
              <div className="upload-state">
                {uploading ? <span>Uploading your file...</span> : null}
                <img style={{height: 120}} src={value} />
              </div> 
            : null}
          </div>
        </div>
      </div>
    );
  }
}

Upload.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.any,
  label: React.PropTypes.string
};

export default Upload;