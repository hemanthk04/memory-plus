/**
 * Converts a numeric embedding into PostgreSQL's
 * vector literal format.
 *
 * Example:
 * [0.1,0.2,0.3]
 */
export function toPgVector(values) {
    return `[${values.join(",")}]`;
}
