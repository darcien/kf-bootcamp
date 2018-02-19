// @flow

type Route = {
  pattern: string,
  base: string,
  placeholder: ?string,
  handler: Function,
};

export function parsePattern(pattern: string) {
  let parsedPattern = {pattern};
  let splittedPattern = pattern.split(':');
  if (splittedPattern.length > 1) {
    parsedPattern = {
      ...parsedPattern,
      placeholder: splittedPattern.pop(),
      base: splittedPattern.pop(),
    };
    return parsedPattern;
  } else {
    return {pattern, base: pattern, placeholder: null};
  }
}

export function parsePath(path: string) {
  let parsedPath = {path};
  let splittedPath = path.split('/');
  if (!splittedPath.pop().includes('.')) {
    parsedPath = {...parsedPath, dir: path, file: null};
  } else {
    let lastSlash = path.lastIndexOf('/');
    parsedPath = {
      ...parsedPath,
      dir: path.substring(0, lastSlash),
      file: path.substring(lastSlash + 1),
    };
  }
  return parsedPath;
}

export default class Router {
  availableRoutes: {[routeName: string]: Route} = {};

  addRoute(pattern: string, handler: Function) {
    let parsedPattern = parsePattern(pattern);
    let {base} = parsedPattern;
    this.availableRoutes[base] = {...parsedPattern, handler};
  }

  handleRequest(path: string, context: Object) {
    // variable from the pattern or path
    // handler(context: Object, variable: string);

    let availableRouteNames = Object.keys(this.availableRoutes);

    for (let routeName of availableRouteNames) {
      if (path.startsWith(routeName)) {
      }
    }

    let handler = this.availableRoutes[path];

    if (handler) {
      // handler(context);
    }
  }
}
