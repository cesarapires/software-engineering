export const generateName = (name: string) => {
  const suffix = crypto.randomUUID()
  return name + suffix
}
