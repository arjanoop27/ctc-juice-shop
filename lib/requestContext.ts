import { AsyncLocalStorage } from 'node:async_hooks'

type CtcContext = {
  ctcToken?: string
}

const als = new AsyncLocalStorage<CtcContext>()

export function runWithContext<T>(ctx: CtcContext, fn: () => T): T {
  return als.run(ctx, fn)
}

export function getCtcToken(): string | undefined {
  return als.getStore()?.ctcToken
}
