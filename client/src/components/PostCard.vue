<template>
  <div class="card shadow-sm">
    <div class="d-flex align-items-center px-3 pt-3">
      <div class="avatar-thumbnail">
        <img class="avatar-image" :src="post.author.avatarUrl" alt="" />
      </div>
      <div class="d-block ms-3 lh-sm">
        <div class="d-block fw-bolder">
          <a href="#" class="text-decoration-none text-body"
            >{{ post.author.firstName }} {{ post.author.lastName }}</a
          >
        </div>
        <!-- To be formatted -->
        <span class="d-block text-secondary small mt-1">{{
          post.author.role
        }}</span>
      </div>
      <div v-if="!post.hasBeenReported" class="ms-auto">
        <button
          @click="togglePostActions"
          :disabled="showUpdateForm"
          class="btn btn-link btn-sm"
        >
          <i v-if="showPostActions" class="bi bi-x"></i>
          <i v-else class="bi bi-three-dots"></i>
        </button>
      </div>
    </div>
    <div v-if="showPostActions && !post.hasBeenReported" class="py-3">
      <div class="d-flex justify-content-center bg-light">
        <div v-if="post.author.uuid === $store.getters.user.uuid" class="py-3">
          <button @click="deleteItem(post)" class="btn btn-danger btn-sm">
            Supprimer
          </button>
          <button @click="openUpdateForm" class="btn btn-primary btn-sm ms-2">
            Modifier
          </button>
        </div>
        <div v-else class="py-3">
          <button
            v-if="$store.getters.user.isAdmin"
            @click="deleteItem(post)"
            class="btn btn-danger btn-sm"
          >
            Supprimer
          </button>
          <button
            v-else
            @click="reportItem(post)"
            class="btn btn-primary btn-sm"
          >
            Signaler
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <p v-if="post.hasBeenReported" class="card-text text-center bg-light p-3">
        <span class="fw-bold">CONTENU SIGNALÉ</span><br />En attente de
        modération.
      </p>
      <div v-else-if="showUpdateForm">
        <UpdateForm
          @closeForm="closeUpdateForm"
          @updatePost="reloadPost"
          :post="post"
        />
      </div>
      <div v-else>
        <p class="card-text">
          {{ post.body }}
        </p>
        <div v-if="post.imageUrl" class="rounded bg-dark overflow-hidden">
          <img :src="post.imageUrl" alt="" class="d-block img-fluid mx-auto" />
        </div>
      </div>
      <span class="d-block text-secondary text-end small mt-3 fst-italic"
        >Publié {{ formatDate(post.createdAt) }}</span
      >
    </div>
    <div
      v-if="!post.hasBeenReported"
      class="d-flex align-items-center px-3 pb-3 pt-4"
    >
      <!-- TODO: Make it dynamic -->
      <div class="flex-shrink-none mb-2">
        <button
          @click="addLike(post.uuid)"
          type="button"
          class="btn btn-sm"
          :class="
            post.votes.usersLiked.includes($store.getters.user.uuid)
              ? 'btn-success'
              : 'btn-outline-success'
          "
          :disabled="post.votes.usersLiked.includes($store.getters.user.uuid)"
        >
          <i class="bi bi-arrow-up-short"></i>
        </button>
        <button
          @click="addDislike(post.uuid)"
          type="button"
          class="btn btn-sm ms-1"
          :class="
            post.votes.usersDisliked.includes($store.getters.user.uuid)
              ? 'btn-danger'
              : 'btn-outline-danger'
          "
          :disabled="
            post.votes.usersDisliked.includes($store.getters.user.uuid)
          "
        >
          <i class="bi bi-arrow-down-short"></i>
        </button>
      </div>
      <div
        v-if="getTotalVotes(post) === 0"
        class="mx-3 small text-secondary mb-2"
      >
        0 vote
      </div>
      <div
        v-else-if="getTotalVotes(post) > 0"
        class="mx-3 small text-success mb-2"
      >
        {{ getTotalVotes(post) }}
        {{ getTotalVotes(post) > 1 ? 'votes' : 'vote' }}
      </div>
      <div v-else class="mx-3 small text-secondary text-danger mb-2">
        {{ getTotalVotes(post) }}
        {{ -1 > getTotalVotes(post) ? 'votes' : 'vote' }}
      </div>
      <button
        @click="toggleComments(post.uuid)"
        class="btn btn-link btn-sm ms-auto text-decoration-none"
      >
        {{ showComments ? 'Masquer' : 'Afficher' }} les commentaires
      </button>
      <!-- END TODO -->
    </div>
    <CommentList
      :comments="comments"
      :postId="post.uuid"
      @addComment="updateCommentList"
      @removeFromCommentsList="removeComment"
      v-if="showComments"
    />
  </div>
