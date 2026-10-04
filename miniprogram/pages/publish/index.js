const { createOrder } = require('../../utils/store')

const serviceMap = {
  feed: { name: '上门喂猫', icon: '🐱', price: 48 },
  clean: { name: '清理猫砂', icon: '🧹', price: 42 },
  walk: { name: '安心遛狗', icon: '🐕', price: 55 }
}

Page({
  data: {
    type: 'feed', service: serviceMap.feed, petName: '团子', petType: '英短 · 2岁', date: '', time: '10:00', address: '点击填写上门地址', addressReady: false,
    notes: '', tasks: [{ text: '添粮换水', checked: true }, { text: '清理排泄物', checked: true }, { text: '陪玩并拍照', checked: true }]
  },
  onShow() {
    const type = wx.getStorageSync('pawmate_selected_service') || this.data.type
    this.setData({ type, service: serviceMap[type] })
  },
  chooseType(e) { const type = e.currentTarget.dataset.type; this.setData({ type, service: serviceMap[type] }) },
  onDate(e) { this.setData({ date: e.detail.value }) },
  onTime(e) { this.setData({ time: e.detail.value }) },
  onNotes(e) { this.setData({ notes: e.detail.value }) },
  setAddress() { this.setData({ address: '上海市徐汇区梧桐路 88 号', addressReady: true }) },
  toggleTask(e) { const key = `tasks[${e.currentTarget.dataset.index}].checked`; this.setData({ [key]: !this.data.tasks[e.currentTarget.dataset.index].checked }) },
  submit() {
    if (!this.data.date || !this.data.addressReady) {
      wx.showToast({ title: '请补全日期和地址', icon: 'none' }); return
    }
    const order = createOrder({ serviceType: this.data.type, serviceName: this.data.service.name, icon: this.data.service.icon, price: this.data.service.price, petName: this.data.petName, petType: this.data.petType, date: this.data.date, time: this.data.time, address: this.data.address, notes: this.data.notes, tasks: this.data.tasks.filter(item => item.checked).map(item => item.text) })
    wx.showToast({ title: '发布成功', icon: 'success' })
    setTimeout(() => wx.navigateTo({ url: `/pages/task/index?id=${order.id}` }), 500)
  }
})
