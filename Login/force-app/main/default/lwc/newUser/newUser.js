import { LightningElement, track } from 'lwc';
import saveRecords from '@salesforce/apex/userInformation.saveNewUserForm';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ValidationUtil from './validationUtil';
export default class NewUser extends LightningElement {
    firstName;
    lastName;
    jobTitle;
    phone;
    password;
    email;
    noOfEmployees;
    companyName;
    country;
    finalPassword;
    Confirmpassword;
    connectedCallback() {
        const validationInstance = new ValidationUtil();
        validationInstance.isAlphabet('saurav');
    }

    userInformationSaveHandler(event) {


        const inputName = event.target.name;
        const inputValue = event.target.value;
        if (inputName === 'firstName') {
            this.firstName = inputValue;
            console.log(this.firstName)
        }
        if (inputName === 'lastName') {
            this.lastName = inputValue;
            console.log(this.lastName)
        }
        if (inputName === 'Email') {
            this.email = inputValue;
            console.log(this.email)

        }
        if (inputName === 'JobTitle') {
            this.jobTitle = inputValue;
            console.log(this.jobTitle)
        }
        if (inputName === 'Company') {
            this.companyName = inputValue;
            console.log(this.companyName)
        }
        if (inputName === 'EmployeeNumber') {
            this.noOfEmployees = inputValue;
            console.log(this.noOfEmployees)
        }
        if (inputName === 'Country') {
            this.country = inputValue;
            console.log(this.country)
        }
        if (inputName === 'Phone') {
            this.phone = inputValue;
            console.log(this.phone)
        }
        if (inputName === 'Password') {
            this.password = inputValue;
            console.log(this.password)
        }

        if (inputName === 'ConfirmPassword') {
            this.Confirmpassword = inputValue;
            console.log(this.Confirmpassword)
        }



    }
    isMainscreenCalled = 'true';


    newUserSave() {
        if (this.password === this.Confirmpassword) {
            this.finalPassword = this.password;
            console.log(this.finalPassword);
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Password Mismatched',
                    variant: 'Error',
                })
            );
        }


        console.log('final Password' + this.finalPassword);
        if (this.finalPassword) {
            saveRecords({
                    firstName: this.firstName,
                    lastname: this.lastName,
                    noOfEmployee: this.noOfEmployees,
                    Country: this.country,
                    email: this.email,
                    jobTitle: this.jobTitle,
                    CompanyName: this.companyName,
                    phone: this.phone,
                    password: this.finalPassword

                })
                .then(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Record saved successfully',
                            variant: 'success',
                        })
                    );
                    const event = new CustomEvent("save");
                    this.dispatchEvent(event);
                    console.log('hello');


                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Cannot Save Record',
                            message: 'You have not completed the Reqired fields, or you have already registered',
                            variant: 'error',
                        })
                    );
                });
        }
    }
    newUserCancel() {
        const event = new CustomEvent("back");
        this.dispatchEvent(event);
    }

}