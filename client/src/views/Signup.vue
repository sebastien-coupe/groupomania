<template>
  <div class="m-auto">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <img
            class="mt-5 mb-3"
            src="@/assets/logo.png"
            alt="groupomania logo"
          />
          <p class="fs-5">
            N'attendez plus pour vous inscrire et commencez à échanger dès à
            présent avec vos collaborateurs.
          </p>
        </div>
        <div class="col-6">
          <div class="card shadow-sm ms-5 p-5">
            <form action="">
              <div class="mb-2">
                <label for="email" class="form-label">Adresse email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="form-control form-control-lg"
                />
              </div>
              <div class="mb-4">
                <label for="password" class="form-label">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="form-control form-control-lg"
                />
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-success btn-lg">
                  Inscription
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>