/* eslint-disable @typescript-eslint/no-explicit-any */

export const withErrorHandling =
  <T, R>(fn: (ctx: T) => Promise<R>) =>
    async (context: T): Promise<R> => {
      try {
        return await fn(context)
      } catch (error) {
        throw `<TryCatchError>${fn.name} failed: ${error}</TryCatchError>\n`
      }
    }
