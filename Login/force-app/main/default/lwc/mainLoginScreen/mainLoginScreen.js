import { LightningElement, track, api } from 'lwc';
import userData from '@salesforce/apex/userInformation.userNameInfo';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomInput extends LightningElement {
    @track userName = 'aaaa';
    @track errorMessage;
    @track inputValue;
    @track userData;
    @track hiding = false;
    @track userRefinedData = [];
    //data connected callback

    connectedCallback() {
        this.userNameData();
        console.log('>>>..16' + this.userName)

    }
    handleInputChange(event) {
        //username input handler
        if (event.target.name == 'InputChange')
            this.inputValue = event.target.value;

        //console.log('>>>..24' + this.userName)
    }

    //new user handler

    handleClick(event) {
        if (event.target.name == 'newUser') {
            const ev = new CustomEvent('newuser');
            this.dispatchEvent(ev);
            //console.log(this.isNewUserCalled);
        }

        //login with passowrd handler


        if (event.target.name == 'loginUsingPassword') {

            //console.log(this.inputValue)
            const isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$|^[0-9]{10}$/.test(this.inputValue);
            this.errorMessage = isValid ? null : true;
            if (this.errorMessage != null) {
                const evt = new ShowToastEvent({
                    title: 'Invalid Format',
                    message: 'Please Enter valid Email or Phone',
                    variant: 'error',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
            } else {
                if (this.userData.emails.includes(this.inputValue) || this.userData.phones.includes(this.inputValue)) {
                    this.userName = this.inputValue;
                    const evnt = new CustomEvent('onlyusername', { detail: this.userName });
                    this.dispatchEvent(evnt);
                    for (var i = 0; i < this.userData.emails.length; i++) {
                        if (this.userName === this.userData.emails[i] || this.userName === this.userData.phones[i]) {
                            //console.log('hello1234');
                            var email = this.userData.emails[i];
                            var phone = this.userData.phones[i];
                            var password = this.userData.password[i];

                        }
                    }
                    this.userRefinedData.push(email);
                    this.userRefinedData.push(phone)
                    this.userRefinedData.push(password)
                        //console.log('hello aray' + this.userRefinedData);

                    const evt = new CustomEvent('userdata', { detail: this.userRefinedData });
                    //console.log('hello' + this.userRefinedData);

                    this.dispatchEvent(evt);
                    //console.log('>>>>>>58' + this.userName);

                    const event = new CustomEvent('captcha');
                    this.dispatchEvent(event);

                } else {
                    const evnt = new ShowToastEvent({
                        title: 'Invalid Username',
                        message: 'Please Enter valid Username',
                        variant: 'error',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(evnt);
                }
            }
        }
        //login with otp handler

        if (event.target.name == 'loginUsingOtp') {
            console.log(this.inputValue)
            const isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$|^[0-9]{10}$/.test(this.inputValue);
            this.errorMessage = isValid ? null : true;
            if (this.errorMessage != null) {
                const evt = new ShowToastEvent({
                    title: 'Invalid Format',
                    message: 'Please Enter Email or Phone',
                    variant: 'error',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
            } else {
                if (this.userData.emails.includes(this.inputValue) || this.userData.phones.includes(this.inputValue)) {
                    this.userName = this.inputValue;
                    const evnt = new CustomEvent('onlyusername', { detail: this.userName });
                    this.dispatchEvent(evnt);
                    for (var i = 0; i < this.userData.emails.length; i++) {

                        if (this.userName === this.userData.emails[i] || this.userName === this.userData.phones[i]) {

                            var emails = this.userData.emails[i];
                            var phones = this.userData.phones[i];
                            var passwords = this.userData.password[i];
                        }
                    }
                    this.userRefinedData.push(emails);
                    this.userRefinedData.push(phones)
                    this.userRefinedData.push(passwords)
                    console.log('hello aray' + this.userRefinedData);

                    const evt = new CustomEvent('userdata', { detail: this.userRefinedData });
                    this.dispatchEvent(evt);


                    const event = new CustomEvent('loginotp');
                    this.dispatchEvent(event);


                } else {
                    const evnt = new ShowToastEvent({
                        title: 'Invalid Username',
                        message: 'Please Enter valid Username',
                        variant: 'error',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(evnt);
                }
            }
        }


    }


    userNameData() {
        userData()
            .then(result => {
                //console.log('Tetsing::>>'.JSON.stringify(result));
                this.userData = result;
                //console.log('hello109' + JSON.stringify(this.userData))
            })
            .catch(error => {
                console.error('Error fetching data:');
            });
    }
}