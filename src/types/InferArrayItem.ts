export type InferArrayItem<T> = T extends (infer U)[] ? U : never
