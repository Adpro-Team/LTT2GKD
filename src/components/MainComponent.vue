<script setup lang="ts">
import { checkFormat } from '@/methods/checkFormat';
import { exportJSON } from '@/methods/export';
import { RouterLink } from 'vue-router';
</script>

<template>

  <body>
    <div class="container">
      <h2>李跳跳规则转GKD规则</h2>
      <textarea id="ltt-rules" rows="15" cols="100" placeholder="请输入李跳跳规则&#10;它的格式应类似[{},{},{}...]"></textarea>
      <textarea id="gkd-rules" rows="15" cols="100"></textarea>
      <textarea id="gkd-rules-hidden" rows="15" cols="100" style="display: none;"></textarea>
      <button class="button" @click="checkFormat">转换</button>
      <button class="button" @click="exportJSON">导出</button>
      <p class="message" id="export-message" style="display: none;">
        已调用浏览器下载
        <RouterLink to="/tutoril">点此查看导入教程</RouterLink>
      </p>
    </div>

    <footer>
      <p align="center">
        <b>
          点击查看<a href="https://github.com/Adpro-Team/LTT2GKD" target="_blank"> Github </a>项目
          本页面由<a href="https://github.com/Adpro-Team" target="_blank"> Adpro-Team </a>进行维护
        </b>
      </p>
      <p align="center">
        <b>
          本页面根据 https://snoopy1866.github.io/LiTiaotiao-Custom-Rules/ 本人使用Vue重构而来
          在此特别感谢<a href="https://github.com/FW27623"> FW27623 </a>
        </b>
      </p>
    </footer>
  </body>
</template>
