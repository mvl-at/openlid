/*
 * Lid, the frontend of the Musikverein Leopoldsdorf.
 * Copyright (C) 2021  Richard Stöckl
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 */

import {Component, ElementRef, HostBinding, Input, OnInit, Optional, Self, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ControlValueAccessor, FormControl, NgControl} from '@angular/forms';
import {map, Observable, startWith, Subject} from 'rxjs';
import {MatChipInputEvent, MatChipList} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatFormFieldControl} from '@angular/material/form-field';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'lid-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: ChipListComponent}]
})
export class ChipListComponent implements OnInit, MatFormFieldControl<string[]>, ControlValueAccessor {
  static nextId = 0;
  @Input() allItems: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @Input() ariaLabel: string = 'Element Auswahl';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl('');
  filteredItems: Observable<string[]>;
  @ViewChild('itemInput') itemInput!: ElementRef<HTMLInputElement>;
  @ViewChild(MatChipList) rootChipList!: MatChipList;
  readonly autofilled: boolean = false;
  readonly controlType: string = 'chip-list-input';
  focused: boolean = false;
  @HostBinding() readonly id = `chip-list-input-${ChipListComponent.nextId++}`;
  readonly stateChanges = new Subject<void>();
  @Input('aria-describedby') userAriaDescribedBy: string = '';
  private touched: boolean = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.filteredItems = this.itemCtrl.valueChanges.pipe(startWith(null), map((item: string | null) => (item ? this._filter(item) : this.allItems.slice())),);
  }

  _value: string[] = ['Lemon'];

  get value() {
    return this._value;
  }

  set value(value: string[]) {
    this._value = value;
  }

  private _disabled = false;

  @Input() get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.itemCtrl.disable() : this.itemCtrl.enable();
    this.stateChanges.next();
  }

  get empty() {
    return !this.value || this.value.length === 0;
  }

  get errorState(): boolean {
    return this.itemCtrl.invalid && this.touched;
  }

  private _required = false;

  @Input() get required() {
    return this._required;
  }

  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @HostBinding('class.floating') get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  private _placeholder: string = 'Neues Element...';

  @Input() get placeholder() {
    return this._placeholder;
  }

  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  onChange: any = () => {
  };

  onTouched: any = () => {
  };

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDescribedByIds(ids: string[]) {
    if (this.itemInput) {
      const controlElement = this.itemInput.nativeElement
        .querySelector('.chipList')!;
      if (controlElement) {
        controlElement.setAttribute('aria-describedby', ids.join(' '));
      }
    }
    if (this.rootChipList) {
      this.rootChipList.setDescribedByIds(ids);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our item
    if (value) {
      this.value.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.itemCtrl.setValue(null);
  }

  remove(item: string): void {
    const index = this.value.indexOf(item);

    if (index >= 0) {
      this.value.splice(index, 1);
    }
    this.stateChanges.next();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.value.push(event.option.viewValue);
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.itemInput.nativeElement.querySelector('input')?.focus();
    }
  }

  onFocusIn(_event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this.itemInput.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.stateChanges.next();
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allItems.filter(item => item.toLowerCase().includes(filterValue));
  }

}
