function wrap<S extends string | number>(str: S): `\`${S}\`` {
  return `\`${str}\`` as const;
}

export { wrap };
