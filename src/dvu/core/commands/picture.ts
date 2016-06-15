import {Command} from '../../core/command'
import {CommandType} from '../../enums/command_types'
import {PictureContext} from '../../geometry/picture_context'
import {Picture} from '../../core/models/picture'
import {DatasetDefinition} from '../../core/data/dataset_definition'
import {CommandInterface} from 'src/dvu/core/commands/command_interface'

export interface PictureCommandInterface extends CommandInterface {
  name: string,
  shortcutKey: string,
  noOfInstances: number,
  onMousedown: (context: PictureContext) => Picture
  onMousemove: (element: Element, context: PictureContext) => Picture
  onMouseup: (element: Element, context: PictureContext) => Picture
  getSummary: (data: PictureContext) => string
}

export class PictureCommand extends Command {
  static noOfInstances: number = 0

  type: CommandType = 'primitive'
  defaultName: string = 'picture'
  datasetDefinition: DatasetDefinition = new DatasetDefinition()

  initEvent: string = 'mousedown'
  modifyEvent: string = 'mousemove'
  endEvent: string = 'mouseup'

  constructor(public name: string, private implementation: PictureCommandInterface) {
    super()
    this.shortcutKey = implementation.shortcutKey
  }

  execute(context: PictureContext, depth: number = 0): Picture {
    return this.draw(context, depth)
  }

  private draw(context: PictureContext, depth: number = 0): Picture {
    let element = this.implementation.onMousedown(context)

    if (!context.instanceCount) {
      console.log(context.instanceCount, this.implementation.noOfInstances)

      this.implementation.noOfInstances = this.implementation.noOfInstances + 1
      context.instanceCount = this.implementation.noOfInstances
    }

    return
  }

  redraw(element: Element, context: PictureContext, depth: number = 0) {
    this.implementation.onMousemove(element, context)
  }

  getSummary(data: PictureContext) {
    return this.implementation.getSummary(data)
  }
}
