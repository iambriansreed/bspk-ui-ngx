import { sendAriaLiveMessage } from './sendAriaLiveMessage';

/**
 * A temporary utility to send a snackbar message to the user. In the future, this should be replaced with the proper
 * snackbar service/component.
 */
export function sendSnackbar(message: string): void {
    // minimal snackbar positioned center bottom in the body and removed after 3 seconds

    const snackbar = document.createElement('div');
    snackbar.style.position = 'fixed';
    snackbar.style.bottom = '1em';
    snackbar.style.left = '50%';
    snackbar.style.transform = 'translateX(-50%)';
    snackbar.style.background = 'black';
    snackbar.style.color = 'white';
    snackbar.style.padding = '8px 16px';
    snackbar.style.borderRadius = '4px';
    snackbar.textContent = message;

    document.body.appendChild(snackbar);

    setTimeout(() => {
        document.body.removeChild(snackbar);
    }, 3000);

    // For environments where DOM is not available (e.g., server-side rendering), we can log the message
    if (typeof document === 'undefined') {
        console.log(message);
    }

    sendAriaLiveMessage(message);
}
