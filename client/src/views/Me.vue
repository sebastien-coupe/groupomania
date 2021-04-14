<template>
  <div class="container">
    <router-link
      :to="{ name: 'Feed' }"
      class="d-inline-flex align-items-center text-decoration-none"
    >
      <i class="bi bi-arrow-left fs-5"></i><span class="ms-2">Retour</span>
    </router-link>
    <ul class="nav nav-tabs mt-3" id="myTab" role="tablist">
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
          @click="loadReportedPosts"
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
        <ProfileForm :user="user" />
      </div>
      <div
        v-if="user.isAdmin"
        class="tab-pane fade bg-white border border-top-0 p-3"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <ModerationList
          :reportedPosts="reportedPosts"
          @removeFromReportedPosts="updateModerationList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileForm from '@/components/ProfileForm';
import ModerationList from '@/components/ModerationList';

import setHeaders from '@/helpers/setHeaders';

export default {
  name: 'Me',

  inject: ['API_URL'],

  components: {
    ProfileForm,
    ModerationList,
  },

  data() {
    return {
      user: {},
      reportedPosts: [],
    };
  },

  methods: {
    async loadReportedPosts() {
      this.isLoading = true;
      const headers = setHeaders();

      const response = await fetch(
        `${this.API_URL}/posts?filter=hasBeenReported`,
        {
          method: 'GET',
          headers,
        }
      );

      if (!response.ok) {
        console.log('Impossible de récupérer les posts');
        return;
      }

      const result = await response.json();

      this.reportedPosts = result.posts;

      this.isLoading = false;
    },

    updateModerationList(uuid) {
      this.reportedPosts = this.reportedPosts.filter((post) => {
        return post.uuid != uuid;
      });
    },
  },

  mounted() {
    this.user = { ...this.$store.getters.user };
  },
};
</script>

<style>
.avatar-action {
  background-color: rgba(0, 0, 0, 0.4);
}

.avatar-container {
  width: 180px;
  height: 180px;
  overflow: hidden;
}

#avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
