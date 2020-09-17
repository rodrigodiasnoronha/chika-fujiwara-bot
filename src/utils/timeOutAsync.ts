/**
 *
 * @param ms
 *
 * Timeout usado nos comandos.
 *
 * Seria meio que um setTimeout com async await
 *
 *
 */

export const timeOutAsync = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
