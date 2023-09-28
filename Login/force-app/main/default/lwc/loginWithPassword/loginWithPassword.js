import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class loginWithPassword extends LightningElement {
    @api userdata;
    @track flags;
    @track inputPassword;
    @track newUName;
    @api usernameonly;
    @track onlyuserName
    connectedCallback() {
        this.hello();
        console.log('2ty' + this.usernameonly);
    }
    hello() {

        this.newUName = this.userdata;
        console.log(this.userdata);
        console.log('hello hii' + this.newUName)

        console.log('hello8' + this.userdata)
        this.onlyuserName = this.usernameonly;
        console.log('hello19' + this.onlyuserName)
    }

    flag(event) {
        this.flags = event.detail;
        console.log('hello........');
        console.log('hello this is flag' + this.flags)
    }
    handleChange(event) {
        this.inputPassword = event.target.value;
        console.log(this.inputPassword)
    }
    handleClick(event) {
        console.log('hello');
        if (this.newUName.includes(this.inputPassword)) {
            if (this.flags == true) {
                console.log('this is event check')
                const event = new CustomEvent('userloginvisisble');
                this.dispatchEvent(event);
                const evt = new ShowToastEvent({
                    title: 'Login sucessfully',
                    message: 'Thank you for login',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);

            } else {
                const evt = new ShowToastEvent({
                    title: 'Invalid Captcha',
                    message: 'Complete captcha first',
                    variant: 'error',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);

            }
        } else {
            const evnt = new ShowToastEvent({
                title: 'Invalid Password',
                message: 'Please enter correct password',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(evnt);

        }


    }
    @track isChecked = false;
    types = 'password';

    handleCheckboxChange(event) {
        this.isChecked = event.target.checked;
        this.types = this.isChecked ? 'text' : 'password';

        console.log(this.isChecked);
        console.log(this.types);
    }



}