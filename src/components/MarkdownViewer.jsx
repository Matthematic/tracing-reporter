import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'terra-markdown';
import smoothscroll from 'smoothscroll-polyfill';
import '../styles/MarkdownViewerStyles.scss';

smoothscroll.polyfill();

export const propTypes = {
  /** the url that is prepended to all hyperlinks in the report. */
  baseUrl: PropTypes.string.isRequired,
  /** the raw text of the report's markdown file. MUST be a string, therefore using !raw-loader! is required if using a .mdx file */
  report: PropTypes.string.isRequired,
};

export default class ReportViewer extends React.Component {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.selectedNode = null;
  }

  componentDidMount() {
    const { hash } = window.location;
    if (hash) {
      const anchorEl = document.querySelector(`a[href="${hash}"]`);
      if (anchorEl) {
        const tableEl = anchorEl.parentNode.nextSibling;
        tableEl.classList.add('selected');
        this.selectedNode = tableEl;
        anchorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    const that = this;
    this.ref.addEventListener('click', (event) => {
      if (event.target) {
        console.log("INSIDE CLICK LISTENER")
        let anchorEl;
        // based on where you click on the icon, you could be clicking three different elements
        switch (event.target.tagName) {
          case 'svg':
            anchorEl = event.target.parentNode;
            break;
          case 'path':
            anchorEl = event.target.parentNode.parentNode;
            break;
          case 'a':
            if (event.target.classList.contains('anchor')) {
              anchorEl = event.target;
            }
            break;
          default:
        }

        const tableEl = anchorEl && anchorEl.parentNode.nextSibling;
        if (tableEl) {
          if (that.selectedNode) {
            console.log("REMOVING CLASS", that.selectedNode)
            that.selectedNode.classList.remove('selected');
          }
          console.log("ADDING CLASS", tableEl)
          tableEl.classList.add('selected');
          that.selectedNode = tableEl;
        }
      }
    });
  }

  setRef(node) {
    this.ref = node;
  }

  render() {
    console.log("RENDER")
    const { baseUrl, report } = this.props;
    return (
      <div
        id="report"
        ref={this.setRef}
        style={{
          height: '100%', width: '100%', overflow: 'auto', padding: '40px',
        }}
      >
        <Markdown id="TracingReport" src={report} baseUrl={baseUrl} hasHeadingAnchors />
      </div>
    );
  }
}

ReportViewer.propTypes = propTypes;
