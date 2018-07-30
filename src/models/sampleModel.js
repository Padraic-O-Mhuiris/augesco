import { types } from 'mobx-state-tree'

const data = {
  'name': 'Chronicles of Narnia Box Set',
  'price': 28.73,
  'author': 'CS Lewis'
}

export const SampleModelItem = types
  .model({
    name: types.string,
    price: types.number,
    author: types.optional(types.string, '')
  })
  .actions(self => ({
    changeName(newName) {
      self.name = newName
    },
    changePrice(newPrice) {
      self.price = newPrice
    },
    changeAuthor(newAuthor) {
      self.author = newAuthor
    }
  }))

export const SampleModel = types
  .model({
    items: types.optional(types.array(SampleModelItem), [])
  })
  .actions(self => ({
    add(item) {
      self.items.push(item)
    }
  }))
  .views(self => ({
    get totalPrice() {
      return self.items.reduce((sum, entry) => sum + entry.price, 0)
    }
  }))