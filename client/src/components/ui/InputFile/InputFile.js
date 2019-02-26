import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';
import { Wrapper } from './InputFile.style';

class InputFile extends PureComponent {

  static propTypes = {
    fileName    : PropTypes.string,
    placeholder : PropTypes.string,
    accept      : PropTypes.string,
    onChange    : PropTypes.func.isRequired,
  }

  static defaultProps = {
    fileName    : '',
    placeholder : '',
    accept      : '*',
  }

  constructor(props) {
    super(props);
    this.onSelectFile  = this.onSelectFile.bind(this);
    this.onClickBrowse = this.onClickBrowse.bind(this);
    this.inputFileRef  = React.createRef();
  }

  onSelectFile({ target }) {
    const { onChange } = this.props;
    const [file] = target.files;
    const { name } = file;
    onChange({ file, name });
  }

  onClickBrowse() {
    this.inputFileRef.current.click();
  }

  render() {
    const { fileName, placeholder, accept } = this.props;

    return (
      <Wrapper>
        <Input
          fluid
          action
          type="text"
          placeholder={placeholder}
          value={fileName}
          onChange={() => {}}
        >
          <input />
          <Button onClick={this.onClickBrowse}>Browse</Button>
        </Input>
        <input
          ref={this.inputFileRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={this.onSelectFile}
        />
      </Wrapper>
    );
  }
}

export default InputFile;
