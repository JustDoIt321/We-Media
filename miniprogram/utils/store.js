const PROVIDERS_KEY = 'pawmate_providers'
const ORDERS_KEY = 'pawmate_orders'
const ROLE_KEY = 'pawmate_role'

const seedProviders = [
  { id: 'p1', name: '小葵', avatar: '🐱', badge: '金牌猫咪照护', rating: '4.9', orders: 128, distance: '1.2km', price: 48, experience: '3年', intro: '家有两只橘猫，熟悉怕生猫咪的上门照护与喂药。', tags: ['耐心', '可喂药', '拍照认真'] },
  { id: 'p2', name: '阿木', avatar: '🐶', badge: '活力遛狗达人', rating: '4.8', orders: 96, distance: '2.0km', price: 55, experience: '2年', intro: '每天跑步，擅长中小型犬遛弯和精力消耗。', tags: ['准时', '体力好', '会训犬'] },
  { id: 'p3', name: '柚子', avatar: '🐾', badge: '全能宠物伙伴', rating: '5.0', orders: 67, distance: '2.8km', price: 52, experience: '4年', intro: '宠物护理专业在读，猫狗都可以安心交给我。', tags: ['专业护理', '猫狗皆可', '节假日可约'] }
]

function ensureSeedData() {
  if (!wx.getStorageSync(PROVIDERS_KEY)) wx.setStorageSync(PROVIDERS_KEY, seedProviders)
  if (!wx.getStorageSync(ORDERS_KEY)) wx.setStorageSync(ORDERS_KEY, [])
  if (!wx.getStorageSync(ROLE_KEY)) wx.setStorageSync(ROLE_KEY, 'owner')
}

function getProviders() { return wx.getStorageSync(PROVIDERS_KEY) || seedProviders }
function getOrders() { return wx.getStorageSync(ORDERS_KEY) || [] }
function saveOrders(orders) { wx.setStorageSync(ORDERS_KEY, orders) }
function getRole() { return wx.getStorageSync(ROLE_KEY) || 'owner' }
function setRole(role) { wx.setStorageSync(ROLE_KEY, role) }

function createOrder(payload) {
  const order = {
    ...payload,
    id: `PM${Date.now().toString().slice(-8)}`,
    status: 'waiting',
    statusText: '等待接单',
    createdAt: new Date().toLocaleString('zh-CN'),
    report: null
  }
  saveOrders([order, ...getOrders()])
  return order
}

function updateOrder(id, patch) {
  const orders = getOrders().map(item => item.id === id ? { ...item, ...patch } : item)
  saveOrders(orders)
  return orders.find(item => item.id === id)
}

module.exports = { ensureSeedData, getProviders, getOrders, getRole, setRole, createOrder, updateOrder }
