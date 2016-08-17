import React, { PropTypes, Component } from 'react';
// import FRC from 'formsy-react-components';
import Dropzone from 'react-dropzone';

// const Input = FRC.Input;


class Upload extends Component {

  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);

    this.state = {
      value: props.value,
      uploadedFile: "",
    }
  }

  onDrop(files) {
    this.setState({
      ...this.state,
      uploadedFile: files[0],
    });

    const preset = this.props.preset;
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${Telescope.settings.get("cloudinaryCloudName")}/upload`;

    const body = new FormData();
    body.append("file", files[0]);
    body.append("upload_preset", preset);

    fetch(cloudinaryUrl, {
      method: "POST",
      body,
    })
    .then(res => res.json())
    .then(body => {
      this.setState({
        ...this.state,
        value: body.secure_url,
      });
    })
    .catch(err => console.log("err", err));
  }

  render() {
    const { name, label, value } = this.props;

    return (
      <div className="form-group row">
        <label className="control-label col-sm-3">{label}</label>
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
            
            {this.state.uploadedFile ? 
              <div className="upload-state">
                {this.state.value ? 
                  <img style={{height: 120}} src={this.state.value} />
                : <div>
                    <span>Uploading your file...</span>
                    <img style={{height: 120}} src={this.state.uploadedFile.preview} />
                  </div>}
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
}

export default Upload;