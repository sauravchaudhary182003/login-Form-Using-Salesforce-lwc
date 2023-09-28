import { LightningElement, track, api } from 'lwc';

export default class Container extends LightningElement {

    @track isNewuserVisible = false;
    @track isMainScreenVisible = true;
    @track isPasswordVisible = false;
    @track isMainUserLoginScreenVisible = false;
    @track isOtpVisible = false
    @track userNames;
    @track onlyUserNames;
    newusers() {
        this.isNewuserVisible = true;
        this.isMainScreenVisible = false;
        this.isPasswordVisible = false;
        this.isMainUserLoginScreenVisible = false;
        this.isOtpVisible = false;
    }
    handleBack() {
        this.isMainScreenVisible = true;
        this.isNewuserVisible = false;
        this.isPasswordVisible = false;
        this.isMainUserLoginScreenVisible = false;
        this.isOtpVisible = false;

    }
    handleNewUserSave() {
        this.isNewuserVisible = false;
        this.isMainScreenVisible = true;
        this.isPasswordVisible = false;
        this.isMainUserLoginScreenVisible = false;
        this.isOtpVisible = false;

    }
    captcha() {
        this.isNewuserVisible = false;
        this.isMainScreenVisible = false;
        this.isPasswordVisible = true;
        this.isMainUserLoginScreenVisible = false;
        this.isOtpVisible = false;

    }
    userMainScreen() {
        this.isNewuserVisible = false;
        this.isMainScreenVisible = false;
        this.isPasswordVisible = false;
        this.isMainUserLoginScreenVisible = true;
        this.isOtpVisible = false;

    }
    otpLogin() {
        this.isNewuserVisible = false;
        this.isMainScreenVisible = false;
        this.isPasswordVisible = false;
        this.isMainUserLoginScreenVisible = false;
        this.isOtpVisible = true;

    }
    @track userRefinededData;
    // taking data from main login screen and sending data to login with password

    @track dataToPass;

    userData(event) {
        this.userRefinededData = event.detail;
        console.log('username 43>' + this.userRefinededData);
        this.dataToPass = this.userRefinededData;
        console.log('this is data to pass' + this.dataToPass);
    }
    onlyUsername(event) {
        this.userNames = event.detail;
        this.onlyUserNames = this.userNames;
        console.log('this is only username in container' + this.onlyUserNames)
    }
}