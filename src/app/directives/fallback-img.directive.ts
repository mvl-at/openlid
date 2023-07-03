import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: 'img[lidFallback]'
})
export class FallbackImgDirective {

  @Input()
  @HostBinding('src')
  src!: string;
  @Input() lidFallback!: string;

  @HostListener('error')
  onError() {
    this.src = this.lidFallback;
  }
}
