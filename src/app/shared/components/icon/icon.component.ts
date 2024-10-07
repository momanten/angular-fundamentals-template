import { Component, Input } from '@angular/core';
import { IconNames } from '@app/shared/types/icons.model';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {

  /* IconNames=IconNames; */

  @Input() iconName: IconNames = IconNames.Pencil;

  get icon(): IconProp {
    return ['fas', this.iconName] as IconProp;
  }

}
