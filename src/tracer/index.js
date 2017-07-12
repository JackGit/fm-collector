import Tracer from './tracer'
const tracer = new Tracer()

export default {
  trace,
  report
}

function trace () {
  return tracer.trace.apply(tracer, arguments)
}

function report () {
  return tracer.report.apply(tracer, arguments)
}