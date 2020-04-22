export interface SimpleOptions {
  text: string;
  wss_server: string;
  button: string;
  button_value: string;
  audio: boolean;
}

export const defaults: SimpleOptions = {
  text: 'The default text!',
  wss_server: 'http://localhost:8099',
  button: '',
  button_value: '',
  audio: false,
};
