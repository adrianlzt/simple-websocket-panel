import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { Button,FullWidthButtonContainer } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

export class SimplePanel extends PureComponent<Props> {
  state = {
    name: 'echo,',
    messages: [],
    message: '',
  }

  // TODO: change server dynamically when it is modified on the editor
  ws = new WebSocket(this.props.options.wss_server)

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      this.setState({
        message: evt.data,
      })
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(this.props.options.wss_server),
      })
    }
  }

  clickButton = (e: any) => {
    e.preventDefault();
    this.ws.send(this.props.options.button_value)
  }


  render() {
    const { options, width, height } = this.props;

    return (
      <div
        style={{
          position: 'relative',
          width,
          height,
        }}
      >
        { options.button == "" &&
          <div
            style={{
              fontSize: '5vw',
              textAlign: 'center',
            }}
          >
          {this.state.message}
          </div>
          ||
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <FullWidthButtonContainer>
              <Button
                size='lg'
                onClick={this.clickButton}
              >
                {options.button}
              </Button>
            </FullWidthButtonContainer>
          </div>
        }
      </div>
    );
  }
}
