export type Timer = ReturnType<typeof setTimeout>

export type As<Props = any> = keyof JSX.IntrinsicElements | React.ElementType<Props>

export type Primitive = null | undefined | string | number | boolean | symbol | bigint
export type LiteralUnion<T, U> = T | (U & { _?: never })
export type LiteralIntersection<T, U> = T & (U & { _?: never })
