// Inspired by https://twitter.com/danvdk/status/1301707026507198464

type ExtractRouteQuery<S extends string> =
    S extends `${infer Start}?${infer Query}=${infer Value}&${infer Rest}` 
        ? { [k in Query | keyof ExtractRouteQuery<Rest>]: string }
        : S extends `${infer Query}=${infer Value}&${infer Rest}`
            ? { [k in Query | keyof ExtractRouteQuery<Rest>]: string }
            : S extends `${infer Start}?${infer Query}=${infer Value}`
                ? { [k in Query]: string }
                : S extends `${infer Query}=${infer Value}`
                    ? { [k in Query]: string }
                    : never;

declare function extractRouteQuery<S extends string>(str: S): ExtractRouteQuery<S>;

const query = extractRouteQuery('/api?user=admin&password=secure123&token=abc')