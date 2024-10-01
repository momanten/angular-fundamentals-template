import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IconNames } from '@app/shared/types/icons.model';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconName, IconProp } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnChanges{
  @Input() buttonText?:string;
  @Input() iconName?:IconNames;
  @Input() type?:'submit'|'button'= 'button';
  icon: IconProp | undefined;
  
  constructor(private library: FaIconLibrary) {
    this.library.addIconPacks(fas);
  }

  ngOnChanges() {
    if (this.iconName) {
      this.icon = ['fas',this.iconName as IconName]; 
    }
    else this.icon = undefined;
  }

  // Use the names for the inputs `buttonText` and `iconName`.
}
