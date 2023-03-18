const app = Vue.createApp({
  data() {
    return {
      contacts: this.getData(),
      searchText: ''
    }
  },

  computed: {
    listResults() {
      if (this.searchText) {
        return this.contacts.filter(contact => {
          return contact.firstName.toLowerCase().includes(this.searchText.toLowerCase());
        })
      } else {
        return this.contacts;
      }
    }
  },

  methods: {
    removeContact(index) {
      this.contacts.splice(index, 1);
    },

    async getData() {
      let response = await fetch('https://randomuser.me/api/?results=15');
      let data = await response.json();

      this.contacts = [];

      data.results.forEach(item => {
        this.contacts.push({
          firstName: item.name.first,
          lastName: item.name.last,
          email: item.email,
          city: `${item.location.city}, ${item.location.country}`,
          picture: item.picture.large
        })
      })
    }
  }
})

app.mount('#app')

function show() {
  console.log('clicou');
}
