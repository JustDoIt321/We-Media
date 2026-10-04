const { getProviders } = require('../../utils/store')

Page({
  data: {
    services: [
      { type: 'feed', icon: '🐱', name: '上门喂猫', desc: '添粮换水・陪玩记录', color: 'peach' },
      { type: 'clean', icon: '🧹', name: '清理猫砂', desc: '铲屎清洁・状态观察', color: 'mint' },
      { type: 'walk', icon: '🐕', name: '安心遛狗', desc: '定位打卡・活力陪伴', color: 'blue' }
    ],
    providers: []
  },
  onShow() { this.setData({ providers: getProviders() }) },
  chooseService(e) {
    wx.setStorageSync('pawmate_selected_service', e.currentTarget.dataset.type)
    wx.switchTab({ url: '/pages/publish/index' })
  },
  viewProvider(e) { wx.navigateTo({ url: `/pages/provider/index?id=${e.currentTarget.dataset.id}` }) }
})
