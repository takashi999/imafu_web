import { Validators } from '@angular/forms';

export const minLength8Validator = Validators.minLength(8);
export const maxLength10Validator = Validators.maxLength(10);
export const maxLength15Validator = Validators.maxLength(15);
export const maxLength16Validator = Validators.maxLength(16);
export const maxLength20Validator = Validators.maxLength(20);
export const maxLength30Validator = Validators.maxLength(30);
export const maxLength35Validator = Validators.maxLength(35);
export const maxLength40Validator = Validators.maxLength(40);
export const maxLength60Validator = Validators.maxLength(60);
export const maxLength64Validator = Validators.maxLength(64);
export const maxLength100Validator = Validators.maxLength(100);
export const maxLength180Validator = Validators.maxLength(180);
export const maxLength200Validator = Validators.maxLength(200);
export const maxLength500Validator = Validators.maxLength(500);
export const maxLength1000Validator = Validators.maxLength(1000);
export const maxLength100000Validator = Validators.maxLength(100000);

export const passwordValidators = [ minLength8Validator, maxLength100Validator ];
