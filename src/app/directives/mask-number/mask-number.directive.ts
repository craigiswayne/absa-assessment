import {AfterViewInit, Directive, ElementRef} from '@angular/core';

/**
 * Used to mask sensitive numbers
 * will mask numbers more than 4 digits long
 *
 * Adds a CTA to the Element so that the unmasked value can be shown
 */
@Directive({
  selector: '[appMaskNumber]'
})
export class MaskNumberDirective implements AfterViewInit {

  private readonly regex = /^(?<mask>\d.*)(?<nomask>\d{4})$/;

  constructor(private readonly elementRef: ElementRef) {}

  public ngAfterViewInit() {
    this.maskInput();
  }

  private maskInput(): void {
    if(this.elementRef.nativeElement.innerHTML.match(this.regex) === null){
      return
    }

    this.elementRef.nativeElement.innerHTML = this.elementRef.nativeElement.innerHTML.replace(this.regex, '****$2');
  }

}
