const { ensureSeedData } = require('./utils/store')

App({
  onLaunch() {
    ensureSeedData()
  },
  globalData: {
    role: 'owner'
  }
})
