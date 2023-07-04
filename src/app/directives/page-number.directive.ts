import {Directive, HostBinding, HostListener} from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from "@angular/forms";
import {PageNumber} from "../common/archive";

@Directive({
  selector: "input[lidPageNumber]",
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: PageNumberDirective,
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: PageNumberDirective,
    multi: true
  }]
})
//todo: when using this directive, it causes n0100 because of prefilled values
export class PageNumberDirective implements ControlValueAccessor, Validator {

  @HostBinding("value")
  hostValue!: string;

  @HostListener("input", ["$event.target.value"])
  onInput = (value: string) => {
    console.warn("Called onInput without registered callback in PageNumberDirective", value);
  };

  registerOnChange(callback: (_: unknown) => void): void {
    this.onInput = (value: string) => {
      callback(this.getPageNumber(value));
    };
  }

  registerOnTouched(callback: unknown): void {
    console.debug("Try to register onTouched", callback);
  }

  writeValue(pageNumber: PageNumber | null): void {
    if (!pageNumber) {
      this.hostValue = "";
      return;
    }
    this.hostValue = `${pageNumber.prefix ?? ""}${pageNumber.number}${pageNumber.suffix ?? ""}`;
  }

  getPageNumber(value: string | null) {
    console.trace("getPageNumber(value)", value);
    if (value) {
      const trimmed = value.replace(" ", "");
      const numberBegin = trimmed.search(new RegExp("[0-9]"));
      const numberEnd = trimmed.search(new RegExp("[0-9][^0-9]*$"));
      console.debug("numend", trimmed.substring(numberEnd));
      if (numberBegin < 0) {
        return null;
      }
      const num = parseInt(trimmed.substring(numberBegin, numberEnd + 1));
      const suffix = trimmed.substring(numberEnd + 1);
      const pageNumber: PageNumber = {
        number: num,
        prefix: numberBegin === 0 ? null : trimmed.substring(0, numberBegin),
        suffix: suffix ?? null,
      };
      return pageNumber;
    }
    return null;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value && this.getPageNumber(this.hostValue) ? null : {pageNumber: true};
  }
}
