<template>
    <div id="app" class="container-fluid">
      <div class="search">
        <div id="logo-bg">
          <h3 id="logo">BOOKEX</h3>
        </div>

        <md-button class="md-fab md-fab-bottom-right md-primary md-fixed">
          <router-link to="/add">
            <md-icon>add</md-icon>
          </router-link>
        </md-button>

        <div class="card-expansion">
          <router-link class="btn btn-primary" to="/"></router-link>
          <router-view/>
        </div>

      </div>
    </div>
</template>

<script>
</script> 