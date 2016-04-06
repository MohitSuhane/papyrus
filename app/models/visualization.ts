import { Visualizable } from '../interfaces/visualization'
import { Step } from './step'

export class CompositeVisualization implements Visualizable {
  id: string
  name: string = 'unnamed'
  data: Object
  steps: Step[]
  parent: Visualizable
  
  constructor(parent) {
    this.id = 'pa-vis-' + (+new Date())
    this.parent = parent
  }
  
  draw(data) {
    this.steps.forEach(s => s.execute())
  }
  
  move(x, y) {
    
  }
  
  scale(xRatio, yRatio) {
    
  }
  
  rotate(angle) {
    
  }
}
