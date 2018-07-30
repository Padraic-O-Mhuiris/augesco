import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree'
import { SampleModel, SampleModelItem } from './sampleModel'
import { reaction } from 'mobx'

it('can create an instance of the model', () => {
  const item = SampleModelItem.create({
    'name': 'Chronicles of Narnia Box Set',
    'price': 28.73,
    'author': 'CS Lewis'
  })

  expect(item.price).toBe(28.73)
  expect(item.name).toBe('Chronicles of Narnia Box Set')

  item.changeName('Narnia')
  expect(item.name).toBe('Narnia')
})

it('can create many samplemodels', () => {
  const list = SampleModel.create({
    items: [
      {
        name: 'Chronicles of Narnia Box Set',
        price: 28.73
      }
    ]
  })

  expect(list.items.length).toBe(1)
  expect(list.items[0].price).toBe(28.73)
})

it('can add new items', () => {
  const list = SampleModel.create()

  const states = []
  onSnapshot(list, snapshot => {
    states.push(snapshot)
  })

  list.add(SampleModelItem.create({
    name: 'Chesterton',
    price: 10,
    author: 'G.K Chesterton'
  }))

  expect(list.items.length).toBe(1)
  expect(list.items[0].name).toBe('Chesterton')

  list.items[0].changeName("Book of G.K Chesterton")
  expect(list.items[0].name).toBe('Book of G.K Chesterton')

  // expect(getSnapshot(list)).toEqual({
  //   items: [
  //     {
  //       name:"Book of G.K Chesterton",
  //       price: 10,
  //       author: "G.K Chesterton"
  //     }
  //   ]
  // })

  expect(getSnapshot(list)).toMatchSnapshot()

  expect(states).toMatchSnapshot()
})

it('can add new items - 2', () => {
  const list = SampleModel.create()

  const patches = []
  onPatch(list, patch => {
    patches.push(patch)
  })

  list.add(SampleModelItem.create({
    name: 'Chesterton',
    price: 10,
    author: 'G.K Chesterton'
  }))


  list.items[0].changeName("Book of G.K Chesterton")

  expect(patches).toMatchSnapshot()
})

it("can calculate the total price of a model", () => {
  const list = SampleModel.create({
    items: [
      {
        name: "Machine Gun Preacher",
        price: 7.35,
        author: "T.E Lawrence"
      },
      {
        name: "LEGO Mindstorm EV3",
        price: 349.95,
        author: "Julie Shields"
      }
    ]
  })

  expect(list.totalPrice).toBe(357.3)

  let changed = 0
  reaction(() => list.totalPrice, () => changed++)
  expect(changed).toBe(0)
  console.log(list.totalPrice)
  list.items[0].changeName("Test")
  expect(changed).toBe(0)
  list.items[0].changePrice(10)
  expect(changed).toBe(1)
})