/*
 * OpenLid, the frontend of the Musikverein Leopoldsdorf.
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

import {Directive, HostListener, Input, Self} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[lidTrim]'
})
export class TrimDirective {

  @Input()
  lidTrim: boolean = false;

  constructor(@Self() private ngControl: NgControl) {
  }

  @HostListener('keyup') trim() {
    const value = this.ngControl.value;
    if (value) {
      this.ngControl.control?.setValue(value.trim());
    }
    if (!this.ngControl.value && this.lidTrim) {
      this.ngControl.control?.setValue(null);
    }
  }
}
