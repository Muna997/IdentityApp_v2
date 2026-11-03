import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  imports: [],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
})
export class FormInput implements ControlValueAccessor {
  @Input() type?: string;
  @Input() placeholder?: string;
  @Input() label?: string;
  isPassword: boolean = false;
  show = false;
  value: string = '';
  disabled: boolean = false;

  onChange: (val: string) => void = () => {};
  onTouch: (val: string) => void = () => {};
  writeValue(val: string): void {
    this.value = val;
  }
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }
  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: (val: string) => void): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(newValue: string) {
    this.value = newValue;
    this.onChange(newValue);
  }
  displayPassword() {
    this.show = !this.show;
  }
}