</template>

<script>
import UpdateForm from '@/components/PostUpdateForm';
import CommentList from '@/components/CommentList';

import setHeaders from '@/helpers/setHeaders';

import moment from 'moment';
moment.locale('fr');

export default {
  name: 'Post',

  emits: ['deletePost', 'reportPost', 'reloadPost', 'addLike', 'addDislike'],

  inject: ['API_URL'],

  props: ['post'],

  components: {
    UpdateForm,
    CommentList,
  },

  data() {
    return {
      showPostActions: false,
      showComments: false,
      showUpdateForm: false,
      comments: [],
    };
  },

  methods: {
    async addLike(uuid) {
      const headers = setHeaders({ json: true });

      const response = await fetch(`${this.API_URL}/posts/${uuid}/like`, {
        method: 'POST',
        body: JSON.stringify({ userId: this.$store.getters.user.uuid }),
        headers,
      });

      if (!response.ok) {
        console.log("Impossible d'ajouter un like");
        return;
      }

      this.$emit('addLike', uuid);
    },

    async addDislike(uuid) {
      const headers = setHeaders({ json: true });

      const response = await fetch(`${this.API_URL}/posts/${uuid}/dislike`, {
        method: 'POST',
        body: JSON.stringify({ userId: this.$store.getters.user.uuid }),
        headers,
      });

      if (!response.ok) {
        console.log("Impossible d'ajouter un like");
        return;
      }

      this.$emit('addDislike', uuid);
    },

    formatDate(date) {
      return moment(date).fromNow();
    },

    togglePostActions() {
      this.showPostActions = !this.showPostActions;
    },

    toggleComments(uuid) {
      this.fetchComments(uuid);
      this.showComments = !this.showComments;
    },

    openUpdateForm() {
      this.showPostActions = false;
      this.showUpdateForm = true;
    },

    closeUpdateForm() {
      this.showPostActions = false;
      this.showUpdateForm = false;
    },

    reloadPost(updatedPost) {
      this.$emit('reloadPost', updatedPost);
    },

    updateCommentList(comment) {
      const newComment = {
        ...comment,
        author: this.$store.getters.user,
      };
      this.comments = [newComment, ...this.comments];
    },

    removeComment(uuid) {
      this.comments = [
        ...this.comments.filter((comment) => comment.uuid !== uuid),
      ];
    },

    async deleteItem(post) {
      if (
        this.$store.getters.user.idAdmin === false &&
        post.author.uuid !== this.$store.getters.user.uuid
      )
        return;

      const headers = setHeaders({ json: true });

      const response = await fetch(`${this.API_URL}/posts/${post.uuid}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        console.log('Impossible de supprimer la publication.');
        return;
      }

      const result = await response.json();

      this.$emit('deletePost', result.uuid);
    },

    async reportItem(post) {
      if (post.author.uuid === this.$store.getters.user.uuid) return;

      const headers = setHeaders({ json: true });

      const response = await fetch(
        `${this.API_URL}/posts/${post.uuid}/report`,
        {
          method: 'GET',
          headers,
        }
      );

      if (!response.ok) {
        console.log('Impossible de signaler la publication.');
        return;
      }

      const result = await response.json();

      this.showPostActions = false;

      this.$emit('reportPost', result.uuid);
    },

    async fetchComments(uuid) {
      const headers = setHeaders({ json: true });

      const response = await fetch(`${this.API_URL}/posts/${uuid}/comments`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        console.log('Impossible de récupérer les commentaires');
        return;
      }

      const result = await response.json();

      this.comments = result.comments;
    },

    getTotalVotes(post) {
      return post.votes.usersLiked.length - post.votes.usersDisliked.length;
    },

    checkVotes(post) {
      if (this.getTotalVotes(post) >= 0) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
.card + .card {
  margin-top: 40px;
}

.avatar-thumbnail {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
