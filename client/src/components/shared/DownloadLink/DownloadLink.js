/*
  const blobData = new Blob([reportData], { type: 'text/plain' });

  const a   = document.createElement('a');
  const url = window.URL.createObjectURL(blobData);

  a.href = url;
  a.download = fileName;
  a.innerHTML = 'Download';

  const holder = document.getElementById(`reportLinkHolder-${id}`);
  if (holder) {
    holder.innerHTML = '';
    holder.appendChild(a);
  }
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Label } from './DownloadLink.style';

const DownloadLink = ({ label, title, fileName, fileData, type }) => {

  if (!fileData) {
    return null;
  }

  const blobData = new Blob([fileData], { type });
  const url = window.URL.createObjectURL(blobData);
  const link = (
    <a href={url} download={fileName}>{title}</a>
  );

  if (!label) {
    return <Wrapper>{link}</Wrapper>;
  }

  return (
    <Wrapper>
      <Label>{label}</Label>
      {link}
    </Wrapper>
  );
};

DownloadLink.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  fileName : PropTypes.string,
  fileData : PropTypes.any,
  type     : PropTypes.string, // MIME type: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
};

DownloadLink.defaultProps = {
  label    : '',
  title    : '',
  fileName : '',
  fileData : null,
  type     : 'text/plain',
};

export default DownloadLink;
