// captchaComponent.js
import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CaptchaComponent extends LightningElement {
    @track userInput = '';
    captchaText = '';
    @track stringLength;
    @track flag = 'abc';

    connectedCallback() {
        this.generateCaptcha();
    }

    generateCaptcha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+=:"{}[]?.<.,>';
        const charLength = characters.length;
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * charLength);
            captcha += characters.charAt(randomIndex);
        }
        this.captchaText = captcha;
    }

    validateCaptcha(event) {

        this.userInput = event.target.value;
        this.stringLength = this.userInput.length;
        console.log('hello>>31' + this.stringLength);

        if (this.stringLength === 6) {
            if (this.userInput === this.captchaText) {
                console.log('hello 35')
                const evt = new ShowToastEvent({
                    title: 'Captcha Matched',
                    message: '',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
                this.flag = true;
            } else {

                this.generateCaptcha();
                this.userInput = '';
                console.log('hello 35')
                const evt = new ShowToastEvent({
                    title: 'Invalid Otp',
                    message: 'Please Enter valid Otp',
                    variant: 'error',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
                this.flag = false;
            }

            const evnt = new CustomEvent('senddata', { detail: this.flag });
            this.dispatchEvent(evnt);
        }

    }
}