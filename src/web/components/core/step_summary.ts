import { Component, Input } from 'angular2/core'
import { Step } from '../../../dvu/core/step'

@Component({
  selector: 'pa-step-summary',
  template: `
    <div *ngIf="step" class="step-summary">
      <span class="summary">{{step?.getSummary()}}</span>
    </div>
    <div *ngIf="!step" class="step-summary">No command selected.</div>
  `
})
export class StepSummary {
  @Input() step: Step
}
