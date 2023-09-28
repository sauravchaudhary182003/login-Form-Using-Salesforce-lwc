import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendEmail from '@salesforce/apex/userInformation.sendEmail';
export default class LoginWithOtp extends LightningElement {

    @api usernameonly;
    @track flags;
    @track generatedOtp;
    @track inputOtp;
    @track emailTemplate = '<p>Hello ,<br> Username {recipientName} Your OTP for login JoJo software is: {otp} <br> Kindly do not share otp with someone <br> Thanks <br> JoJo Software pvt Ltd.</p>';
    @track subject = 'Otp for JoJo Software Login';
    @track modifiedEmailTemplate;

    connectedCallback() {
        this.hello();
        this.sendOtp();

    }
    hello() {
        console.log('123456' + this.usernameonly);

    }

    flag(event) {
        this.flags = event.detail;
        console.log('hello........');
        console.log('hello this is flag' + this.flags)
    }

    handleChange(event) {
        this.inputOtp = event.target.value;
        console.log('this is' + this.inputOtp);
    }
    sendOtp(event) {
        console.log('hello');
        const min = 1000; // Minimum 4-digit number
        const max = 9999; // Maximum 4-digit number
        this.generatedOtp = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(this.generatedOtp);


        this.modifiedEmailTemplate = this.emailTemplate
            .replace('{recipientName}', this.usernameonly)
            .replace('{otp}', this.generatedOtp);

        // Call the Apex method to send the email
        // sendEmail({ emailTemplate: this.modifiedEmailTemplate, recipientEmail: this.usernameonly, subject: this.subject })
        //     .then(result => {
        //         console.log('Email sent successfully:', result);
        //         const evt = new ShowToastEvent({
        //             title: 'Otp Sent',
        //             variant: 'success',
        //             mode: 'dismissable'
        //         });
        //         this.dispatchEvent(evt);
        //     })
        //     .catch(error => {
        //         console.error('Error sending email:', error);
        //         // Handle errors or display error messages
        //     });

    }


    handleClick() {

        console.log('otp not matched')
        if (this.inputOtp == this.generatedOtp) {
            console.log('hello otp matched')
            if (this.flags) {
                const event = new CustomEvent('userloginvisisble');
                this.dispatchEvent(event);
                const evt = new ShowToastEvent({
                    title: 'Login sucessfully',
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





}