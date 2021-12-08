export const maxId = (items: {id: number}[]) => {
  let maxId = 0;
  items.forEach(i => {
    if (i.id > maxId) {
      maxId = i.id;
    }
  })

  return maxId;
}