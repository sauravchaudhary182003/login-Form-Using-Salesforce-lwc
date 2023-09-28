import { LightningElement } from 'lwc';

export default class ValidationUtil {

    isAlphabet(input) {
        const alphabetRegex = /^[A-Za-z]+$/;
        console.log('this is console of isAlphabet')
            //console.log(alphabetRegex);
        return alphabetRegex.test(input);

    }

    isEmailValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isContactNumberValid(phoneNumber) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }

    isPasswordValid(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    }
}