<script lang="ts">
import tutoril from '@/tutoril/tutoril';
import { defineComponent } from 'vue'

export default defineComponent({
  mounted() {
    tutoril();
  }
})
</script>

<template>

  <body>
    <div class="container"></div>

    <footer>
      <p align="center">
        <b>本页面由 Adpro 编写，版权所有，不得盗用。如需传播，务必署名。</b>
      </p>
    </footer>
  </body>
</template>
