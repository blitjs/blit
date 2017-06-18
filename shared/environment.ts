export function development() {
  process.env.NODE_ENV = undefined;
}

export function production() {
  process.env.NODE_ENV = "production"
}
