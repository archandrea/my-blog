export default {
  methods: {
    openModal(type) {
      this.$store.dispatch('modal/open', type)
    },
    restorePath(path, params) {
      if (params) {
        for (const key in params) {
          path = path.replace(new RegExp(`/${params[key]}`), `/:${key}`)
        }
      }
      return path
    }
  },
  filters: {
    formatDate(date) {
      if (date === undefined) {
        return
      }
      if (typeof date === 'string') {
        date = new Date(date)
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
    }
  }
}