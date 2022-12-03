import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime, distinctUntilChanged, first, map, switchMap } from 'rxjs';
import { UserService } from '../../user/user.service';
@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor(private userService: UserService) {}

  required = (error: string) => (control: AbstractControl) => {
    if (control.value === null || control.value === undefined || control.value === '') {
      return { required: error };
    }
    return null;
  };

  email = (error: string) => (control: AbstractControl) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (control.value && !emailRegex.test(control.value)) {
      return { email: error };
    }
    return null;
  };

  minLength = (minLength: number, error: string) => (control: AbstractControl) => {
    if (control.value && control.value.length < minLength) {
      return { minLength: error };
    }
    return null;
  };

  minUppercase = (minUppercase: number, error: string) => (control: AbstractControl) => {
    if (control.value && (control.value.match(/[A-Z]/g)?.length || 0) < minUppercase) {
      return { minUppercase: error };
    }
    return null;
  };

  minLowercase = (minLowercase: number, error: string) => (control: AbstractControl) => {
    if (control.value && (control.value.match(/[a-z]/g)?.length || 0) < minLowercase) {
      return { minLowercase: error };
    }
    return null;
  };

  minNumber = (minNumber: number, error: string) => (control: AbstractControl) => {
    if (control.value && (control.value.match(/[0-9]/g)?.length || 0) < minNumber) {
      return { minNumber: error };
    }
    return null;
  };

  maxLength =
    (maxLength: number, error: string) =>
    (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length > maxLength) {
        return { maxLength: error };
      }
      return null;
    };

  min =
    (min: number, error: string) =>
    (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value < min) {
        return { min: error };
      }
      return null;
    };

  max = (max: number, error: string) => (control: AbstractControl) => {
    if (control.value && control.value > max) {
      return { max: error };
    }
    return null;
  };

  uniqueNickname = (error: string) => (control: AbstractControl) => {
    return control.valueChanges.pipe(
      debounceTime(750),
      distinctUntilChanged(),
      switchMap((value) => this.userService.isUniqueNickname(value)),
      map((unique) => (unique ? null : { uniqueNickname: error })),
      first(),
    );
  };
}
