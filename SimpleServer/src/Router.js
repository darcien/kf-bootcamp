// @flow

type Route = {
  pattern: string,
  placeholders: {[number]: string},
  handler: Function,
};

export function getPlaceholders(pattern: string) {
  let splitPattern = pattern.slice(1).split('/');
  let placeholders = {};

  for (let i = 0; i < splitPattern.length; i++) {
    let word = splitPattern[i];
    if (word.startsWith(':')) {
      placeholders[i] = word.replace(':', '');
    }
  }

  return placeholders;
}

export function tryMatchPattern(pattern: string, path: string) {
  let splitPattern = pattern.slice(1).split('/');
  let splitPath = path.slice(1).split('/');
  let placeholders = getPlaceholders(pattern);
  let pathData = {};

  for (let i = 0; i < splitPattern.length; i++) {
    let isMatch;
    if (splitPattern[i].includes(':')) {
      isMatch = true;
      if (splitPath[i]) {
        pathData[placeholders[i]] = splitPath[i];
      }
    } else {
      isMatch = splitPattern[i] === splitPath[i];
    }

    if (!isMatch) {
      return null;
    }
  }
  let pathDataNum = Object.keys(pathData).length;
  return pathDataNum ? pathData : null;
}

export default class Router {
  availableRoutes: Array<Route> = [];

  addRoute(pattern: string, handler: Function) {
    this.availableRoutes.push({
      pattern,
      placeholders: getPlaceholders(pattern),
      handler,
    });
  }

  handleRequest(path: string, context: Object) {
    // variable from the pattern or path
    // handler(context: Object, variable: string);

    let pathData = {};

    for (let i = 0; i < this.availableRoutes.length; i++) {
      let route = this.availableRoutes[i];
      let {handler, pattern} = route;
      if (pattern.split('/').length !== path.split('/').length) {
        continue;
      } else {
        pathData = tryMatchPattern(pattern, path);
      }

      if (pathData != null) {
        handler(context, pathData);
        return;
      } else {
        handler(context);
        return;
      }
    }
  }
}
