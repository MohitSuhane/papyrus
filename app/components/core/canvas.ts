import { Component, Input, Output, EventEmitter, OnInit } from 'angular2/core'
import { Command } from '../../interfaces/command'
import { CompositeVisualization } from '../../models/visualization'
import { Step } from '../../models/step'
import { StepSummary } from '../core/step_summary'
import { VisualizationCanvas } from '../core/visualization_canvas'
import { CommandBar } from '../core/command_bar'

@Component({
  selector: 'pa-canvas',
  template: `
    <div (keydown)="activateCommand($event)" tabindex="1" autofocus>
      <div class="left-canvas col">
        <pa-step-summary [step]="currentStep || previousStep"></pa-step-summary>
        <pa-vis-canvas [visualization]="visualization" (mouse)="handleMouseEvent($event)"></pa-vis-canvas>
      </div>
      <div class="right-canvas col">
        <pa-command-bar [commands]="commands" [currentCommand]="currentCommand" (select)="changeCommand($event)"></pa-command-bar>
      </div>
    </div>
  `,
  directives: [StepSummary, VisualizationCanvas, CommandBar]
})
export class PapyrusCanvas {
  @Input() commands
  @Input() visualization: CompositeVisualization
  
  currentStep: Step
  previousStep: Step
  currentCommand
  
  @Output() steps: EventEmitter<Step> = new EventEmitter()

  constructor() {
  
  }
  
  activateCommand(e) {
    const keyCode = e.keyCode
    let selectedCommand: Command
    
    if (keyCode >= 65 && keyCode <= 90) {
      selectedCommand = this.commands.find(cmd => cmd.actionKey.charCodeAt(0) - 32 === keyCode)
    }
    
    if (selectedCommand !== undefined) {
      this.currentCommand = selectedCommand
    }
  }
  
  changeCommand(e) {
    this.currentCommand = e.activeCommand;
  }
  
  handleMouseEvent(e) {
    if (this.currentCommand) {
      if (this.currentCommand.initEvent === e.type) {
        this.currentStep = new Step(this.currentCommand, e)
      } else if (this.currentStep && this.currentCommand.modifyEvent === e.type && this.currentStep) {
        this.currentStep.modify(e)
      } else if (this.currentStep && this.currentCommand.endEvent === e.type) {
        this.currentStep.end()
        this.visualization.steps.push(this.currentStep)
        
        this.previousStep = this.currentStep
        this.currentStep = undefined
        this.steps.emit(this.currentStep)
      }
    }
  }
}
