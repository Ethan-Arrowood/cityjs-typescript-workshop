// Inspired by https://twitter.com/danvdk/status/1301707026507198464

type ExtractRouteQuery<S extends string> = {};

declare function extractRouteQuery<S extends string>(str: S): ExtractRouteQuery<S>;

const query = extractRouteQuery('/api?user=admin&password=secure123&token=abc')