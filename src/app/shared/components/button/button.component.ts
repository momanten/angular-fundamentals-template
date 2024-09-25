import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconName, IconProp } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent{
  @Input() buttonText?:string;
  @Input() iconName?:'trash-can' | 'pencil';
  icon: IconProp | undefined;
  
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit() {
    if (this.iconName) {
      this.icon = ['fas',this.iconName as IconName]; 
    }
    else this.icon = undefined;
  }

  // Use the names for the inputs `buttonText` and `iconName`.
}
