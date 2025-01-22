export function objectsAreDifferent(
  obj1: { [key: string]: any },
  obj2: { [key: string]: any }
) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return true;
  }

  for (let key of Object.keys(obj1)) {
    if (typeof obj1[key] === "object") {
      if (objectsAreDifferent(obj1[key], obj2[key])) return true;
    } else {
      if (obj1[key] !== obj2[key]) return true;
    }
  }

  return false;
}
