import React, { PropTypes, Component } from 'react';
import FRC from 'formsy-react-components';
import DropZone from 'react-dropzone';

const Input = FRC.Input;

class Upload extends Component {

  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);

    this.state = {
      value: props.value,
    }
  }

  onDrop(files) {
    console.log('Received files: ', files);
  }

  render() {
    const { name, label, value } = this.props;

    return (
      <div className="form-group row">
        <label className="control-label col-sm-3">{label}</label>
        <div className="col-sm-9">
          <div className="tags-field">
            <Dropzone onDrop={this.onDrop}>
              <div>Upload test.</div>
            </Dropzone>
            <Input name={name} type="hidden" readOnly value={this.state.value} />
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