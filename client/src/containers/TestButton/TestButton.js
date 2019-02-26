import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import { showSuccess, showError, showWarning, showInfo } from '../../helpers/notifications';

class TestButton extends Component {

  constructor(props) {
    super(props);
    this.onTestNotification = this.onTestNotification.bind(this);

    this.state = {
      notificationsCount: 1,
    };
  }

  onTestNotification() {
    const { notificationsCount } = this.state;

    switch (notificationsCount) {
      case 1: {
        showSuccess({ message: 'So fas so good' });
        break;
      }

      case 2: {
        showError({ message: 'Oops...' });
        break;
      }

      case 3: {
        showWarning({ message: 'Be careful...' });
        break;
      }

      case 4: {
        showInfo({ message: 'Tomorrow monday :(' });
        break;
      }

      default:
    }

    this.setState({
      notificationsCount: notificationsCount === 4 ? 1 : notificationsCount + 1,
    });
  }

  render() {
    return (
      <Button onClick={this.onTestNotification}>
        Notifications
      </Button>
    );
  }
}

export default TestButton;
