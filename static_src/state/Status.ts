import { Container } from 'unstated';

const fadeSpeed = 5 * 1000;


type StatusState = {
  message: string
  isError: boolean
  className: string
  timeout: number | null
}


export class StatusContainer extends Container<StatusState> {
  public state: StatusState = {
    message: '',
    isError: false,
    className: 'hidden',
    timeout: null,
  }

  public set = (message: string, isError: boolean = false) => {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
    this.setState({
      message: message,
      isError: isError,
      className: '',
      timeout: setTimeout(this.fadeOut, fadeSpeed),
    });
  }

  public error = (message: string) => {
    this.set(message, true);
  }

  public fadeOut = () => {
    this.setState({
      className: 'fadeOut',
    });
  }

  public close = () => {
    this.setState({
      message: '',
      className: 'hidden',
    });
  }
}
