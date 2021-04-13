<template>
  <div class="container">
    <div>Bienvenue {{ user.firstName }}</div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          Mon profil
        </button>
      </li>
      <li v-if="user.isAdmin" class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          Modération
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active bg-white border border-top-0 p-3"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <form>
          <div class="row align-items-center">
            <div class="col-4">
              <img :src="user.avatarUrl" alt="" />
              <input type="file" name="" id="" />
            </div>
            <div class="col-8">
              <div class="mb-3">
                <label for="lastName" class="form-label">Nom</label>
                <input
                  @keyup="compare"
                  v-model="user.lastName"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="firstName" class="form-label">Prénom</label>
                <input
                  @keyup="compare"
                  v-model="user.firstName"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  @keyup="compare"
                  v-model="user.email"
                  type="email"
                  class="form-control"
                />
              </div>
              <div class="mb-3">
                <label for="post" class="form-label">Poste</label>
                <input
                  @keyup="compare"
                  v-model="user.role"
                  type="poste"
                  class="form-control"
                />
              </div>
              <div class="mt-5 text-end">
                <button :disabled="!updated" class="btn btn-primary btn-sm">
                  Mettre à jour
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div
        v-if="user.isAdmin"
        class="tab-pane fade bg-white border border-top-0 p-3"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi et
        culpa perferendis minima beatae similique inventore quia porro
        obcaecati, enim laborum, cum qui accusamus sequi reprehenderit suscipit
        dignissimos animi aliquid. Eligendi voluptate sunt a dolores repudiandae
        molestiae minima voluptas? Adipisci.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Me',

  data() {
    return {
      user: {},
      updated: false,
    };
  },

  methods: {
    compare() {
      if (
        JSON.stringify(this.user) !== JSON.stringify(this.$store.getters.user)
      ) {
        this.updated = true;
        return;
      }
      this.updated = false;
      console.log(this.updated);
    },
  },

  mounted() {
    this.user = { ...this.$store.getters.user };
    console.log(this.user);
  },
};
</script>
