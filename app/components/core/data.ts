import { Component } from 'angular2/core'
import { PanelComponent as Panel } from '../generic/panel'

@Component({
  selector: 'pa-data',
  template: `
    <pa-panel title="Data">
    
    </pa-panel>
  `,
  directives: [Panel]
})
export class PapyrusData {
  
}
