import React, { PureComponent } from 'react';
import { FormField } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';

import { SimpleOptions } from './types';

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  onTextChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, wss_server: target.value });
  };
  onButtonChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, button: target.value });
  };
  onButtonValueChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, button_value: target.value });
  };

  render() {
    const { options } = this.props;

    return (
      <div className="section gf-form-group">
        <h5 className="section-heading">Config</h5>
        <FormField label="WS Server" labelWidth={6} inputWidth={25} type="text" onChange={this.onTextChanged} value={options.wss_server || ''} />
        <br/>
        <span>
        Define a value for the "Button" field to change the value retrieved in the websocket channel with a Button to send a command with the content of "Button value"
        </span>
        <FormField label="Button" labelWidth={6} inputWidth={25} type="text" onChange={this.onButtonChanged} value={options.button || ''} />
        <FormField label="Button value" labelWidth={7} inputWidth={25} type="text" onChange={this.onButtonValueChanged} value={options.button_value || ''} />
      </div>
    );
  }
}
