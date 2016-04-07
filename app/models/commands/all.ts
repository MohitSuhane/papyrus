import { Command } from '../../interfaces/command'
import { Circle } from './primitives/circle'
import { Line } from './primitives/line'
import { Rect } from './primitives/rect'
import { Text } from './primitives/text'
import { Svg } from './primitives/svg'

export default {
  Circle,
  Line,
  Rect,
  Svg,
  Text
}

export const COMMANDS: Command[] = [
  new Line('x'),
  new Circle('c'),
  new Rect('r'),
  new Text('t')
]
